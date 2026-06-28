import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { MobileDrawer } from './MobileDrawer'
import styles from './Header.module.css'

const NAV_LINKS = [
  { to: '/support' as const, label: '지원사업 검색' },
  { to: '/checklist' as const, label: '체크리스트' },
  { to: '/guide' as const, label: '생활가이드' },
  { to: '/calendar' as const, label: '캘린더' },
]

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          to="/"
          className={styles.logo}
          aria-label="ONESTEP 홈으로"
        >
          ONESTEP
        </Link>

        <nav aria-label="주요 메뉴" className={styles.nav}>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={styles.navLink}
              activeProps={{ className: `${styles.navLink} ${styles.navLinkActive}` }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setDrawerOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={drawerOpen}
        >
          ☰
        </button>
      </div>

      {drawerOpen && (
        <MobileDrawer onClose={() => setDrawerOpen(false)} />
      )}
    </header>
  )
}
