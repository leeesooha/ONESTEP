import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: 'var(--space-16) var(--space-6)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-6)',
      }}
    >
      <p
        style={{
          fontSize: '4rem',
          lineHeight: 1,
          margin: 0,
        }}
      >
        😕
      </p>
      <h1
        style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          margin: 0,
        }}
      >
        페이지를 찾을 수 없습니다
      </h1>
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--line-height-base)',
          margin: 0,
        }}
      >
        요청하신 주소가 존재하지 않거나 이동되었습니다.
        <br />
        주소를 다시 확인하거나 홈으로 돌아가 주세요.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-surface)',
          fontWeight: 'var(--font-weight-bold)',
          fontSize: 'var(--font-size-sm)',
          padding: 'var(--space-3) var(--space-8)',
          borderRadius: 'var(--border-radius-md)',
          textDecoration: 'none',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
