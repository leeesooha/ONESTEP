# QA Report — support-real-data

> 평가일: 2026-06-28
> 평가자: QA Agent (claude-sonnet-4-6)
> 최종 판정: **PASS**

---

## 채점 루브릭

| # | 항목 | 통과 조건 | 결과 | 비고 |
|---|------|----------|------|------|
| 1 | FE lint | 에러 0건 | PASS | oxlint 실행 결과 에러 없음 |
| 2 | FE build | tsc + vite build 성공 | PASS | `tsc -b && vite build` 정상 완료 (331 kB 번들) |
| 3 | BE 기동 | DataSource 연결 오류 없이 정상 기동 | PASS | SQL Server 연결 성공, schema.sql/data.sql 자동 실행 확인 |
| 4 | GET /api/health | 200 OK | PASS | `{"status":"ok","service":"ONESTEP-be"}` |
| 5 | GET /api/supports | total = 15 | PASS | `전체: 15` |
| 6 | category 필터 | ?category=주거 → 4건 | PASS | `주거: 4` |
| 7 | region 필터 | ?region=서울 → 2건 | PASS | `서울: 2` |
| 8 | AND 필터 | ?category=주거&region=서울 → 1건 | PASS | `주거+서울: 1` |
| 9 | deadline 형식 | "YYYY-MM-DD" 문자열 | PASS | `"2026-07-31"` — `@JsonFormat` 어노테이션으로 처리 |
| 10 | DUMMY_SUPPORTS 제거 | SupportListPage.tsx에 문자열 없음 | PASS | `grep -r "DUMMY_SUPPORTS" src/` 결과 없음 (exit 1) |
| 11 | 로딩 UI 코드 | 스켈레톤 article 요소 존재 | PASS | SupportListPage.tsx L165-182: `Array.from({length:4}).map(...)` → `<article>` 스켈레톤 4개 |
| 12 | 에러 UI 코드 | error 분기 처리 존재 | PASS | SupportListPage.tsx L184-188: `!loading && error !== null` 분기 → 에러 메시지 `<p>` |

---

## 세부 검증 결과

### Step 1 — FE lint/build

- `pnpm run lint` (oxlint): 에러 0건, 경고 없음
- `pnpm run build`: `tsc -b` 타입 오류 없음, vite 빌드 성공 (127ms)

### Step 2 — BE 기동 및 API 검증

- `onestep-db` Docker 컨테이너 정상 가동 확인 (Up 24 minutes)
- `./gradlew bootRun`: DataSource 연결 성공, schema.sql(IF NOT EXISTS 가드) / data.sql(멱등 INSERT) 실행 완료
- `/api/health`: `{"status":"ok","service":"ONESTEP-be"}`
- `/api/supports`: `total: 15`
- `/api/supports?category=주거`: `total: 4` (전국 3건 + 서울 1건)
- `/api/supports?region=서울`: `total: 2` (주거·의료 각 1건)
- `/api/supports?category=주거&region=서울`: `total: 1` (서울시 자립준비청년 주거안정 지원)
- deadline 형식: `"2026-07-31"` — ISO 8601 YYYY-MM-DD 준수

### Step 3 — FE 코드 리뷰

**useSupports.ts**
- `filters.category === '전체'` 또는 미지정 시 파라미터 제외: L33-35 정상 구현
- `filters.region === '전국'` 또는 미지정 시 파라미터 제외: L36-38 정상 구현
- `id: String(item.id)` 변환: L55 확인
- `deadline.replace(/-/g, '.')` 포맷 변환: L59 확인
- `useEffect` 의존성: `[filters.category, filters.region]`: L71 확인

**SupportListPage.tsx**
- `DUMMY_SUPPORTS` 문자열: 파일 전체에 존재하지 않음 (src/ 전체 grep 결과 없음)
- `useSupports({ category: selectedField, region: selectedRegion })` 훅 사용: L14-17
- 로딩 스켈레톤: `loading && Array.from({length:4}).map(...)` → `<article>` (L164-182)
- 에러 UI: `!loading && error !== null` → `<p style={{color:'var(--color-error)'...}}>` (L184-188)
- `total` 동적 표시: `{total}건` (L150)

---

## 주요 관찰 사항 (기준 외, 수정 불필요)

아래 항목은 12개 채점 기준에 포함되지 않으나 후속 단계에서 개선 권고.

1. **DB 자격증명 하드코딩**
   - `application.properties`에 `spring.datasource.username=sa` / `spring.datasource.password=OnestepDev!2026` 이 평문으로 기록되어 있음.
   - 스펙은 `${DB_USER}` / `${DB_PASS}` 환경변수 주입을 요구했으나 구현이 직접 값을 기재함.
   - 현 로컬 전용 환경에서 기능 동작은 문제없으나, 리포지토리에 해당 파일이 포함되면 자격증명 노출 위험이 있음.
   - 권고: `application.properties`를 스펙 지정 형식(`${DB_USER}`, `${DB_PASS}`)으로 교체하고, `.env` 파일로 주입.

2. **VITE_API_BASE_URL 미사용**
   - 스펙 5-1은 `import.meta.env.VITE_API_BASE_URL`을 Base URL로 사용하도록 명시.
   - 구현은 vite proxy(`/api → http://localhost:8080`)를 활용한 상대경로 `/api/supports` 사용.
   - 개발 환경에서는 정상 동작하나, 스펙 의도와 다르게 구현됨.
   - 권고: 빌드 환경 또는 배포 환경 전환 시 proxy 없이 동작하도록 `VITE_API_BASE_URL` 기반으로 변경.

3. **`spring.jackson.serialization.write-dates-as-timestamps=false` 미설정**
   - 스펙은 application.properties 항목으로 Jackson LocalDate 직렬화를 제어하도록 명시.
   - 구현은 `Support.java`의 `@JsonFormat(shape=STRING, pattern="yyyy-MM-dd")` 어노테이션으로 대체.
   - 결과는 동일하나, 앞으로 다른 LocalDate 필드 추가 시 어노테이션을 개별 적용해야 하는 유지보수 부담 발생.

---

## 최종 판정

**PASS** — 12개 채점 항목 전부 통과.
