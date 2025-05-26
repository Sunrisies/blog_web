#!/bin/bash

# 配置变量
REMOTE_USER="root"
REMOTE_HOST="sunrise1024.top"
REMOTE_DIR="/home/docker/next"
IMAGE_NAME="next:test"
LOCAL_TAR_FILE="next_test.tar"
CONTAINER_NAME="next_test"
PORT_MAPPING="441:3000"

# 日志函数
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# 检查命令是否执行成功
check_success() {
  if [ $? -ne 0 ]; then
    log "错误: $1 执行失败"
    exit 1
  fi
}

# 构建 Next.js 项目
log "正在构建 Next.js 项目..."
pnpm run build
check_success "pnpm build"

# 构建 Docker 镜像
log "正在构建 Docker 镜像..."
docker build --platform linux/amd64 -t $IMAGE_NAME .
check_success "docker build"

# 保存 Docker 镜像为 tar 文件
log "正在将 Docker 镜像保存为 tar 文件..."
docker save $IMAGE_NAME -o $LOCAL_TAR_FILE
check_success "docker save"

# 上传文件到远程服务器
log "正在上传 $LOCAL_TAR_FILE 到 $REMOTE_HOST..."
scp $LOCAL_TAR_FILE $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/
check_success "scp"

# log "正在清理临时文件..."
rm -r $LOCAL_TAR_FILE
check_success "清理临时文件"

# 远程执行命令
log "正在远程服务器上部署..."
ssh $REMOTE_USER@$REMOTE_HOST "
  cd $REMOTE_DIR || exit 1

  # 停止并删除旧容器
  log '正在停止并删除旧容器...'
  docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME
  docker rmi $IMAGE_NAME

  # 加载新镜像并启动容器
  log '正在加载新镜像并启动容器...'
  docker load -i $LOCAL_TAR_FILE
  docker run -it -d -p $PORT_MAPPING --restart=always --name $CONTAINER_NAME $IMAGE_NAME
"
check_success "ssh"

# log "部署成功完成！"
# rm -r qiniu/_next/static/*
# cp -r .next/static/* qiniu/_next/static/
# node upload.js
log "部署成功完成！"

