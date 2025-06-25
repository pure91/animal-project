# ---- build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# 빌드 시 환경 변수를 받기 위한 ARG 추가, 환경 변수 설정
ARG NEXT_PUBLIC_KAKAO_SHARE
ENV NEXT_PUBLIC_KAKAO_SHARE=${NEXT_PUBLIC_KAKAO_SHARE}

# 패키지 복사 npm
COPY package*.json ./
# 빌드용으로 전체 의존성 설치 (devDependencies 포함, 개발용 패키지들, 테스트, 빌드도구 등))
# ci는 lock 파일 기준 설치임
RUN npm ci --no-optional

# 앱 소스 dockerignore로 미리 정리해놨으니 전체 복사
COPY . .

# 빌드
RUN npm run build

# 빌드 후 캐시 폴더 제거 (Next.js 빌드 속도 향상용 캐시 파일)
RUN rm -rf .next/cache

# ---- runtime stage ----
FROM node:18-alpine AS prod
WORKDIR /app

# 실행에 필요한 최소 파일만 복사
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# 런타임용 node_modules를 only production 모드로만 설치해서 복사
# 빌드에서 필요한 모든 패키지 설치했으니, 런타임에는 필요한 패키지만 설치해서 용량 절약
RUN npm ci --only=production --no-optional

EXPOSE 3000
CMD ["npm", "start"]
