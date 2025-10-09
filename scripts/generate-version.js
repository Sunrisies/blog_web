// scripts/generate-version.js
const fs = require('fs');
const { execSync } = require('child_process');


function generateVersionInfo() {
    const now = new Date();
    const versionInfo = {
        version: process.env.npm_package_version || '1.0.0',
        buildDate: now.toISOString(),
        commitHash: getCommitHash(),
        environment: process.env.NODE_ENV || 'development'
    };

    // 写入到公共目录
    fs.writeFileSync(
        './public/version.json',
        JSON.stringify(versionInfo, null, 2)
    );
}

function getCommitHash() {
    try {
        return execSync('git rev-parse HEAD').toString().trim();
    } catch (error) {
        return 'unknown';
    }
}

generateVersionInfo();