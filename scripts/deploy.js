#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

class DeployManager {
    constructor() {
        this.previousVersion = null;
        this.config = {
            remoteUser: "root",
            remoteHost: "sunrise1024.top",
            remoteDir: "/home/docker/next",
            imageName: "next:test",
            containerName: "next_test",
            portMapping: "441:3000",
            localTarFile: "next_test.tar"
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
            return { success: false, error };
        }
    }

    generateVersionInfo() {
        try {
            const now = new Date();
            const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            const versionInfo = {
                version: packageJson.version,
                buildDate: now.toISOString(),
                commitHash: this.getCommitHash(),
                deployDate: now.toISOString(),
                environment: process.env.NODE_ENV || 'production'
            };

            // 确保 public 目录存在
            if (!fs.existsSync('./public')) {
                fs.mkdirSync('./public', { recursive: true });
            }

            fs.writeFileSync(
                './public/version.json',
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

    getCurrentVersion() {
        const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        return packageJson.version;
    }

    updateVersion() {
        this.previousVersion = this.getCurrentVersion();
        const result = this.executeCommand('npm version patch --no-git-tag-version');
        if (result.success) {
            const newVersion = this.getCurrentVersion();
            this.log(`版本号已更新: ${this.previousVersion} → ${newVersion}`, 'success');
            return newVersion;
        }
        throw new Error('版本号更新失败');
    }

    revertVersion() {
        if (this.previousVersion) {
            this.executeCommand(`npm version ${this.previousVersion} --no-git-tag-version --allow-same-version`);
            this.log(`版本号已回退到: ${this.previousVersion}`, 'warning');
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
        const result = this.executeCommand(`docker build --platform linux/amd64 -t ${this.config.imageName} .`);
        if (!result.success) {
            throw new Error('Docker 镜像构建失败');
        }
    }

    saveDockerImage() {
        this.log('正在保存 Docker 镜像...');
        const result = this.executeCommand(`docker save ${this.config.imageName} -o ${this.config.localTarFile}`);
        if (!result.success) {
            throw new Error('Docker 镜像保存失败');
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

    cleanupLocal() {
        this.log('正在清理本地临时文件...');
        if (fs.existsSync(this.config.localTarFile)) {
            fs.unlinkSync(this.config.localTarFile);
        }
    }

    async deployToRemote() {
        this.log('正在远程服务器上部署...');

        const commands = [
            `cd ${this.config.remoteDir} || exit 1`,

            // 停止并删除旧容器
            `docker stop ${this.config.containerName} 2>/dev/null || echo "无需停止容器"`,
            `docker rm ${this.config.containerName} 2>/dev/null || echo "无需删除容器"`,
            `docker rmi ${this.config.imageName} 2>/dev/null || echo "无需删除镜像"`,

            // 加载新镜像
            `docker load -i ${this.config.localTarFile}`,

            // 启动新容器
            `docker run -d -p ${this.config.portMapping} --restart=always --name ${this.config.containerName} ${this.config.imageName}`
        ];

        const sshCommand = `ssh ${this.config.remoteUser}@${this.config.remoteHost} "${commands.join(' && ')}"`;
        const result = this.executeCommand(sshCommand);

        if (!result.success) {
            throw new Error('远程部署失败');
        }
    }

    async checkDeploymentStatus() {
        this.log('检查部署状态...');

        // 简单的健康检查
        await new Promise(resolve => setTimeout(resolve, 5000));

        const result = this.executeCommand(
            `ssh ${this.config.remoteUser}@${this.config.remoteHost} "docker ps | grep ${this.config.containerName}"`,
            { silent: true }
        );

        if (result.success && result.output.includes(this.config.containerName)) {
            this.log('部署状态检查通过', 'success');
        } else {
            this.log('部署状态检查未通过', 'warning');
        }
    }

    async run() {
        try {
            this.log('开始部署流程...');

            // 1. 更新版本号
            this.updateVersion();

            // 2. 生成版本信息
            this.generateVersionInfo();

            // 3. 构建项目
            this.buildProject();

            // 4. 构建 Docker 镜像
            this.buildDockerImage();

            // 5. 保存镜像
            this.saveDockerImage();

            // 6. 上传到远程
            this.uploadToRemote();

            // 7. 清理本地
            this.cleanupLocal();

            // 8. 远程部署
            await this.deployToRemote();

            // 9. 检查状态
            await this.checkDeploymentStatus();

            this.log('🎉 博客部署完成！', 'success');

        } catch (error) {
            this.log(`部署失败: ${error.message}`, 'error');
            this.revertVersion();
            process.exit(1);
        }
    }
}

// 运行部署
const deployManager = new DeployManager();
deployManager.run();