# Design Notes — ONESTEP FE 디자인 토큰 설정

작성일: 2026-06-28  
담당: design 에이전트

---

## 1. CSS 변수 토큰

토큰은 아래 파일에 정의되어 있습니다.

```
ONESTEP-fe/src/styles/tokens.css
```

진입점 연결 구조:

```
src/index.css
  └─ src/styles/global.css
        ├─ src/styles/tokens.css   ← 변수 정의
        └─ src/styles/reset.css    ← 브라우저 초기화
```

### 색상 토큰

| 변수명 | 값 | 용도 |
|---|---|---|
| `--color-primary` | `#2D6BE4` | 메인 브랜드, CTA 버튼 |
| `--color-primary-light` | `#EBF1FC` | 배경 강조, 선택 상태 |
| `--color-primary-dark` | `#1A4FB5` | hover·active 상태 |
| `--color-secondary` | `#00B07B` | 보조 강조, 성공 상태 |
| `--color-surface` | `#FFFFFF` | 카드·모달 배경 |
| `--color-bg` | `#F5F7FA` | 페이지 기본 배경 |
| `--color-text-primary` | `#1A1A1A` | 본문, 제목 |
| `--color-text-secondary` | `#6B7280` | 보조 텍스트, 플레이스홀더 |
| `--color-border` | `#E5E7EB` | 구분선, 입력 테두리 |
| `--color-error` | `#DC2626` | 에러 메시지, 유효성 실패 |
| `--color-disabled` | `#D1D5DB` | 비활성 요소 |

### 타이포그래피 토큰

| 변수명 | 값 |
|---|---|
| `--font-family-base` | `'Pretendard', 'Apple SD Gothic Neo', sans-serif` |
| `--font-size-xs` | `12px` |
| `--font-size-sm` | `14px` |
| `--font-size-md` | `16px` (기본) |
| `--font-size-lg` | `20px` |
| `--font-size-xl` | `24px` |
| `--font-size-2xl` | `32px` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-bold` | `700` |
| `--line-height-tight` | `1.3` |
| `--line-height-base` | `1.6` |

### 간격 토큰 (4px 기준 그리드)

| 변수명 | 값 |
|---|---|
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

### 레이아웃·반경·그림자 토큰

| 변수명 | 값 |
|---|---|
| `--max-width-content` | `1200px` |
| `--max-width-narrow` | `768px` |
| `--header-height` | `60px` |
| `--footer-height` | `56px` |
| `--border-radius-sm` | `4px` |
| `--border-radius-md` | `8px` |
| `--border-radius-lg` | `16px` |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` |

---

## 2. 폰트 로드 방식

Pretendard를 jsDelivr CDN으로 로드합니다. `index.html` `<head>` 에 아래 태그가 추가되어 있습니다.

```
ONESTEP-fe/index.html
```

CDN URL:
```
https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css
```

버전이 `v1.3.9`로 고정되어 있으므로 의도치 않은 업데이트 영향을 받지 않습니다.  
폰트 로드 실패 시 `'Apple SD Gothic Neo'` → `sans-serif` 순서로 폴백됩니다.

---

## 3. 컴포넌트 작성 시 주의사항

### 색상은 반드시 변수 참조, 하드코딩 금지

```css
/* 금지 */
color: #2D6BE4;
background-color: #F5F7FA;

/* 올바른 방식 */
color: var(--color-primary);
background-color: var(--color-bg);
```

### 간격·크기도 변수 우선 사용

4px 그리드를 지키기 위해 `--space-*` 변수를 사용합니다.  
그리드 외 값이 필요할 경우 디자인 에이전트와 협의 후 토큰을 추가합니다.

### 폰트 패밀리 직접 지정 금지

```css
/* 금지 */
font-family: 'Pretendard', sans-serif;

/* 올바른 방식 */
font-family: var(--font-family-base);
```

### `src/index.css` 직접 수정 금지

`src/index.css`는 `@import './styles/global.css';` 한 줄만 유지합니다.  
전역 스타일 변경은 `src/styles/` 내 해당 파일에서 진행합니다.

### 기존 토큰 값 변경·삭제 시 사전 승인 필요

토큰은 전역 참조되므로, 기존 변수의 값 변경이나 삭제는 design 에이전트의 사람 승인을 받은 후 진행합니다.

---

## 4. 향후 다크 모드 대응 방법 제안

현재 단계에서는 라이트 모드만 구현합니다. 다크 모드 추가 시 아래 방식을 권장합니다.

### 권장 방식: 미디어 쿼리 오버라이드

`tokens.css` 내에 아래 블록을 추가합니다.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface:         #1E1E2E;
    --color-bg:              #12121A;
    --color-text-primary:    #F3F4F6;
    --color-text-secondary:  #9CA3AF;
    --color-border:          #2E303A;
    /* 필요한 색상 토큰만 오버라이드 */
  }
}
```

이 방식의 장점은 컴포넌트 CSS를 수정하지 않아도 된다는 점입니다. `var()` 참조를 유지하면 오버라이드만으로 자동 반영됩니다.

### 사용자 선택 모드가 필요한 경우

`data-theme` 속성 방식을 사용합니다.

```css
[data-theme='dark'] {
  --color-surface: #1E1E2E;
  /* ... */
}
```

`<html data-theme="dark">` 또는 `<body data-theme="dark">`로 JS에서 제어합니다.  
미디어 쿼리와 병행 사용도 가능합니다.
