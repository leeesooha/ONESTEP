import { Outlet } from '@tanstack/react-router'
import { Header } from './Header'
import { Footer } from './Footer'

export function RootLayout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <main style={{ flex: 1, paddingTop: 'var(--space-8)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
