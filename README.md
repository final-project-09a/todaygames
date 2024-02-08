## 내배캠 React 3기 A-9조 파이널 프로젝트
### 📢 프로젝트 개요
**24. 01. 04 - 23. 02. 08**


- 프로젝트명: **오늘의 게임**
  # ![오늘의게임 로고-05 png](https://github.com/final-project-09a/todaygames/assets/117058056/89a88ecb-4d1c-4d90-82bc-2a8a9b072d2e)
  
- 소개
    - 한 줄 정리 : 게임포탈사이트
    - 내용 :  다양한 게임들을 추천 받을 수 있고 결제 할 수 있으며 게임에 대한 정보를 유저들끼리 나눌 수 있는 사이트 구현
    - 
### 👥 팀 소개

- 팀명: 구사일생(九死一生)
- 뜻: 9번 죽을 고비를 넘겨 살아남 듯 어떤 어려움이 있어도 이겨내며 살아남자.
- 팀 구성원
-  안준표,권보라,이재환,윤성현,이지혜

### [💡 주요 기능](https://github.com/scseong/motitube/wiki/%EA%B8%B0%EB%8A%A5-%EB%AA%A9%EB%A1%9D#%ED%95%84%EC%88%98%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD)

1. 스팀API 기반, 장르별 다양한 게임, 및 신작 제공
2. 유저들이 자유롭게 소통할 수 있는 커뮤니티 공간  제공
3. 궁금한 게임에 대한  게임정보,게임설명, 컨텐츠,연관게임 정보 제공
4. 좋아요,내가 찜한 찜목록,내가쓴글, 내 정보 변경 기능


# 필수 구현 사항

## 메인페이지

### **header**

- [ ]  로그인 상태 → 로그아웃 UI ,  로그아웃 상태  → 로그인 UI
- [ ]  로고 구현
- [ ]  커뮤니티 이동
- [ ]  마이페이지 이동

### **Banner**

- [ ]  react-slick을 사용하여 슬라이드 기능 구현
- [ ]  게임 추천 슬라이드 자동전환, 게임연관태그, 해당게임 상세페이지 이동버튼

### Main

- [ ]  추천 게임 리스트
- [ ]  새로 나온 게임
- [ ]  장르별 탐색
- [ ]  장르별 탐색 Click => 해당 장르 게임 무한스크롤

## 상세페이지

- [ ]  찜하기, 공식사이트 이동
- [ ]  게임 상세 이미지
- [ ]  게임 상세 이미지 리스트
- [ ]  찜 기능
- [ ]  유저들의 한줄 리뷰
- [ ]  게임 정보
- [ ]  연관 게

## 커뮤니티 페이지

- [ ]  커뮤니티 게시판 CRUD
- [ ]  최신순 정렬, 장르 순 정렬 구현
- [ ]  게시글 검색 

## 커뮤니티 상세 페이지

- [ ]  게시글 제목, 내용
- [ ]  댓글입력하기, 대댓글
- [ ]  좋아요

## 로그인, 회원가입 페이지

- [ ]  회원가입 유효성 검사
- [ ]  소셜로그인(구글, 카카오), 일반유저 회원가입

## 마이페이지

- [ ]  내가 쓴 글 목록보기
- [ ]  프로필 편집(사진, 닉네임)
- [ ]  찜 목록
- [ ]  커뮤니티 댓글 목


  ### 📝 역할 분담

| 안준표      | 권보라      | 이재환      | 윤성현      | 이지혜           |
| ----------- | ----------- | ----------- | ----------- | ---------------- |
| 커뮤니티 페이지  | 메인/상세 페이지 | 로그인/로그아웃,마이 페이지 | 커뮤니티 상세페이지 | 웹디자인 |

### 🚩 개발 내용

