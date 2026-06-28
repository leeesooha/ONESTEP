interface ChecklistItemProps {
  label: string
  checked: boolean
  onChange: () => void
}

export function ChecklistItem({ label, checked, onChange }: ChecklistItemProps) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        backgroundColor: checked ? 'var(--color-primary-light)' : 'var(--color-surface)',
        borderRadius: 'var(--border-radius-md)',
        border: `1px solid ${checked ? 'var(--color-primary)' : 'var(--color-border)'}`,
        cursor: 'pointer',
        transition: 'background-color 0.2s, border-color 0.2s',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{
          width: '18px',
          height: '18px',
          accentColor: 'var(--color-primary)',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 'var(--font-size-sm)',
          color: checked ? 'var(--color-primary-dark)' : 'var(--color-text-primary)',
          fontWeight: checked ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
          textDecoration: checked ? 'line-through' : 'none',
        }}
      >
        {label}
      </span>
    </label>
  )
}
