# Spec — 지원사업 실제 데이터 연동

> 작성일: 2026-06-28
> 단계: Phase 1 MVP
> 담당 핸드오프: BE → FE 순차 진행

---

## 1. 개요

### 목적

`SupportListPage`가 현재 컴포넌트 내 인라인 상수(`DUMMY_SUPPORTS`)에 의존하고 있다.
이 단계에서 SQL Server 데이터베이스와 Spring Boot API를 연동하여 실제 데이터를 렌더링하도록 교체한다.

### 범위

| 레이어 | 작업 |
|--------|------|
| 인프라 | Docker Compose로 SQL Server 2022 컨테이너 로컬 실행 |
| BE | DataSource 설정, `support` 테이블 DDL, 시드 데이터, `GET /api/supports` 엔드포인트 구현 |
| FE | `useSupports` 커스텀 훅 작성, `SupportListPage` 필터 실제 동작 연결, 로딩·에러 UI 추가 |

### 범위 밖

- `GET /api/supports/{id}` 상세 조회 (별도 단계)
- 나이(`age`) 필터의 백엔드 처리 — FE UI 상태로만 존재하며 이번 단계에서 DB 컬럼/API 파라미터 추가 없음
- 페이지네이션 — 시드 데이터 규모(15건)를 고려해 이번 단계는 전체 목록 단일 응답
- 인증/권한

---

## 2. DB 스키마

### 테이블: `support`

```sql
CREATE TABLE support (
    id          BIGINT        NOT NULL IDENTITY(1,1),
    title       NVARCHAR(200) NOT NULL,
    category    NVARCHAR(20)  NOT NULL,
    region      NVARCHAR(20)  NOT NULL,
    deadline    DATE          NOT NULL,
    description NVARCHAR(500) NOT NULL,
    created_at  DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
    updated_at  DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT PK_support PRIMARY KEY (id)
);
```

### 컬럼 정의

| 컬럼 | 타입 | NOT NULL | 설명 |
|------|------|----------|------|
| `id` | `BIGINT IDENTITY(1,1)` | Y | 자동 증가 PK |
| `title` | `NVARCHAR(200)` | Y | 지원사업명 |
| `category` | `NVARCHAR(20)` | Y | 분야. 허용값: `주거` `금융` `의료` `교육` `취업` `심리정서` `법률` `기타` |
| `region` | `NVARCHAR(20)` | Y | 지역. 허용값: `전국` `서울` `경기` `인천` `부산` `대구` `광주` `대전` `울산` |
| `deadline` | `DATE` | Y | 신청 마감일 |
| `description` | `NVARCHAR(500)` | Y | 한 줄 요약 설명 (카드 UI 표시용) |
| `created_at` | `DATETIME2` | Y | 레코드 생성 시각 |
| `updated_at` | `DATETIME2` | Y | 레코드 수정 시각 |

`category`와 `region`에 필터 쿼리 성능을 위한 인덱스를 생성한다.

```sql
CREATE INDEX IX_support_category ON support (category);
CREATE INDEX IX_support_region   ON support (region);
```

---

## 3. 시드 데이터

자립준비청년 대상 실제 지원사업 기반 15건. Proposal.md의 8대 분야(경제·주거·교육·취업·의료·금융·법률·심리)를 FE 카테고리값에 맞춰 배분한다.

