# 전체 페이지 뼈대 구현 — 기능 스펙

- 작성일: 2026-06-28
- 작성자: Product (Claude Sonnet 4.6)
- 상태: 승인 대기

---

## 1. 개요

### 목적

ONESTEP(자립준비청년 통합 지원 플랫폼)의 실제 기능 개발에 앞서, 전체 라우팅 구조·레이아웃·네비게이션·각 페이지 컴포넌트 틀을 선행 구축한다. 이 단계에서 실제 API 데이터 연동은 하지 않으며, 정적 목업 데이터(하드코딩 또는 fixture 파일)만 사용한다.

### 범위

- FE: 라우터 설치, 공통 레이아웃, 6개 페이지 셸 컴포넌트, 디자인 토큰(CSS 변수)
- BE: CORS 설정, Health check 엔드포인트
- 데이터 연동: 없음 (skeleton 단계)
- 인증/로그인: 없음 (추후 Phase 2 이후)

### 비포함 항목

- 실제 지원사업 데이터 조회 API
- 회원가입 / 로그인 / 마이페이지
- 커뮤니티 게시판
- 지도(기관 Directory)
- 푸시 알림

---

## 2. 페이지 목록

| 경로 | 페이지 이름 | 목적 | 주요 UI 요소 |
|------|------------|------|-------------|
| `/` | 홈 / 랜딩 | 서비스 첫 인상, 핵심 가치 전달, 주요 기능 진입 유도 | 히어로 배너(슬로건 + CTA 버튼), 핵심 기능 카드 4개(지원사업 검색·체크리스트·생활가이드·캘린더), 간단한 서비스 소개 섹션 |
| `/support` | 지원사업 검색 | 8대 분야 필터링 + 지원사업 목록 표시 | 필터 패널(나이·지역·분야·학적·취업여부), 지원사업 카드 목록(제목·분야 태그·마감일·CTA), 스켈레톤 로딩 placeholder |
| `/support/:id` | 지원사업 상세 | 단일 지원사업 세부 정보 표시 | 제목·기관·지원 대상·지원 내용·신청 기간·신청 방법·첨부 링크, 뒤로가기 버튼 |
| `/checklist` | 자립 체크리스트 | 보호종료 후 단계별 To-Do 목록 및 진행률 시각화 | 3단계 탭(보호종료 직후 / 안착기 / 성장기), 체크 항목 목록, 진행률 프로그레스 바 |
| `/guide` | 생활 가이드 | 주거·금융·행정 등 카테고리별 실전 정보 제공 | 카테고리 사이드바 또는 탭(주거·금융·세금·행정·의료), 아티클 카드 목록(제목·요약·카테고리 배지) |
| `/calendar` | 신청 마감 캘린더 | 지원사업 마감일 달력 표시 | 월별 달력 뷰, 일자별 마감 이벤트 점(dot), 이벤트 클릭 시 지원사업 간략 정보 툴팁 또는 사이드패널 |

---

## 3. 공통 레이아웃

### 3-1. 전체 레이아웃 구조

```
<RootLayout>
  <Header />          ← 고정(sticky) 상단 네비게이션
  <main>
    <Outlet />        ← 각 페이지 컴포넌트 렌더링 영역
  </main>
  <Footer />          ← 하단 고정 영역
</RootLayout>
```

- `<main>`에 `min-height: calc(100dvh - var(--header-height) - var(--footer-height))` 적용하여 Footer가 항상 하단에 위치하도록 함.

### 3-2. Header / Navigation

| 요소 | 내용 |
|------|------|
| 로고 | ONESTEP 텍스트 로고 (좌측 고정), `/`로 라우팅 |
| 네비게이션 링크 | 지원사업 검색(`/support`), 체크리스트(`/checklist`), 생활 가이드(`/guide`), 캘린더(`/calendar`) |
| 활성 링크 | 현재 경로와 일치하는 링크에 `aria-current="page"` + 밑줄 또는 색상 강조 |
| 모바일 | 햄버거 메뉴 아이콘 → 드로어(Drawer) 방식 전환. 브레이크포인트: 768px 미만 |
| 높이 | `--header-height: 60px` |

### 3-3. Footer

