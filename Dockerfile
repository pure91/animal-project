# ---- build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# 빌드 시 환경 변수를 받기 위한 ARG 추가
ARG NEXT_PUBLIC_KAKAO_SHARE

# 환경 변수 설정
ENV NEXT_PUBLIC_KAKAO_SHARE=${NEXT_PUBLIC_KAKAO_SHARE}

COPY package*.json ./
RUN npm ci --no-optional
COPY . .

# public/images 폴더 하위의 이미지들을 Docker 이미지에 포함시킴
COPY ./public/images /app/public/images

RUN npm run build

# ---- runtime stage ----
FROM node:18-alpine
WORKDIR /app
# 빌드된 파일과 public/images 폴더를 포함시킴
COPY --from=build /app /app

EXPOSE 3000
CMD ["npm", "start"]