| # | title | category | region | deadline | description |
|---|-------|----------|--------|----------|-------------|
| 1 | 자립수당 지원사업 | 금융 | 전국 | 2026-12-31 | 보호종료 후 5년 이내 자립준비청년에게 월 40만 원 자립수당을 현금으로 지급합니다. |
| 2 | 보호종료아동 자립정착금 | 금융 | 전국 | 2026-12-31 | 아동복지시설 퇴소 시 자립 초기 비용 마련을 위해 1인당 최대 500만 원을 일시 지급합니다. |
| 3 | 청년도약계좌 우선 가입 지원 | 금융 | 전국 | 2026-09-30 | 자립준비청년을 대상으로 청년도약계좌 우선 가입 기회를 제공하고 정부 기여금을 추가 지원합니다. |
| 4 | LH 전세임대주택 지원 | 주거 | 전국 | 2026-08-31 | LH가 기존 주택을 전세 계약 후 자립준비청년에게 시세 대비 저렴한 임대료로 재임대합니다. |
| 5 | 청년 매입임대주택 우선 공급 | 주거 | 전국 | 2026-09-30 | 자립준비청년을 위한 시세 30% 수준의 공공 매입임대주택을 우선 공급합니다. |
| 6 | 청년 월세 한시 특별지원 | 주거 | 전국 | 2026-10-31 | 무주택 저소득 청년에게 월 최대 20만 원의 월세를 최대 12개월간 한시 지원합니다. |
| 7 | 서울시 자립준비청년 주거안정 지원 | 주거 | 서울 | 2026-11-30 | 서울 거주 자립준비청년에게 보증금 및 월세 일부를 추가 지원하는 서울시 자체 주거 사업입니다. |
| 8 | 국민취업지원제도 1유형 | 취업 | 전국 | 2026-12-31 | 취업 취약계층 청년에게 구직촉진수당(월 50만 원 × 6개월)과 취업 활동 계획 수립을 지원합니다. |
| 9 | 자립준비청년 드림스타트 직업훈련 | 취업 | 경기 | 2026-09-30 | 직업 훈련, 이력서·면접 컨설팅, 취업 연계까지 원스톱으로 지원하는 직업훈련 프로그램입니다. |
| 10 | 보호종료아동 의료급여 특례 | 의료 | 전국 | 2026-12-31 | 만 24세 이하 보호종료아동의 입원·통원 의료비를 의료급여 특례로 전액 지원합니다. |
| 11 | 자립준비청년 건강검진 지원 | 의료 | 서울 | 2026-11-30 | 서울 거주 자립준비청년에게 종합 건강검진(기본 항목 + 정신건강 선별검사)을 무료로 지원합니다. |
| 12 | 자립준비청년 학자금 대출 특례 | 교육 | 전국 | 2026-08-15 | 재학 중인 자립준비청년의 등록금 전액을 무이자 학자금 대출로 지원합니다. |
| 13 | 아동복지 자립 장학금(희망리본) | 교육 | 전국 | 2026-07-31 | 대학 재학 중인 자립준비청년에게 학기당 최대 150만 원의 생활비 장학금을 지원합니다. |
| 14 | 청년 마음건강 바우처 | 심리정서 | 전국 | 2026-12-31 | 심리적 어려움을 겪는 자립준비청년에게 심리상담 서비스 이용권(연 24회, 회당 5만 원)을 지원합니다. |
| 15 | 법률홈닥터 무료 법률 상담 | 법률 | 전국 | 2026-12-31 | 자립준비청년의 전세 계약, 임금체불, 소비자 분쟁 등 생활 법률 문제를 변호사가 무료로 상담합니다. |

---

## 4. BE 작업 범위

### 4-1. 신규 파일 목록

```
ONESTEP-be/
└── src/
    └── main/
        ├── java/org/example/onestepbe/
        │   ├── model/
        │   │   └── Support.java              # 도메인 모델 (Lombok @Data)
        │   ├── mapper/
        │   │   └── SupportMapper.java        # MyBatis Mapper 인터페이스
        │   ├── service/
        │   │   └── SupportService.java       # 비즈니스 로직
        │   └── controller/
        │       └── SupportController.java    # REST 컨트롤러
        └── resources/
            ├── application.properties        # DataSource 설정 추가 (기존 파일 수정)
            ├── schema.sql                    # support 테이블 DDL
            ├── data.sql                      # 시드 데이터 15건 INSERT
            └── mapper/
                └── SupportMapper.xml         # MyBatis SQL XML
```

### 4-2. `application.properties` 변경

`spring.autoconfigure.exclude` 라인 전체 제거 후 아래 DataSource 설정 추가.
자격증명은 `.env` 파일에서 환경변수로 주입받는다.

```properties
# DataSource — SQL Server (Docker)
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=onestep;encrypt=false;trustServerCertificate=true
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASS}
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver

# MyBatis
mybatis.mapper-locations=classpath:mapper/*.xml
mybatis.configuration.map-underscore-to-camel-case=true

# 서버 기동 시 schema.sql / data.sql 자동 실행
spring.sql.init.mode=always
spring.sql.init.schema-locations=classpath:schema.sql
spring.sql.init.data-locations=classpath:data.sql
```

### 4-3. API 스펙 — `GET /api/supports`

#### Request

```
GET /api/supports
GET /api/supports?category=주거
GET /api/supports?region=서울
GET /api/supports?category=주거&region=서울
```

| 쿼리 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|--------------|------|------|--------|------|
| `category` | `string` | 선택 | (없음 = 전체) | 분야 필터. FE FIELDS 값과 동일해야 함 |
| `region` | `string` | 선택 | (없음 = 전체) | 지역 필터. FE REGIONS 값과 동일해야 함 |

두 파라미터가 모두 전달되면 AND 조건으로 필터링한다.

#### Response