- **서비스 아키텍처**
  
  ![image](https://github.com/final-project-09a/todaygames/assets/117058056/8db4d103-6ee9-456c-8937-f697fcf33ebc)


- **개발환경**
  
- IDE: Visual Studio Code
- OS: windows, Mac
- Package Manager: Yarn Classic (v1.22.19)
 
#### 📌 사용 기술
   
- **Library & Language**
    - React.js - 상태관리 라이브러리
    - React-slick - slide를 지원해주는 라이브러리
    - Typescript - 정적 타입 검사와 코드의 안정성을 위한 언어
    - Tanstack Query - 서버와의 데이터 통신을 간단하게 처리, 실시간 업데이트를 손쉽게 구현, 페이지네이션 및 무한 스크롤과 같은 데이터 로딩 패턴을 지원
    - Redux-toolkit -  애플리케이션의 상태를 효과적으로 관리하고 예측 가능한 방식으로 상태를 업데이트
- **API**
    - google API - 로그인 관련 API
    - Kakao  API - 카카오톡 로그인을 구현하여 사용자 회원가입의 편의성을 증가시키기 위해 사용
    - SteamAPI - 세계 게임 인기순위 게임에대한 자세한 정보(게임사에서 제공하는 이미지,영상,상세한 스펙) 제공, 스팀에서 신작을 업데이트 하게되면 자동으로 업데이트 되는 편의성
  
    
- **데이터 베이스** 
  - supabase - 사용자 인증과 데이터베이스 등의 서버 기능 제공
  - Glitch - steamApi 받아오는 서버공간
- **Tool & Application**
    - vsCode - 코드 작성을 편리하게해주는 Tool
- **배포**
- Vercel

  ## UX 기술 의사결정

- **무한스크롤vs더보기vs페이지네이션**
    - 게임에 대한 자료가 많다 보니 페이지가 렌더링 될 때 시간이 오래 걸릴 수 있으나,  더보기 기능을 활용하여 필요한 경우에만 데이터를 렌더링 하도록 하여 해당 페이지의 속도관련 성능을 향상

 # 트러블 슈팅 
 
 ## 1. **Glitch 에서 받아온 SteamApi 과다데이터로 인한 초기 로딩 속도 문제**

 ### ** 문제.

- 18만개라는 데이터를 모두 읽어오는데 너무 오래 걸려 초기 렌더링 시간에 대한 문제.
    
 ### ** 시도.

- 데이터 갯수를 제한하여 따로 CSV형태로 파일을 만들어 supabase에 따로 업로드하였고 그 데이터를 불러오도록 수정함
- API 중에서 추천 top100개까지만 받아오도록 수정하여 데이터 수를 자체적으로 제한함

 ### ** 해결.

- 활용하려는 데이터의 종류를 다르게 하고 데이터의 종류에 맞게 UI 및 기능을 변경하여 적용하였으며, 적용 결과 로딩 속도가 현저하게 줄어듦

## 2. **로그인 상태관리에 대한 문제** 

 ### ** 문제.

- 로그인된 상태를 전역으로 뿌려주는 방법을 잘못 설정함
- 모든 페이지에 적용되는 Nav bar를 활용하여 로그인 데이터를 뿌려줬으나, 모든 페이지와 컴포넌트에서 필요하는 특성상 더 올바른 사용법이 필요했음

### ** 해결.

- AuthenticationLayer로 Root File인 App.tsx의 Router컴포넌트를 감싸줌으로써 전역에서 로그인 데이터를 관리하도록 변경함
  

🗼 화면 구

| 메인 페이지                                                | 상세페이지                                                  | 커뮤니티 페이지  |   커뮤니티 상세 페이지        |                                            
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |   ------------------------------------------------------------ |
| ![스크린샷 2024-02-09 011515](https://github.com/final-project-09a/todaygames/assets/117058056/23da4954-55f2-49a1-b694-e98a1b1b7989) | ![스크린샷 2024-02-09 011543](https://github.com/final-project-09a/todaygames/assets/117058056/934ed26b-25a2-4ba3-b456-2c064e900d18) |![스크린샷 2024-02-09 011614](https://github.com/final-project-09a/todaygames/assets/117058056/67d86feb-6728-47f3-bb8b-8db60c42c129) | ![스크린샷 2024-02-09 011705](https://github.com/final-project-09a/todaygames/assets/117058056/489a82cd-b825-4a73-83c9-2c9e8a17952e) |

| 댓글 좋아요                                                     | 로그인/회원가입                                                   | 마이 페이지                                          | 
  |  ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![스크린샷 2024-02-09 012633](https://github.com/final-project-09a/todaygames/assets/117058056/e5f10811-f138-4b40-a316-06d81ed53865) | ![스크린샷 2024-02-09 011804](https://github.com/final-project-09a/todaygames/assets/117058056/fadd40b0-c941-4a4e-a959-add3e8c1f2be) | ![스크린샷 2024-02-09 011628](https://github.com/final-project-09a/todaygames/assets/117058056/2ea1e297-50ae-47ea-a95b-d531f3be4541) |
## 프로젝트 스케줄!

**24. 01. 04 - 23. 01. 22 중간발표**


**24. 01. 04 - 23. 02. 08 최종발표**


**1주차 24. 01. 04 - 24.01. 10 기획 마무리**
----------------------------------------------------

**2주차 24. 01. 11 - 24.01. 17 
피드백 반영된 코드 70%완성**
----------------------------------------------------
**3주차  24. 01. 18 - 24.01. 24 
중간 발표 이전, 완성된 코드에서 오류와 수정 사항 등을 고려하고 발표
▶ 프로젝트 MVP 모델을 완성하고, 팀 예상 질문 10가지 답변 준비**
----------------------------------------------------
4주차  24. 01. 25 - 24.01. 31 
유저테스트 진행, 유저테스트 기반 프로젝트 그로스
----------------------------------------------------
**5주차 24. 02. 01 - 24.02. 08 
발표 준비 및 마무리▶ 트러블슈팅 작성**
----------------------------------------------------



#### 📂 디렉토리 구조
```
📦 project
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┣ 📂assets
 ┃ ┣ 📂constants
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂component1
 ┃ ┃ ┃ ┣📜component1.jsx
 ┃ ┃ ┃ ┗📜styles.js
 ┃ ┃ ┣ 📂component2
 ┃ ┃ ┃ ┣📜component2.jsx
 ┃ ┃ ┃ ┗📜styles.js
 ┃ ┣ 📂hooks
 ┃ ┣ 📂mock
 ┃ ┣ 📂pages
 ┃ ┣ 📂shared
 ┃ ┣ 📂styles
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┗ 📂modules
 ┃ ┣ 📜App.jsx
 ┃ ┗ 📜index.js
 ┣ 📜.eslintrc
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜jsconfig.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜yarn.lock
```

- `api/` 서버와의 통신에 사용되는 코드
- `assets/` 멀티미디어 파일(이미지, 폰트)
- `constants/` 상수 (색상, 공유되는 값 등)
- `components/` 재사용 가능한 컴포넌트
- `hooks/` 커스텀 훅
- `mock/` 샘플 데이터
- `pages/` 라우팅되는 페이지 컴포넌트
- `shared/` 공통적으로 사용되는 리소스
- `styles/` 스타일 관련
- `redux/` 리덕스 관련 파일
### [📃 코드 컨벤션](https://github.com/scseong/motitube/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)

### [🚥 깃 전략](https://github.com/scseong/motitube/wiki/%EA%B9%83-%EC%A0%84%EB%9E%B5)
  
