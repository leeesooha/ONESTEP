import React from 'react'
import { useParams, Link } from '@tanstack/react-router'

const DUMMY_DETAIL = {
  title: '자립수당 지원사업',
  category: '금융',
  region: '전국',
  deadline: '2026.07.31',
  targetAge: '만 18세 ~ 24세',
  supportAmount: '월 40만 원',
  description:
    '자립준비청년(보호종료아동)의 안정적인 사회 정착을 위해 보호종료 후 5년 이내 청년에게 자립수당을 지원합니다. 매월 40만 원이 지급되며, 주거비, 생활비, 교육비 등 자유롭게 사용할 수 있습니다.',
  howToApply: [
    '주소지 관할 읍·면·동 주민센터 방문 신청',
    '복지로(www.bokjiro.go.kr) 온라인 신청',
    '신분증, 보호종료 확인서류 지참',
  ],
  contact: '보건복지부 아동권리과 ☎ 044-202-3416',
}

export function SupportDetailPage() {
  const { id } = useParams({ from: '/support/$id' })

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 var(--space-6) var(--space-12)',
      }}
    >
      <Link
        to="/support"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          textDecoration: 'none',
          marginBottom: 'var(--space-6)',
        }}
      >
        ← 목록으로 돌아가기
      </Link>

      <article
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-primary)',
              backgroundColor: 'var(--color-primary-light)',
              padding: '2px var(--space-2)',
              borderRadius: 'var(--border-radius-sm)',
            }}
          >
            {DUMMY_DETAIL.category}
          </span>
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-bg)',
              padding: '2px var(--space-2)',
              borderRadius: 'var(--border-radius-sm)',
            }}
          >
            {DUMMY_DETAIL.region}
          </span>
        </div>

        <h1
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {DUMMY_DETAIL.title}
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-secondary)',
              fontWeight: 'var(--font-weight-regular)',
              marginLeft: 'var(--space-3)',
            }}
          >
            (ID: {id})
          </span>
        </h1>

        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 'var(--space-3) var(--space-6)',
            marginBottom: 'var(--space-6)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          {[
            ['신청 대상', DUMMY_DETAIL.targetAge],
            ['지원 금액', DUMMY_DETAIL.supportAmount],
            ['신청 마감', DUMMY_DETAIL.deadline],
          ].map(([label, value]) => (
            <React.Fragment key={label}>
              <dt
                style={{ color: 'var(--color-text-secondary)', fontWeight: 'var(--font-weight-medium)', whiteSpace: 'nowrap' }}
              >
                {label}
              </dt>
              <dd style={{ color: 'var(--color-text-primary)', margin: 0 }}>
                {value}
              </dd>
            </React.Fragment>
          ))}
        </dl>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 'var(--space-6) 0' }} />

        <section style={{ marginBottom: 'var(--space-6)' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            사업 개요
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--line-height-base)',
              margin: 0,
            }}
          >
            {DUMMY_DETAIL.description}
          </p>
        </section>

        <section style={{ marginBottom: 'var(--space-6)' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            신청 방법
          </h2>
          <ol
            style={{
              margin: 0,
              paddingLeft: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            {DUMMY_DETAIL.howToApply.map((step) => (
              <li
                key={step}
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-base)',
                }}
              >
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section
          style={{
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: 'var(--border-radius-md)',
            padding: 'var(--space-4)',
          }}
        >
          <h2
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary-dark)',
              margin: '0 0 var(--space-2) 0',
            }}
          >
            문의처
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-primary)',
              margin: 0,
            }}
          >
            {DUMMY_DETAIL.contact}
          </p>
        </section>
      </article>
    </div>
  )
}