- HTTP Status: `200 OK`
- Content-Type: `application/json`

```json
{
  "data": [
    {
      "id": 1,
      "title": "자립수당 지원사업",
      "category": "금융",
      "region": "전국",
      "deadline": "2026-12-31",
      "description": "보호종료 후 5년 이내 자립준비청년에게 월 40만 원 자립수당을 현금으로 지급합니다."
    }
  ],
  "total": 15
}
```

#### 응답 필드 정의

| 필드 | 타입 | 설명 |
|------|------|------|
| `data` | `array` | 필터 조건에 해당하는 지원사업 배열 |
| `data[].id` | `number` | 지원사업 고유 ID (BIGINT → JSON number) |
| `data[].title` | `string` | 지원사업명 |
| `data[].category` | `string` | 분야 |
| `data[].region` | `string` | 지역 |
| `data[].deadline` | `string` | 마감일. ISO 8601 날짜 형식 `"YYYY-MM-DD"` |
| `data[].description` | `string` | 한 줄 요약 |
| `total` | `number` | 필터 결과 총 건수 |

#### 에러 응답

| 상황 | HTTP Status | body |
|------|-------------|------|
| 서버 내부 오류 | `500 Internal Server Error` | `{"error": "Internal Server Error"}` |

#### MyBatis 동적 SQL 패턴

```xml
<select id="findAll" resultType="Support">
  SELECT id, title, category, region, deadline, description
  FROM support
  <where>
    <if test="category != null and category != ''">
      AND category = #{category}
    </if>
    <if test="region != null and region != ''">
      AND region = #{region}
    </if>
  </where>
  ORDER BY deadline ASC
</select>
```

### 4-4. 도메인 모델 (`Support.java`) 필드

```
Long   id
String title
String category
String region
String deadline   // java.time.LocalDate → JSON "YYYY-MM-DD" (Jackson 직렬화)
String description
```

`LocalDate` → JSON 직렬화는 `application.properties`에 `spring.jackson.serialization.write-dates-as-timestamps=false` 추가로 처리한다.

---

## 5. FE 작업 범위

### 5-1. 신규 파일: `src/hooks/useSupports.ts`

```typescript
interface SupportItem {
  id: string        // number → string 변환 (SupportCard props 호환)
  title: string
  category: string
  region: string
  deadline: string  // "YYYY-MM-DD" → 표시 시 "YYYY.MM.DD" 변환 필요
  description: string
}

interface UseSupportsResult {
  data: SupportItem[]
  total: number
  loading: boolean
  error: string | null
}

interface SupportFilters {
  category?: string  // "전체" 선택 시 undefined로 전달
  region?: string    // "전국" 선택 시 undefined로 전달
}

function useSupports(filters: SupportFilters): UseSupportsResult
```

- `fetch`로 `GET /api/supports` 호출. `filters`가 변경될 때마다 재요청(`useEffect` 의존성).
- `category === '전체'` 또는 `region === '전국'`이면 해당 파라미터를 URL에서 제외한다.
- Base URL은 `import.meta.env.VITE_API_BASE_URL` (기본값: `http://localhost:8080`)을 사용한다.
- `id`는 API에서 `number`로 내려오므로 `String(item.id)`로 변환해 `SupportCard`에 전달한다.
- `deadline` 포맷 변환: `"2026-12-31"` → `"2026.12.31"` (`.replace(/-/g, '.')`).

### 5-2. `SupportListPage.tsx` 변경 사항

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 데이터 소스 | `DUMMY_SUPPORTS` 인라인 상수 | `useSupports({ category, region })` 훅 |
| 필터 동작 | 상태만 변경, 카드 목록 미변경 | 필터 변경 시 API 재요청 → 카드 목록 갱신 |
| 로딩 상태 | 없음 | 스켈레톤 카드 UI 표시 |
| 에러 상태 | 없음 | 에러 메시지 UI 표시 |
| 결과 건수 | `DUMMY_SUPPORTS.length` 하드코딩 | `total` 값 표시 |
| `나이` 필터 | UI 상태만 존재 | 변경 없음 (BE 파라미터 없음) |

`DUMMY_SUPPORTS` 상수와 관련 import는 삭제한다.

### 5-3. 로딩 스켈레톤 UI

`loading === true`일 때 `SupportCard`와 동일한 그리드 레이아웃에 회색 블록 플레이스홀더 4개를 렌더링한다.
별도 라이브러리 없이 인라인 스타일로 구현한다.

