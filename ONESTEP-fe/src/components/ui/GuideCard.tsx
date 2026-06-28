interface GuideCardProps {
  title: string
  description: string
  tags: string[]
}

export function GuideCard({ title, description, tags }: GuideCardProps) {
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
          flex: 1,
        }}
      >
        {description}
      </p>

      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-secondary)',
                backgroundColor: '#E6F7F2',
                padding: '2px var(--space-2)',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
