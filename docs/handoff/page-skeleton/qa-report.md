# QA Report — page-skeleton

- 작성일: 2026-06-28
- 평가자: QA Agent (Claude Sonnet 4.6)
- 대상 커밋: main (초기 커밋)

---

## 전체 결과: PASS

모든 DoD(Definition of Done) 항목(spec.md 섹션 7)이 통과했습니다.
별도 기재한 비-DoD 발견사항 2건은 다음 이터레이션에서 수정을 권고합니다.

---

## 항목별 채점

### 7-4. 빌드 및 린트

| 항목 | 결과 | 근거 |
|------|------|------|
| `pnpm run lint` 에러 0건 | PASS | oxlint 실행 결과 오류 없음 |
| `pnpm run build` 에러·경고 0건 | PASS | `tsc -b && vite build` — 121 modules, 에러·경고 없이 131ms 완료 |

### 7-1. 라우팅

| 항목 | 결과 | 근거 |
|------|------|------|
| 6개 경로 라우트 정의 존재 | PASS | `src/router.tsx`: `/`, `/support`, `/support/$id`, `/checklist`, `/guide`, `/calendar` 모두 정의 |
| NotFoundPage 라우트 존재 | PASS | `createRootRoute({ notFoundComponent: NotFoundPage })` — TanStack Router 방식으로 적용 |
| Header 네비게이션 링크 4개 | PASS | `Header.tsx` NAV_LINKS 배열에 `/support`, `/checklist`, `/guide`, `/calendar` 정의, TanStack `<Link>` 컴포넌트 사용 |

### 7-2. 레이아웃

| 항목 | 결과 | 근거 |
|------|------|------|
| RootLayout: Header + Outlet + Footer | PASS | `RootLayout.tsx` — `<Header />`, `<main><Outlet /></main>`, `<Footer />` 순서 정확 |
| Header에 `<nav aria-label>` | PASS | `Header.tsx` line 27: `<nav aria-label="주요 메뉴">` |
| MobileDrawer 존재 | PASS | `MobileDrawer.tsx` 구현, role="dialog" aria-modal 포함 |
| 768px 미만 햄버거 전환 미디어 쿼리 | PASS | `Header.module.css` line 73: `@media (max-width: 767px)` — `.nav { display: none }`, `.hamburger { display: flex }` |

### 7-3. 페이지 콘텐츠

| 항목 | 결과 | 근거 |
|------|------|------|
| 각 페이지에 `<h1>` 존재 | PASS | HomePage("자립준비청년의..."), SupportListPage("지원사업 검색"), SupportDetailPage(더미 사업명), ChecklistPage("자립 체크리스트"), GuidePage("생활 가이드"), CalendarPage("신청 캘린더"), NotFoundPage("페이지를 찾을 수 없습니다") 전부 확인 |
| ChecklistPage — 3단계 탭 전환 `useState` | PASS | `ChecklistPage.tsx` line 37: `useState<Tab>('보호종료 직후')`, TABS 배열 3항목, 클릭 시 `setActiveTab` |
| ChecklistPage — 체크박스 토글 | PASS | `toggle()` 함수로 불변 업데이트, `ChecklistItem`에 `onChange` 핸들러 연결 |
| ChecklistPage — ProgressBar 퍼센트 계산 | PASS | `doneCount / currentItems.length * 100` 계산, `<ProgressBar value={progress} label={...} />` |
| SupportDetailPage — `useParams`로 id 읽기 | PASS | `useParams({ from: '/support/$id' })` 로 id 추출 후 h1 내부에 `(ID: {id})` 표시 |
| CalendarPage — react-calendar 사용 + 더미 마감일 | PASS | `react-calendar` 패키지 설치 확인(`package.json`), `<Calendar>` 컴포넌트 사용, `DUMMY_DEADLINES` 3건, `tileContent`로 dot 표시 |

### 7-5. 접근성

| 항목 | 결과 | 근거 |
|------|------|------|
| `<nav>` + `aria-label` | PASS | `Header.tsx` `<nav aria-label="주요 메뉴">`, MobileDrawer도 `<nav aria-label="모바일 메뉴">` |
| 인터랙티브 요소 키보드 포커스 가능 | PASS | 모든 클릭 가능 요소가 `<button type="button">` 또는 TanStack `<Link>` (= `<a>`) 로 구현. 탭버튼, 필터버튼, 햄버거, 닫기버튼 전부 `<button>` |

---

## 잘 구현된 부분

1. **TanStack Router 타입 안전성**: `createRoute`, `useParams({ from: '...' })` 등 타입 안전 API를 올바르게 사용. `declare module` 확장도 완비.
2. **접근성 배려**: `role="tablist"`, `aria-selected`, `role="progressbar"` 등 ARIA 속성이 적극 적용되어 스펙 최소 요구 이상.
3. **디자인 토큰 일관성**: `tokens.css`에 spec 6장 전체 토큰이 정의되어 있고, 모든 컴포넌트가 하드코딩 없이 CSS 변수 사용.
4. **MobileDrawer overlay 닫기**: 오버레이 클릭으로 드로어 닫기 구현 (spec 7-2 요구사항).

---

## 비-DoD 발견사항 (다음 이터레이션 수정 권고)

### [MINOR-1] `vite.config.ts` API 프록시 미설정

**위치**: `/Users/soohalee/Documents/ONESTEP/ONESTEP-fe/vite.config.ts`

**설명**: spec 5-5에서 요구하는 `/api` 프록시가 빠져 있습니다. 현재는 API 호출이 없으므로 즉각 영향은 없지만, Phase 1에서 API 연동 시 CORS 오류가 발생합니다.

**수정 지시**:
```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

### [MINOR-2] `SupportDetailPage.tsx` — map 내부 Fragment key 누락

**위치**: `/Users/soohalee/Documents/ONESTEP/ONESTEP-fe/src/pages/SupportDetailPage.tsx`, 약 line 116–129

**설명**: `.map()`의 최외곽 반환 요소가 `<>` (단축 Fragment)이며 key 속성을 받을 수 없습니다. 하위 `<dt>`/`<dd>`에 key를 달아도 React는 map 항목 자체를 식별하지 못해 런타임 콘솔 경고를 발생시킵니다.

**수정 지시**: 단축 `<>` 대신 `<React.Fragment key={label}>` 을 사용합니다.

```tsx
import React from 'react'
// ...
{[
  ['신청 대상', DUMMY_DETAIL.targetAge],
  ['지원 금액', DUMMY_DETAIL.supportAmount],
  ['신청 마감', DUMMY_DETAIL.deadline],
].map(([label, value]) => (
  <React.Fragment key={label}>
    <dt style={{ ... }}>{label}</dt>
    <dd style={{ ... }}>{value}</dd>
  </React.Fragment>
))}
```

---

## 결론

DoD 섹션 7 전 항목 통과 → **PASS**. 머지 게이트 사람 승인으로 진행 가능.
MINOR-1(vite 프록시)과 MINOR-2(Fragment key)는 Phase 1 진입 전 수정을 권고합니다.
