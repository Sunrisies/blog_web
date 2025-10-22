#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class DeployManager {
    constructor() {
        this.previousVersion = null;
        this.newVersion = null;
        this.projectName = null;
        this.config = {
            remoteUser: "root",
            remoteHost: "sunrise1024.top",
            remoteDir: "/home/docker/next",
            imageName: "next:test",
            containerName: "next_test",
            portMapping: "441:3000",
            localTarFile: "next_test.tar",
            volumeMapping: "", // 可以添加卷映射
            healthCheckEndpoint: "/", // 健康检查端点
            healthCheckTimeout: 30000, // 健康检查超时时间
            keepImageVersions: 3 // 保留的镜像版本数量
        };
    }

    log(message, type = 'info') {
        const colors = {
            info: '\x1b[36m', // cyan
            success: '\x1b[32m', // green
            error: '\x1b[31m', // red
            warning: '\x1b[33m' // yellow
        };
        const reset = '\x1b[0m';
        const timestamp = new Date().toISOString();
        console.log(`${colors[type]}[${timestamp}] ${message}${reset}`);
    }

    executeCommand(command, options = {}) {
        try {
            this.log(`执行命令: ${command}`, 'info');
            const output = execSync(command, {
                encoding: 'utf8',
                stdio: options.silent ? 'pipe' : 'inherit',
                ...options
            });
            return { success: true, output };
        } catch (error) {
            this.log(`命令执行失败: ${command}`, 'error');
            this.log(`错误信息: ${error.message}`, 'error');
            if (error.stderr) {
                this.log(`错误输出: ${error.stderr.toString()}`, 'error');
            }
            return { success: false, error };
        }
    }

    // 从 package.json 获取项目信息
    getProjectInfo() {
        try {
            const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            this.projectName = packageJson.name;
            
            // 动态设置配置
            this.config.imageName = `${this.projectName}:latest`;
            this.config.containerName = this.projectName;
            this.config.localTarFile = `${this.projectName}.tar`;
            
            this.log(`项目名称: ${this.projectName}`, 'success');
            this.log(`镜像名称: ${this.config.imageName}`, 'success');
            this.log(`容器名称: ${this.config.containerName}`, 'success');
            
            return packageJson;
        } catch (error) {
            this.log('无法读取 package.json，使用默认配置', 'warning');
            return null;
        }
    }

    // 递增版本号
    incrementVersion(version, incrementType = 'patch') {
        const [major, minor, patch] = version.split('.').map(Number);
        
        switch (incrementType) {
            case 'major':
                return `${major + 1}.0.0`;
            case 'minor':
                return `${major}.${minor + 1}.0`;
            case 'patch':
            default:
                return `${major}.${minor}.${patch + 1}`;
        }
    }

    updateVersion() {
        try {
            const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            this.previousVersion = packageJson.version;
            
            // 递增版本号
            this.newVersion = this.incrementVersion(this.previousVersion, 'patch');
            
            // 更新 package.json
            packageJson.version = this.newVersion;
            fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
            
            this.log(`版本号已更新: ${this.previousVersion} → ${this.newVersion}`, 'success');
            return this.newVersion;
        } catch (error) {
            this.log('版本号更新失败', 'error');
            throw error;
        }
    }

    revertVersion() {
        if (this.previousVersion) {
            try {
                const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
                packageJson.version = this.previousVersion;
                fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
                this.log(`版本号已回退到: ${this.previousVersion}`, 'warning');
            } catch (error) {
                this.log('版本号回退失败', 'error');
            }
        }
    }

    generateVersionInfo() {
        try {
            const now = new Date();
            const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            const versionInfo = {
                name: this.projectName,
                version: packageJson.version,
                previousVersion: this.previousVersion,
                build: `${packageJson.version}-${now.getTime()}`,
                buildDate: now.toISOString(),
                commitHash: this.getCommitHash(),
                deployDate: now.toISOString(),
                environment: process.env.NODE_ENV || 'production',
                language: 'nodejs'
            };

            // 确保 public 目录存在
            const publicDir = './public';
            if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
            }

            // 确保 .docker 目录存在（用于 Docker 构建时复制）
            const dockerDir = './.docker';
            if (!fs.existsSync(dockerDir)) {
                fs.mkdirSync(dockerDir, { recursive: true });
            }

            fs.writeFileSync(
                './public/version.json',
                JSON.stringify(versionInfo, null, 2)
            );

            fs.writeFileSync(
                './.docker/version.json',
                JSON.stringify(versionInfo, null, 2)
            );

            this.log(`版本信息已生成: v${versionInfo.version}`, 'success');
            return versionInfo;
        } catch (error) {
            this.log('生成版本信息失败', 'error');
            throw error;
        }
    }

    getCommitHash() {
        try {
            return execSync('git rev-parse --short HEAD').toString().trim();
        } catch (error) {
            return 'unknown';
        }
    }

    // 运行测试
    runTests() {
        this.log('正在运行测试...');
        const result = this.executeCommand('bun test', { silent: false });
        if (result.success) {
            this.log('所有测试通过', 'success');
        } else {
            this.log('测试失败，但继续部署流程', 'warning');
            // 根据需求决定是否在此处退出
            // throw new Error('测试失败');
        }
    }

    buildProject() {
        this.log('正在构建 Next.js 项目...');
        const result = this.executeCommand('bun run build');
        if (!result.success) {
            throw new Error('项目构建失败');
        }
    }

    buildDockerImage() {
        this.log('正在构建 Docker 镜像...');
        const buildTag = `${this.projectName}:${this.newVersion}`;
        const result = this.executeCommand(
            `docker build --platform linux/amd64 -t ${buildTag} -t ${this.config.imageName} .`
        );
        if (!result.success) {
            throw new Error('Docker 镜像构建失败');
        }
        
        // 验证镜像
        const verifyResult = this.executeCommand(
            `docker image inspect ${buildTag}`,
            { silent: true }
        );
        if (verifyResult.success) {
            const sizeResult = this.executeCommand(
                `docker images ${buildTag} --format "{{.Size}}"`,
                { silent: true }
            );
            this.log(`镜像构建成功，大小: ${sizeResult.output}`, 'success');
        } else {
            throw new Error('镜像验证失败');
        }
    }

    saveDockerImage() {
        this.log('正在保存 Docker 镜像...');
        const buildTag = `${this.projectName}:${this.newVersion}`;
        const result = this.executeCommand(`docker save ${buildTag} -o ${this.config.localTarFile}`);
        if (!result.success) {
            throw new Error('Docker 镜像保存失败');
        }
        
        // 检查文件大小
        try {
            const stats = fs.statSync(this.config.localTarFile);
            const fileSize = (stats.size / (1024 * 1024)).toFixed(2);
            this.log(`镜像保存成功，文件大小: ${fileSize}MB`, 'success');
        } catch (error) {
            this.log('无法获取文件大小', 'warning');
        }
    }

    uploadToRemote() {
        this.log('正在上传文件到远程服务器...');
        const result = this.executeCommand(
            `scp ${this.config.localTarFile} ${this.config.remoteUser}@${this.config.remoteHost}:${this.config.remoteDir}/`
        );
        if (!result.success) {
            throw new Error('文件上传失败');
        }
    }

    // 清理远程旧镜像
    async cleanupRemoteImages() {
        this.log('正在清理远程服务器的旧镜像...');
        
        const cleanupScript = `
            set -e
            cd ${this.config.remoteDir}
            
            echo "[清理日志] 清理未使用的 Docker 镜像..."
            docker image prune -f
            
            echo "[清理日志] 清理 ${this.projectName} 的旧版本镜像..."
            docker images ${this.projectName} --format "{{.Tag}}" | \\
              grep -E '^[0-9]+\\.[0-9]+\\.[0-9]+$' | \\
              sort -Vr | \\
              tail -n +${this.config.keepImageVersions + 1} | \\
              while read tag; do
                echo "[清理日志] 删除旧镜像: ${this.projectName}:\$tag"
                docker rmi ${this.projectName}:\$tag 2>/dev/null || true
              done
            
            echo "[清理日志] 清理悬空镜像..."
            docker images -f "dangling=true" -q | xargs -r docker rmi 2>/dev/null || true
            
            echo "[清理日志] 镜像清理完成"
        `.replace(/\n\s+/g, '\n').trim();

        const commands = [
            `cd ${this.config.remoteDir} || exit 1`,
            cleanupScript
        ];

        const sshCommand = `ssh ${this.config.remoteUser}@${this.config.remoteHost} "${commands.join(' && ')}"`;
        const result = this.executeCommand(sshCommand);

        if (!result.success) {
            this.log('远程镜像清理失败', 'warning');
        }
    }

    async deployToRemote() {
        this.log('正在远程服务器上部署...');

        const buildTag = `${this.projectName}:${this.newVersion}`;
        
        const commands = [
            `cd ${this.config.remoteDir} || exit 1`,

            // 停止并删除旧容器
            `docker stop ${this.config.containerName} 2>/dev/null || echo "[部署日志] 无需停止容器"`,
            `docker rm ${this.config.containerName} 2>/dev/null || echo "[部署日志] 无需删除容器"`,

            // 删除旧镜像
            `docker rmi ${this.config.imageName} 2>/dev/null || echo "[部署日志] 无需删除 latest 镜像"`,
            `docker rmi ${buildTag} 2>/dev/null || echo "[部署日志] 无需删除指定版本镜像"`,

            // 加载新镜像
            `docker load -i ${this.config.localTarFile}`,

            // 构建运行命令
            this.buildRunCommand(),

            // 清理临时文件
            `rm -f ${this.config.localTarFile} || echo "[部署日志] 无需清理临时文件"`,

            `echo "[部署日志] 远程部署完成"`
        ];

        const sshCommand = `ssh ${this.config.remoteUser}@${this.config.remoteHost} "${commands.join(' && ')}"`;
        const result = this.executeCommand(sshCommand);

        if (!result.success) {
            throw new Error('远程部署失败');
        }
    }

    // 构建运行命令
    buildRunCommand() {
        let command = `docker run -d -p ${this.config.portMapping} --restart=always --name ${this.config.containerName}`;
        
        // 添加卷映射（如果有配置）
        if (this.config.volumeMapping) {
            command += ` -v ${this.config.volumeMapping}`;
        }
        
        // 添加环境变量（如果有配置）
        if (this.config.environmentVariables) {
            Object.entries(this.config.environmentVariables).forEach(([key, value]) => {
                command += ` -e ${key}=${value}`;
            });
        }
        
        command += ` ${this.config.imageName}`;
        
        return command;
    }

    async checkDeploymentStatus() {
        this.log('进行健康检查...');
        
        // 等待容器启动
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        let healthChecked = false;
        
        // 检查容器状态
        const containerStatus = this.executeCommand(
            `ssh ${this.config.remoteUser}@${this.config.remoteHost} "docker ps --filter name=${this.config.containerName} --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'"`,
            { silent: true }
        );

        if (containerStatus.success && containerStatus.output.includes(this.config.containerName)) {
            this.log('容器运行状态:', 'success');
            console.log(containerStatus.output);
            
            // 方式1: 检查健康端点
            this.log('检查健康端点...');
            const healthCheck = this.executeCommand(
                `ssh ${this.config.remoteUser}@${this.config.remoteHost} "curl -f -s --max-time 10 http://localhost:${this.config.portMapping.split(':')[0]}${this.config.healthCheckEndpoint} > /dev/null && echo 'HEALTH_CHECK_PASSED' || echo 'HEALTH_CHECK_FAILED'"`,
                { silent: true }
            );
            
            if (healthCheck.success && healthCheck.output.includes('HEALTH_CHECK_PASSED')) {
                this.log('健康检查端点响应正常', 'success');
                healthChecked = true;
            }
            
            // 方式2: 检查基础连接
            if (!healthChecked) {
                this.log('检查基础连接...');
                const connectionCheck = this.executeCommand(
                    `ssh ${this.config.remoteUser}@${this.config.remoteHost} "curl -f -s --connect-timeout 10 http://localhost:${this.config.portMapping.split(':')[0]}/ > /dev/null && echo 'CONNECTION_CHECK_PASSED' || echo 'CONNECTION_CHECK_FAILED'"`,
                    { silent: true }
                );
                
                if (connectionCheck.success && connectionCheck.output.includes('CONNECTION_CHECK_PASSED')) {
                    this.log('应用基础连接正常', 'success');
                    healthChecked = true;
                }
            }
            
            // 方式3: 检查容器日志
            if (!healthChecked) {
                this.log('检查容器日志...');
                const logs = this.executeCommand(
                    `ssh ${this.config.remoteUser}@${this.config.remoteHost} "docker logs ${this.config.containerName} --tail 20 2>/dev/null"`,
                    { silent: true }
                );
                
                if (logs.success && logs.output) {
                    this.log('健康检查失败，但容器正在运行。最近日志:', 'warning');
                    console.log(logs.output.split('\n').slice(-10).join('\n'));
                    
                    if (logs.output.toLowerCase().includes('error')) {
                        this.log('日志中发现错误信息', 'error');
                        return false;
                    } else {
                        this.log('未在日志中发现明显错误，可能应用启动较慢', 'warning');
                        return true;
                    }
                } else {
                    this.log('无法获取容器日志', 'error');
                    return false;
                }
            } else {
                return true;
            }
        } else {
            this.log('容器未运行', 'error');
            
            // 获取失败原因
            const failedLogs = this.executeCommand(
                `ssh ${this.config.remoteUser}@${this.config.remoteHost} "docker logs ${this.config.containerName} 2>&1 | tail -20"`,
                { silent: true }
            );
            
            if (failedLogs.success && failedLogs.output) {
                this.log('容器启动失败，日志:', 'error');
                console.log(failedLogs.output);
            }
            return false;
        }
    }

    cleanupLocal() {
        this.log('正在清理本地临时文件...');
        try {
            if (fs.existsSync(this.config.localTarFile)) {
                fs.unlinkSync(this.config.localTarFile);
                this.log('本地临时文件已清理', 'success');
            }
            
            // 清理 .docker 版本信息文件
            const dockerVersionFile = './.docker/version.json';
            if (fs.existsSync(dockerVersionFile)) {
                fs.unlinkSync(dockerVersionFile);
            }
        } catch (error) {
            this.log('清理本地文件时出错', 'warning');
        }
    }

    // 提交版本更新到 Git
    commitVersionUpdate() {
        this.log('检查 Git 提交...');
        try {
            const gitStatus = this.executeCommand('git status --porcelain package.json', { silent: true });
            if (gitStatus.success && gitStatus.output.trim()) {
                this.log('正在提交版本更新到 Git...');
                this.executeCommand('git add package.json');
                this.executeCommand(`git commit -m "chore: bump version to ${this.newVersion} [deploy]"`);
                
                // 可以选择是否自动推送
                this.log('版本更新已提交，如需推送请执行: git push', 'info');
            } else {
                this.log('未检测到版本文件更改，跳过 Git 提交', 'info');
            }
        } catch (error) {
            this.log('Git 提交失败', 'warning');
        }
    }

    showDeployInfo() {
        this.log('==========================================', 'success');
        this.log('🚀 Next.js 项目部署成功完成!', 'success');
        this.log(`应用名称: ${this.projectName}`, 'success');
        this.log(`版本升级: ${this.previousVersion} → ${this.newVersion}`, 'success');
        this.log(`服务地址: ${this.config.remoteHost}:${this.config.portMapping}`, 'success');
        this.log(`容器名称: ${this.config.containerName}`, 'success');
        this.log(`部署时间: ${new Date().toISOString()}`, 'success');
        this.log('==========================================', 'success');
    }

    async run() {
        try {
            this.log('开始 Next.js 项目部署流程...');

            // 0. 获取项目信息
            this.getProjectInfo();

            // 1. 更新版本号
            this.updateVersion();

            // 2. 生成版本信息
            this.generateVersionInfo();

            // 3. 运行测试（可选）
            await this.runTests();

            // 4. 构建项目
            this.buildProject();

            // 5. 构建 Docker 镜像
            this.buildDockerImage();

            // 6. 保存镜像
            this.saveDockerImage();

            // 7. 上传到远程
            this.uploadToRemote();

            // 8. 远程部署
            await this.deployToRemote();

            // 9. 清理远程旧镜像
            await this.cleanupRemoteImages();

            // 10. 健康检查
            const healthStatus = await this.checkDeploymentStatus();
            if (healthStatus) {
                this.log('健康检查通过', 'success');
            } else {
                this.log('健康检查未完全通过，但部署已完成', 'warning');
            }

            // 11. 清理本地
            this.cleanupLocal();

            // 12. 提交版本更新到 Git（可选）
            this.commitVersionUpdate();

            // 13. 显示部署信息
            this.showDeployInfo();

            this.log('🎉 博客部署完成！', 'success');

        } catch (error) {
            this.log(`部署失败: ${error.message}`, 'error');
            this.revertVersion();
            this.cleanupLocal();
            process.exit(1);
        }
    }
}

// 运行部署
const deployManager = new DeployManager();
deployManager.run();