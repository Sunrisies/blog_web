FROM node:24

# 设置构建参数
ARG BUILD_TIMESTAMP
ARG GIT_HASH
ARG PROJECT_VERSION
ARG NODE_ENV=production

# 设置环境变量
ENV NODE_ENV=${NODE_ENV} \
    BUILD_TIMESTAMP=${BUILD_TIMESTAMP} \
    GIT_HASH=${GIT_HASH} \
    PROJECT_VERSION=${PROJECT_VERSION} \
    PORT=3000

WORKDIR /app

# 创建用户和组
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# 复制文件时直接设置权限 - 关键优化！
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static
COPY --chown=nextjs:nodejs public ./public/
COPY --chown=nextjs:nodejs .env ./.env 
COPY --chown=nextjs:nodejs .docker/version.json ./public/version.json

# 切换到非root用户
USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]