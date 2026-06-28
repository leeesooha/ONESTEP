export function Footer() {
  return (
    <footer
      style={{
        height: 'var(--footer-height)',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)',
          margin: 0,
        }}
      >
        &copy; 2026 ONESTEP. All rights reserved.
      </p>
    </footer>
  )
}