| 요소 | 내용 |
|------|------|
| 저작권 문구 | `© 2026 ONESTEP. All rights reserved.` |
| 링크(선택) | 개인정보처리방침(placeholder), 이용약관(placeholder) |
| 높이 | `--footer-height: 56px` |

---

## 4. BE 작업 범위

이 단계에서 BE가 준비해야 할 내용은 최소한으로, FE가 개발 서버를 띄웠을 때 CORS 오류 없이 BE에 요청을 보낼 수 있는 환경을 만드는 것이 목표다.

### 4-1. CORS 설정

- 허용 오리진: `http://localhost:5173` (Vite 기본 포트)
- 허용 메서드: `GET, POST, PUT, DELETE, OPTIONS`
- 허용 헤더: `Content-Type, Authorization`
- 설정 방법: `WebMvcConfigurer` 구현체에 `addCorsMappings` 적용

```
위치: org.example.onestepbe.config.CorsConfig
```

### 4-2. Health Check 엔드포인트

- `GET /api/health`
- 응답 body: `{ "status": "ok", "service": "ONESTEP-be" }`
- HTTP 200 고정 반환
- 용도: FE 개발 환경에서 BE 연결 확인, 이후 배포 파이프라인 헬스 체크

```
위치: org.example.onestepbe.controller.HealthController
```

### 4-3. application.properties 추가 설정

```properties
server.port=8080
spring.application.name=ONESTEP-be
```

### 4-4. 이 단계에서 하지 않는 것

- DB 테이블 생성 / 마이그레이션
- 비즈니스 API 엔드포인트 구현
- 보안(Spring Security) 설정

---

## 5. FE 작업 범위

### 5-1. 패키지 설치

현재 `react-router-dom`이 설치되어 있지 않다. 아래 패키지를 추가한다.

```
pnpm add @tanstack/react-router
```

- 라우터: **TanStack Router** (`@tanstack/react-router`) — 타입 안전성 강점
- `react-router-dom`은 사용하지 않음

### 5-2. 라우터 설정

`src/main.tsx`에서 `BrowserRouter`로 앱을 감싸고, `src/router.tsx`에 경로 정의를 분리한다.

```
src/main.tsx           ← <BrowserRouter> 래핑
src/router.tsx         ← createBrowserRouter 또는 <Routes> 경로 정의
```

라우터 정의 개요:

```
/                  → HomePage
/support           → SupportListPage
/support/:id       → SupportDetailPage
/checklist         → ChecklistPage
/guide             → GuidePage
/calendar          → CalendarPage
* (not found)      → NotFoundPage
```

### 5-3. 파일 트리 계획

```
src/
  assets/                     ← 기존 이미지 등 (정리 후 유지)
  components/
    layout/
      RootLayout.tsx           ← Header + <Outlet/> + Footer 조합
      Header.tsx
      Footer.tsx
      MobileDrawer.tsx         ← 모바일 햄버거 드로어
    ui/
      SupportCard.tsx          ← 지원사업 목록 카드 (더미 데이터용)
      ChecklistItem.tsx        ← 체크리스트 항목
      GuideCard.tsx            ← 가이드 아티클 카드
      ProgressBar.tsx          ← 체크리스트 진행률 바
  pages/
    HomePage.tsx
    SupportListPage.tsx
    SupportDetailPage.tsx
    ChecklistPage.tsx
    GuidePage.tsx
    CalendarPage.tsx
    NotFoundPage.tsx
  styles/
    tokens.css                 ← CSS 변수 (디자인 토큰)
    reset.css                  ← 브라우저 기본 스타일 초기화
    global.css                 ← 전역 스타일 (body, typography 기본)
  router.tsx
  main.tsx
  App.tsx                      ← 라우터를 사용하는 경우 최소화 또는 제거
```

### 5-4. 각 페이지 셸 컴포넌트 요구사항

페이지 컴포넌트는 이 단계에서 아래 기준을 만족하면 된다.

- 페이지를 식별할 수 있는 `<h1>` 텍스트 포함
- 주요 UI 구역(섹션·카드 그리드 등)이 정적 더미 데이터 또는 빈 상태 UI로 렌더링됨
- API 호출 코드 없음 (fixture 또는 인라인 상수만 사용)
- `<title>` 변경: 각 페이지에서 `document.title`을 페이지명으로 설정하거나, React Router의 `<title>` 지원 기능 활용

