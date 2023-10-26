# 基础镜像采用Node.js
FROM node:latest as builder

# 设置工作目录
WORKDIR /app

# 拷贝项目文件到容器中
COPY . .

# 安装依赖
RUN npm install

# 打包项目
RUN npm run build

# 构建生产环境镜像
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html