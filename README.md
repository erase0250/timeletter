# Timeletter

- Timeletter(타임레터)는 지금 이 순간의 마음을 담아 미래의 나에게 따뜻한 편지를 전하는 서비스입니다.

<br>

## 🖥️ 프로젝트 개요
- 기간: 2025.06.16 - 2025.06.30
- 인원: 개인 프로젝트
- 배포: https://timeletter.vercel.app/

<br>

## ⚙️ 기술 스택

| 구분              | 사용 기술                                |
| ---------------- | ---------------------------------------|
| **프론트엔드**     | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/React Icons-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Lottie-00BFFF?style=for-the-badge&logo=lottie&logoColor=white"> |
| **상태 관리**     | <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/Context API-61DAFB?style=for-the-badge&logo=react&logoColor=white"> |
| **인증 & DB**    | <img src="https://img.shields.io/badge/Firebase Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> <img src="https://img.shields.io/badge/Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"> |
| **날짜 관리**     | <img src="https://img.shields.io/badge/date--fns-007ACC?style=for-the-badge&logo=date-fns&logoColor=white"> <img src="https://img.shields.io/badge/React Datepicker-FF69B4?style=for-the-badge&logo=react&logoColor=white"> |
| **이미지 저장**   | <img src="https://img.shields.io/badge/html2canvas-333333?style=for-the-badge&logo=html5&logoColor=white"> |

<br>

## 🔥 주요 기능

| **구글 로그인 연동** | **편지 작성** | **편지 상태별 분류** | 
| --- | --- | --- |
| ![Image](https://github.com/user-attachments/assets/b75a5f2d-363d-4107-9894-f742f4c00c14) | ![Image](https://github.com/user-attachments/assets/c224050e-0cd6-4aa5-8738-d88e20f28d1e) | ![Image](https://github.com/user-attachments/assets/82e04a4d-974b-4f30-89dc-f18299c0e286) |

| **미리 열어보기 (잠금/열람 상태 관리)** | **편지 수정 및 삭제** | **이미지 저장** |
| --- | --- | --- |
| ![Image](https://github.com/user-attachments/assets/6563b09a-74a1-4573-af0d-a6a2d6fae258) | ![Image](https://github.com/user-attachments/assets/5953a172-1046-4701-91d8-55600386508a) | ![Image](https://github.com/user-attachments/assets/45ba5be8-47a7-4c02-84a0-3eff29ade444) |

<br>

## 🛠️ 실행 방법
```bash
# 프로젝트 클론
git clone https://github.com/erase0250/timeletter.git
cd timeletter

# 패키지 설치
npm install

# 로컬 서버 실행
npm run dev
```

<br>

## 📁 폴더 구조
```
.
├── public/                   # 정적 파일 폴더
│   ├── favicon/              # 파비콘 관련 리소스
│   └── icons/                # 앱 내 사용되는 아이콘 리소스
│
├── src/                      # 소스 코드 루트
│   ├── App.jsx               # 최상위 App 컴포넌트
│   ├── App.css               # 전역 스타일
│   ├── index.css             # 웹 폰트 설정, 테마 변수 정의 (Tailwind 기반)
│   ├── main.jsx              # 앱 진입점
│   │
│   ├── api/                  # API 호출 함수 정의
│   ├── components/           # UI 컴포넌트
│   ├── hooks/                # 커스텀 훅 정의
│   ├── lib/                  # firebase 외부 라이브러리 설정
│   ├── pages/                # 라우팅되는 페이지 컴포넌트
│   └── stores/               # Zustand 전역 상태 관리
│
├── index.html                # 앱 진입용 HTML 파일
├── package.json              # 프로젝트 설정 및 의존성 관리
├── package-lock.json         # 의존성 버전 고정 파일
├── eslint.config.js          # ESLint 설정
├── vercel.json               # Vercel 배포 설정
├── vite.config.js            # Vite 번들러 설정
├── README.md                 # 프로젝트 소개 문서

```