**HomePage**: 슬로건 텍스트, "지원사업 찾기" 버튼(`/support`로 이동), 기능 소개 카드 4개 (정적 배열 렌더링).

**SupportListPage**: 필터 패널 UI 틀(select 또는 버튼 그룹, 실제 필터 동작은 미구현), 더미 카드 3~5개.

**SupportDetailPage**: `useParams`로 `:id` 읽기, 더미 지원사업 객체 1개를 정적으로 표시, 뒤로가기 버튼.

**ChecklistPage**: 3단계 탭 전환(클릭 시 해당 단계 목록 표시), 체크박스 항목 클릭 시 `useState`로 완료 토글, 진행률 바 퍼센트 계산 표시.

**GuidePage**: 카테고리 목록(주거·금융·세금·행정·의료) 사이드바 또는 탭, 선택한 카테고리의 더미 아티클 카드 표시.

**CalendarPage**: **외부 라이브러리 도입 확정.** `react-calendar` 또는 `@fullcalendar/react` 중 경량인 `react-calendar`를 사용 (`pnpm add react-calendar`). 더미 마감일 2~3개를 달력에 표시.

**NotFoundPage**: "페이지를 찾을 수 없습니다" 메시지 + 홈으로 돌아가기 버튼.

### 5-5. vite.config.ts — API 프록시

BE 로컬 서버(`localhost:8080`)로의 요청을 프록시 설정으로 처리하여 CORS 우회 필요 없이 개발한다.

```ts
// vite.config.ts 추가 설정
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
},
```

---

## 6. 디자인 토큰 요구사항

`src/styles/tokens.css`에 CSS 커스텀 프로퍼티로 정의한다. 구체적인 색상 값은 실제 디자인 시안이 확정되기 전까지 아래 가이드라인 기반의 임시값을 사용한다.

### 6-1. 색상

| 토큰 이름 | 역할 | 임시값 |
|-----------|------|--------|
| `--color-primary` | 브랜드 주 색상 (CTA, 강조) | `#2D6BE4` |
| `--color-primary-light` | 주 색상 연한 배경 | `#EBF1FC` |
| `--color-primary-dark` | 호버/활성 상태 | `#1A4FB5` |
| `--color-secondary` | 보조 색상 (태그, 배지) | `#00B07B` |
| `--color-surface` | 카드·패널 배경 | `#FFFFFF` |
| `--color-bg` | 페이지 배경 | `#F5F7FA` |
| `--color-text-primary` | 본문 기본 텍스트 | `#1A1A1A` |
| `--color-text-secondary` | 부가 설명 텍스트 | `#6B7280` |
| `--color-border` | 구분선, 테두리 | `#E5E7EB` |
| `--color-error` | 오류, 경고 | `#DC2626` |
| `--color-disabled` | 비활성 요소 | `#D1D5DB` |

> 오픈 퀘스천 1: 브랜드 메인 색상이 따로 확정되었는가? 확정 시 `--color-primary` 계열을 교체한다.

### 6-2. 타이포그래피

