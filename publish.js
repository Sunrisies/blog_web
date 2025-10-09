#!/usr/bin/env node
const { exec } = require('child_process');
const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

// 获取当前版本号
function getCurrentVersion() {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    return packageJson.version;
}

// 设置版本号
function setVersion(version) {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// 回退版本号
function revertVersion(previousVersion) {
    console.log(`回退版本号到: ${previousVersion}`);
    setVersion(previousVersion);
}

// 执行命令
function runCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行命令 ${command} 时出错:`, error);
            callback(error); // 传递错误给回调
        } else if (stderr) {
            console.warn(`命令 ${command} 的标准错误输出:`, stderr);
            callback(new Error(stderr)); // 将标准错误输出作为错误传递
        } else {
            console.log(`命令 ${command} 执行成功:`, stdout);
            callback(null); // 没有错误，传递 null 给回调
        }
    });
}

function runScriptLive(scriptPath, callback) {
    const cp = spawn('sh', [scriptPath], { stdio: 'inherit' }); // inherit = 实时输出
    cp.on('close', code => {
        if (code !== 0) {
            return callback(new Error(`${scriptPath} 退出码 ${code}`));
        }
        callback(null);
    });
    cp.on('error', err => callback(err));
}

// 主逻辑
function main() {
    const previousVersion = getCurrentVersion(); // 保存当前版本号
    console.log(`当前版本号: ${previousVersion}`);

    // 更新版本号
    runCommand('npm version patch --no-git-tag-version', (errorPatch) => {
        if (errorPatch) {
            console.error('npm version patch 执行失败，跳过 npm publish。');
            return;
        }
        // 执行发布命令
        runScriptLive('./dev_test.sh', errorPublish => {
            if (errorPublish) {
                console.error('publish 失败，回退版本号。');
                revertVersion(previousVersion);
            } else {
                console.log('publish 成功！');
            }
        });
    });
}

// 执行主逻辑
main();