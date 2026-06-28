# API Contract — page-skeleton 단계

> 이 문서는 page-skeleton 단계(Phase 0)에서 제공되는 BE API 엔드포인트와 CORS 정책을 정의합니다.
> Phase 1 MVP에서 추가될 예정인 엔드포인트는 하단 "예정 엔드포인트" 섹션에 스펙만 기재하며, 이 단계에서는 구현하지 않습니다.

---

## Base URL

| 환경 | Base URL |
|------|----------|
| Local (BE) | `http://localhost:8080` |
| Local (FE) | `http://localhost:5173` |

---

## CORS 정책

| 항목 | 값 |
|------|----|
| 허용 오리진 | `http://localhost:5173` |
| 허용 메서드 | `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS` |
| 허용 헤더 | `Content-Type`, `Authorization` |
| Credentials | `true` |
| 적용 범위 | `/**` (전체 경로) |

구현 파일: `src/main/java/org/example/onestepbe/config/CorsConfig.java`

---

## 현재 제공 엔드포인트

### GET /api/health

서버 상태를 확인하는 헬스 체크 엔드포인트입니다.

#### Request

```
GET /api/health
```

요청 바디 없음, 인증 불필요.

#### Response

- **HTTP Status**: `200 OK`
- **Content-Type**: `application/json`

```json
{
  "status": "ok",
  "service": "ONESTEP-be"
}
```

#### 응답 스키마

| 필드 | 타입 | 설명 |
|------|------|------|
| `status` | `string` | 서버 상태. 정상 시 `"ok"` 고정 |
| `service` | `string` | 서비스 이름. `"ONESTEP-be"` 고정 |

#### 예시 (curl)

```bash
curl http://localhost:8080/api/health
# 응답: {"status":"ok","service":"ONESTEP-be"}
```

---

## Phase 1 MVP 예정 엔드포인트 (스펙만, 미구현)

> 아래 엔드포인트는 Phase 1 구현 시 추가될 예정입니다. 현재는 구현되어 있지 않습니다.

### GET /api/supports

지원사업 목록을 조회합니다.

#### Request

```
GET /api/supports?page={page}&size={size}&category={category}
```

| 쿼리 파라미터 | 타입 | 필수 | 설명 |
|--------------|------|------|------|
| `page` | `integer` | 선택 | 페이지 번호 (0-based, 기본값 `0`) |
| `size` | `integer` | 선택 | 페이지 크기 (기본값 `20`) |
| `category` | `string` | 선택 | 지원사업 카테고리 필터 |

#### Response (예정)

- **HTTP Status**: `200 OK`

```json
{
  "content": [
    {
      "id": 1,
      "title": "청년 창업 지원사업",
      "category": "창업",
      "organization": "중소벤처기업부",
      "deadline": "2026-08-31",
      "summary": "만 39세 이하 청년 창업자 대상 최대 1억원 지원"
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 100,
  "totalPages": 5
}
```

---

### GET /api/supports/{id}

특정 지원사업의 상세 정보를 조회합니다.

#### Request

```
GET /api/supports/{id}
```

| 경로 파라미터 | 타입 | 필수 | 설명 |
|--------------|------|------|------|
| `id` | `integer` | 필수 | 지원사업 고유 ID |

#### Response (예정)

- **HTTP Status**: `200 OK`
- 존재하지 않는 ID: `404 Not Found`

```json
{
  "id": 1,
  "title": "청년 창업 지원사업",
  "category": "창업",
  "organization": "중소벤처기업부",
  "deadline": "2026-08-31",
  "summary": "만 39세 이하 청년 창업자 대상 최대 1억원 지원",
  "description": "상세 내용...",
  "eligibility": "만 19세 이상 39세 이하 예비창업자 또는 창업 3년 이내 기업",
  "applyUrl": "https://www.k-startup.go.kr/...",
  "createdAt": "2026-06-01T00:00:00Z",
  "updatedAt": "2026-06-28T00:00:00Z"
}
```

---

## 버전 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v0.1 | 2026-06-28 | page-skeleton 초기 작성. `/api/health` 추가, Phase 1 예정 엔드포인트 스펙 초안 |