| 토큰 이름 | 값 |
|-----------|-----|
| `--font-family-base` | `'Pretendard', 'Apple SD Gothic Neo', sans-serif` |
| `--font-size-xs` | `12px` |
| `--font-size-sm` | `14px` |
| `--font-size-md` | `16px` |
| `--font-size-lg` | `20px` |
| `--font-size-xl` | `24px` |
| `--font-size-2xl` | `32px` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-bold` | `700` |
| `--line-height-tight` | `1.3` |
| `--line-height-base` | `1.6` |

> 오픈 퀘스천 2: Pretendard 웹폰트를 CDN으로 로드할지 로컬 파일로 포함할지 결정이 필요하다.

### 6-3. 간격 (Spacing Scale)

4px 단위 스케일 기반.

| 토큰 이름 | 값 |
|-----------|-----|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

### 6-4. 레이아웃

| 토큰 이름 | 값 | 용도 |
|-----------|----|------|
| `--max-width-content` | `1200px` | 콘텐츠 최대 너비 |
| `--max-width-narrow` | `768px` | 상세 페이지 등 좁은 레이아웃 |
| `--header-height` | `60px` | Header 높이 |
| `--footer-height` | `56px` | Footer 높이 |
| `--border-radius-sm` | `4px` | 작은 요소 |
| `--border-radius-md` | `8px` | 카드, 버튼 |
| `--border-radius-lg` | `16px` | 모달, 큰 카드 |

### 6-5. 그림자

| 토큰 이름 | 값 |
|-----------|-----|
| `--shadow-sm` | `0 1px 3px rgba(0, 0, 0, 0.08)` |
| `--shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.10)` |
| `--shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.12)` |

---

## 7. 완료 조건 (Definition of Done)

아래 항목이 모두 충족될 때 이 작업을 완료로 간주한다.

### 7-1. 라우팅

- [ ] 브라우저에서 6개 경로(`/`, `/support`, `/support/1`, `/checklist`, `/guide`, `/calendar`)에 직접 접근했을 때 각 페이지 컴포넌트가 렌더링된다.
- [ ] 존재하지 않는 경로 접근 시 NotFoundPage가 표시된다.
- [ ] Header 네비게이션 링크를 클릭하면 해당 페이지로 이동하며 전체 새로고침이 발생하지 않는다.
- [ ] 현재 경로와 일치하는 네비게이션 링크가 시각적으로 활성화 상태로 표시된다.

### 7-2. 레이아웃

- [ ] 모든 페이지에서 Header와 Footer가 동일하게 표시된다.
- [ ] 뷰포트 너비 768px 미만에서 Header의 데스크톱 네비게이션이 숨겨지고 햄버거 메뉴가 표시된다.
- [ ] 햄버거 메뉴 클릭 시 드로어가 열리고, 링크 클릭 또는 바깥 영역 클릭 시 닫힌다.

### 7-3. 페이지 콘텐츠

- [ ] 각 페이지에 해당 페이지를 식별할 수 있는 `<h1>` 요소가 존재한다.
- [ ] ChecklistPage에서 탭 전환이 동작한다.
- [ ] ChecklistPage에서 체크박스 클릭 시 완료 상태가 토글되고 진행률 바 수치가 업데이트된다.
- [ ] SupportDetailPage에서 `:id` 파라미터를 읽어 페이지에 표시한다.
- [ ] CalendarPage에서 달력 그리드가 렌더링되고 더미 마감일이 표시된다.

### 7-4. 빌드 및 린트

- [ ] `pnpm run lint` (oxlint) 에러 0건.
- [ ] `pnpm run build` (tsc -b && vite build) 에러 0건, 경고 없이 완료.
- [ ] BE: `./gradlew build` 성공.
- [ ] BE: `GET http://localhost:8080/api/health` 요청 시 HTTP 200 + `{ "status": "ok" }` 응답.

### 7-5. 접근성 (최소 기준)

- [ ] 모든 인터랙티브 요소(`<a>`, `<button>`)가 키보드 Tab 포커스를 받는다.
- [ ] 이미지(의미 있는 이미지)에 `alt` 속성이 있다.
- [ ] Header에 `<nav>` 태그와 `aria-label`이 있다.

---

## 8. 오픈 퀘스천

| # | 질문 | 영향 범위 |
|---|------|----------|
| 1 | 브랜드 색상(Primary)이 확정되었는가? | 디자인 토큰 `--color-primary` 계열 교체 |
| 2 | ~~Pretendard 웹폰트 로드 방식 (CDN vs 로컬)?~~ → **CDN 확정** | `index.html` 링크 태그 추가 |
| 3 | ~~캘린더 페이지에 외부 라이브러리를 도입할 것인가, 직접 구현할 것인가?~~ → **react-calendar 확정** | `package.json` 의존성 추가 |
| 4 | ~~`react-router-dom` v7을 사용할 것인가, 아니면 TanStack Router로 결정되었는가?~~ → **TanStack Router 확정** | `router.tsx` 구현 방식 전체 |

---

## 9. 참고 자료

- 기획서: `/Users/soohalee/Documents/ONESTEP/Proposal.md`
- FE 프로젝트: `/Users/soohalee/Documents/ONESTEP/ONESTEP-fe/`
- BE 프로젝트: `/Users/soohalee/Documents/ONESTEP/ONESTEP-be/`
- 기술 스택: React 19 + TypeScript + Vite 8, Spring Boot 4.0.7 + MyBatis + SQL Server, Java 17, Gradle
- 린터: oxlint (ESLint 미사용)
- 패키지 매니저: pnpm
