import { Link } from '@tanstack/react-router'

interface SupportCardProps {
  id: string
  title: string
  category: string
  deadline: string
  region: string
  description: string
}

export function SupportCard({ id, title, category, deadline, region, description }: SupportCardProps) {
  return (
    <article
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--border-radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
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
          {category}
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
          {region}
        </span>
      </div>

      <h3
        style={{
          fontSize: 'var(--font-size-md)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          margin: 0,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--line-height-base)',
          margin: 0,
        }}
      >
        {description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-error)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          마감 {deadline}
        </span>
        <Link
          to="/support/$id"
          params={{ id }}
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-primary)',
            textDecoration: 'none',
          }}
        >
          자세히 보기 &rarr;
        </Link>
      </div>
    </article>
  )
}
