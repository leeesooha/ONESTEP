import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { RootLayout } from './components/layout/RootLayout'
import { HomePage } from './pages/HomePage'
import { SupportListPage } from './pages/SupportListPage'
import { SupportDetailPage } from './pages/SupportDetailPage'
import { ChecklistPage } from './pages/ChecklistPage'
import { GuidePage } from './pages/GuidePage'
import { CalendarPage } from './pages/CalendarPage'
import { NotFoundPage } from './pages/NotFoundPage'

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support',
  component: SupportListPage,
})

const supportDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/support/$id',
  component: SupportDetailPage,
})

const checklistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checklist',
  component: ChecklistPage,
})

const guideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guide',
  component: GuidePage,
})

const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calendar',
  component: CalendarPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  supportRoute,
  supportDetailRoute,
  checklistRoute,
  guideRoute,
  calendarRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
