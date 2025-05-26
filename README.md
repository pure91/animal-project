> 본 프로젝트는 MIT 라이선스 하에 배포됩니다.
>

# 🐯 Zootypes - 동물 성격 테스트

[![Deploy](https://github.com/pure91/animal-project/actions/workflows/deploy.yml/badge.svg)](https://github.com/pure91/animal-project/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-purple)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

> 성격 테스트를 통해 동물로 변신하여 🐯 호랑이의 생일 파티에 참가해보세요!  
> 👉 [https://zootypes.com](https://zootypes.com)

---

## 🐾 프로젝트 소개

**Zootypes**는 MBTI® 성격 유형 이론에서 영감을 받아 제작된 **동물 성격 테스트 웹사이트**입니다.  
사용자는 질문에 답하면서 자신의 성격 유형에 맞는 동물로 변신하고, 결과에 따른 설명을 확인하고 공유할 수 있습니다.

> ※ 본 테스트는 MBTI® 성격 유형 이론을 참고하여 제작된 자체 콘텐츠로, 공식 MBTI® 검사와는 무관합니다. 단순 재미로 즐겨주세요 😊  
> MBTI® 및 Myers-Briggs Type Indicator®는 The Myers-Briggs Company의 등록상표입니다.

---

## 🛠 기술 스택

### 🧱 Infra / OS
![Naver Cloud](https://img.shields.io/badge/Naver_Cloud-Infra-03C75A)
![Ubuntu](https://img.shields.io/badge/Ubuntu-22.04-E95420?logo=ubuntu)

### 🛠 Backend
![API Routes](https://img.shields.io/badge/Next.js_API-Routes-blue?logo=next.js)

### 💻 Frontend
![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

### 🗄️ Database
![MariaDB](https://img.shields.io/badge/MariaDB-Dockerized-003545?logo=mariadb)

### 🌐 Web Server
![Nginx](https://img.shields.io/badge/Nginx-ReverseProxy-009639?logo=nginx)

### 🔐 HTTPS / 인증서
![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-Automated_SSL-orange)

### ⚙️ DevOps / 배포
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions)

> 🔐 HTTPS는 Nginx + Let's Encrypt로 설정되어 있으며, 인증서는 90일마다 자동 갱신됩니다.

---

## ⚙️ CI/CD 및 배포

- GitHub Actions 자동 배포 파이프라인 구성
- Docker 기반 개발 및 운영 환경 통일
- `main` 브랜치에 PR 머지 후 push → 테스트 → 빌드 → 자동 배포 진행

---

## 📂 디렉토리 구조

```bash
animal-project/
├── public/                # 정적 리소스 (이미지, 아이콘 등)
├── src/
│   └── app/
│       ├── api/           # API 라우트
│       ├── components/    # UI 컴포넌트
│       ├── data/          # 질문지, 결과 데이터
│       ├── result/        # 결과 표시 컴포넌트
│       ├── globals.css    # 전역 스타일
│       ├── layout.tsx     # 전체 레이아웃
│       └── page.tsx       # 사용자 interaction, 질문 페이지
├── src/lib/               # DB 설정, 쿼리
├── src/types/             # 타입 정의
├── src/utils/             # 공통 함수
└── ...
```

---

## 🕒 프로젝트 타임라인

| 날짜                    | 작업 내용                                         |
|-----------------------|-----------------------------------------------|
| **25/04/22 ~ 25/04/28** | 프로젝트 생성, Cloud 서버 구축, Docker, CI/CD 설정 시작     |
| **25/04/28 ~ 25/05/14** | 질문/결과 데이터 설계, 주요 레이아웃 및 컴포넌트 개발 시작            |
| **25/05/14 ~ 25/05/18** | MariaDB 연동, 참여자 수 체크 기능 개발, 사용자 결과 기록 및 통계 구현 |
| **25/05/18 ~ 25/05/24** | 데이터 계산 세부 조정, 동점 기능 추가(추가 질문), seo최적화         |
| **25/05/25 ~ 진행중**    | tratis 변경, 서버 배포 중 사용자 접속 시 정적 html 적용, 툴팁 적용 |

---

## 🚀 실행 방법

### 1️⃣ 프로젝트 클론
```bash
git clone https://github.com/pure91/animal-project.git
cd animal-project
```
### 2️⃣ 패키지 설치
``` bash
npm install
```

### 3️⃣ 개발 서버 실행
``` bash
npm run dev
```

### ✅ 접속 확인
> 브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 프로젝트를 확인할 수 있습니다.

---

## 👨‍💻 제작자

- **Pure91** – 개발 · 기획 · 디자인
- GitHub: [@pure91](https://github.com/pure91)
- 이메일: kimgudals91 [at] gmail.com (→ @로 바꿔서 보내주세요)