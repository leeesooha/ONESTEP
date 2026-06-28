import { Link } from '@tanstack/react-router'
import styles from './MobileDrawer.module.css'

interface MobileDrawerProps {
  onClose: () => void
}

const NAV_LINKS = [
  { to: '/support' as const, label: '지원사업 검색' },
  { to: '/checklist' as const, label: '체크리스트' },
  { to: '/guide' as const, label: '생활가이드' },
  { to: '/calendar' as const, label: '캘린더' },
]

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
        className={styles.drawer}
      >
        <div className={styles.header}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
        </div>
        <nav aria-label="모바일 메뉴" className={styles.nav}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.navLinkActive}` }}
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