```tsx
// 예시 구조
<article style={{ /* SupportCard와 동일한 크기 */ }}>
  <div style={{ background: 'var(--color-border)', borderRadius: 4, height: 20, width: '40%' }} />
  <div style={{ background: 'var(--color-border)', borderRadius: 4, height: 24, marginTop: 8 }} />
  <div style={{ background: 'var(--color-border)', borderRadius: 4, height: 16, marginTop: 8, width: '80%' }} />
</article>
```

### 5-4. 에러 UI

`error !== null`일 때 카드 그리드 대신 아래 메시지를 표시한다.

```tsx
<p style={{ color: 'var(--color-error)', textAlign: 'center', padding: 'var(--space-12) 0' }}>
  데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
</p>
```

### 5-5. 환경 변수

`ONESTEP-fe/.env.local` (git 제외)에 추가:

```
VITE_API_BASE_URL=http://localhost:8080
```

---

## 6. Docker Compose 설정

파일 위치: `/Users/soohalee/Documents/ONESTEP/docker-compose.yml`

```yaml
services:
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: onestep-db
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "${DB_PASS}"
    ports:
      - "1433:1433"
    volumes:
      - onestep-db-data:/var/opt/mssql

volumes:
  onestep-db-data:
```

자격증명 파일: `/Users/soohalee/Documents/ONESTEP/.env` (git 제외 필수)

```env
DB_USER=sa
DB_PASS=OnestepDev!2026
```

`.gitignore`에 `.env` 추가 여부 확인 필요.

데이터베이스 초기화: SQL Server 컨테이너는 `onestep` 데이터베이스를 자동 생성하지 않는다.
컨테이너 최초 기동 후 아래 명령어로 데이터베이스를 수동 생성해야 한다.

```bash
docker exec -it onestep-db /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P 'OnestepDev!2026' -No \
  -Q "CREATE DATABASE onestep;"
```

이후 Spring Boot 기동 시 `schema.sql` → `data.sql` 순으로 자동 실행된다.

---

## 7. 완료 조건 (DoD)

### 인프라

- [ ] `docker-compose up -d` 실행 후 SQL Server 컨테이너가 정상 기동된다.
- [ ] `onestep` 데이터베이스와 `support` 테이블이 생성된다.
- [ ] 시드 데이터 15건이 `support` 테이블에 삽입된다.

### BE

- [ ] `./gradlew bootRun` 실행 시 DataSource 연결 오류 없이 기동된다.
- [ ] `GET /api/supports` 가 `200 OK`와 15건 데이터를 반환한다.
- [ ] `GET /api/supports?category=주거` 가 `category = '주거'`인 항목만 반환한다.
- [ ] `GET /api/supports?region=서울` 가 `region = '서울'`인 항목만 반환한다.
- [ ] `GET /api/supports?category=주거&region=서울` 가 두 조건 AND 결과를 반환한다.
- [ ] `GET /api/health` 기존 응답이 유지된다.

### FE

- [ ] `SupportListPage` 최초 진입 시 API를 호출하여 전체 15건을 렌더링한다.
- [ ] 분야 필터 버튼 클릭 시 해당 카테고리 데이터만 카드에 표시된다.
- [ ] 지역 필터 버튼 클릭 시 해당 지역 데이터만 카드에 표시된다.
- [ ] API 응답 대기 중 스켈레톤 UI가 표시된다.
- [ ] API 오류 시 에러 메시지가 표시된다 (BE를 종료한 상태에서 검증).
- [ ] 결과 건수(`총 N건`)가 필터 결과에 맞게 동적으로 변경된다.
- [ ] `DUMMY_SUPPORTS` 관련 코드가 `SupportListPage.tsx`에 남아 있지 않다.

---

## 오픈 퀘스천

1. **`나이` 필터 백엔드 처리 시점** — 현재 FE의 나이 필터는 UI 상태만 존재하고 실제 필터링이 없다. `support` 테이블에 `min_age`, `max_age` 컬럼을 추가하고 API 파라미터를 확장하는 작업은 이번 단계 범위 밖으로 뺐다. 다음 단계에서 다룰지 확인 필요.

2. **`data.sql` 멱등성** — Spring이 `spring.sql.init.mode=always`로 설정되면 재기동마다 `data.sql`을 실행한다. `TRUNCATE TABLE support` 선행 실행 또는 `IF NOT EXISTS` 조건 추가 방식 중 어느 것을 선택할지 BE 담당자 판단 필요.

3. **`.gitignore`에 `.env` 포함 여부** — 현재 레포에 `.env` 파일이 커밋되어 있지 않은지 확인 후, 없다면 루트 `.gitignore`에 `.env` 항목을 추가해야 한다.
