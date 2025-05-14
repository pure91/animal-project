# ---- build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# 빌드 시 환경 변수를 받기 위한 ARG 추가
ARG NEXT_PUBLIC_KAKAO_SHARE

# 환경 변수 설정
ENV NEXT_PUBLIC_KAKAO_SHARE=${NEXT_PUBLIC_KAKAO_SHARE}

# 패키지 복사 (캐시 사용 가능)
COPY package*.json ./
RUN npm ci --no-optional

# 앱 소스 복사
COPY . .

# 빌드 실행
RUN npm run build

# ---- runtime stage ----
FROM node:18-alpine AS prod
WORKDIR /app

# 빌드된 결과만 복사
COPY --from=build /app ./

# 필요한 포트 노출
EXPOSE 3000

# 실행 명령
CMD ["npm", "start"]
