> 본 프로젝트는 MIT 라이선스 하에 배포됩니다.
> 
# 🐯 Zootypes - 동물 성향 테스트 웹사이트

[![Deploy](https://github.com/pure91/animal-project/actions/workflows/deploy.yml/badge.svg)](https://github.com/pure91/animal-project/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-purple)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)

> 성향 테스트를 통해 동물로 변신하여 🐯 호랑이의 생일 파티에 참가해보세요!  
> 👉 [https://zootypes.com](https://zootypes.com)

---

## 🐾 프로젝트 소개

**Zootypes**는 MBTI® 성격유형 이론에서 영감을 받아 제작된 **동물 성향 테스트 웹사이트**입니다.  
사용자는 질문에 답하면서 자신의 성향에 맞는 동물로 변신하고, 결과에 따른 설명을 확인하고 공유할 수 있습니다. 🎉

> ※ 본 테스트는 MBTI® 성격유형 이론을 참고하여 제작된 자체 콘텐츠로, 공식 MBTI® 검사와는 무관합니다. 단순 재미로 즐겨주세요 😊  
> MBTI® 및 Myers-Briggs Type Indicator®는 The Myers-Briggs Company의 등록상표입니다.

---

## 🛠 기술 스택

| 영역         | 기술                                     |
|------------|----------------------------------------|
| **Backend**  | Next.js API Routes                     |
| **Frontend** | Next.js, React, TypeScript             |
| **Database** | MariaDB (Docker)                       |
| **DevOps**   | GitHub Actions (CI/CD), Docker, Ubuntu |
| **Infra**    | 서버 환경 : Naver Cloud (Ubuntu 22.04)     |

---

## ⚙️ CI/CD 및 배포

- GitHub Actions를 통한 자동 배포 파이프라인 구성
- Docker 기반의 개발 및 운영 환경 통일
- `main` 브랜치 머지 시 → 테스트 & 빌드 → 자동 배포 진행

---

## 📂 디렉토리 구조

```bash
animal-project/
├── public/                # 정적 리소스 (이미지, 아이콘 등)
├── src/
│   └── app/
│       ├── api/           # API 라우트
│       ├── components/    # UI 컴포넌트
│       ├── data/          # 질문지 및 결과 데이터
│       ├── result/        # 결과 화면 구성 컴포넌트
│       ├── globals.css    # 전역 스타일
│       ├── layout.tsx     # 전체 레이아웃
│       └── page.tsx       # 홈 및 질문 페이지
├── src/lib/               # DB 설정 및 유틸 함수
└── ...
```

---

## 🕒 프로젝트 타임라인

| 날짜         | 작업 내용                                          |
|------------|------------------------------------------------|
| **04/22**  | 프로젝트 생성, Naver Cloud 서버 구축, Docker, CI/CD 설정 시작 |
| **04/28**  | 질문/결과 데이터 설계, 주요 레이아웃 및 컴포넌트 개발 시작             |
| **05/14**  | MariaDB 연동, 참여자 수 체크 기능 개발, 사용자 결과 기록 및 통계 구현  |
| **05/18~** | 콘텐츠 마무리, 반응형 디자인 개선, 최종 배포 단계                  |

---

## 🚀 실행 방법

```bash
git clone https://github.com/pure91/animal-project.git
cd animal-project
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 프로젝트를 확인할 수 있습니다.

---

## 👨‍💻 제작자

- **Pure91** – 개발 · 기획 · 디자인
- GitHub: [@pure91](https://github.com/pure91)
- 이메일: kimgudals91 [at] gmail.com (→ @로 바꿔서 보내주세요)