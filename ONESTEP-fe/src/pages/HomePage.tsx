import { Link } from '@tanstack/react-router'

const FEATURE_CARDS = [
  {
    id: 'search',
    icon: '🔍',
    title: '지원사업 검색',
    description: '주거, 금융, 의료, 교육 등 8대 분야 지원사업을 한눈에 찾아보세요.',
  },
  {
    id: 'checklist',
    icon: '✅',
    title: '자립 체크리스트',
    description: '보호 종료 후 단계별로 챙겨야 할 항목을 체크리스트로 확인하세요.',
  },
  {
    id: 'guide',
    icon: '📖',
    title: '생활 가이드',
    description: '주거, 금융, 세금, 행정, 의료 분야 생활 밀착형 가이드를 제공합니다.',
  },
  {
    id: 'calendar',
    icon: '📅',
    title: '신청 캘린더',
    description: '지원사업 마감일을 달력으로 한눈에 확인하고 놓치지 마세요.',
  },
]

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-surface)',
          padding: 'var(--space-16) var(--space-6)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width-narrow)',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-6)',
          }}
        >
          <h1
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              lineHeight: 'var(--line-height-tight)',
              margin: 0,
            }}
          >
            자립준비청년의 온전한 홀로서기를 위한 첫걸음
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-md)',
              opacity: 0.9,
              lineHeight: 'var(--line-height-base)',
              margin: 0,
            }}
          >
            보호종료 후 혼자서 마주하는 세상, ONESTEP이 함께합니다.
          </p>
          <Link
            to="/support"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-primary)',
              fontWeight: 'var(--font-weight-bold)',
              fontSize: 'var(--font-size-md)',
              padding: 'var(--space-3) var(--space-8)',
              borderRadius: 'var(--border-radius-md)',
              textDecoration: 'none',
              boxShadow: 'var(--shadow-md)',
              transition: 'box-shadow 0.2s',
            }}
          >
            지원사업 찾기
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-6)',
        }}
      >
        <h2
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: 'var(--space-10)',
          }}
        >
          핵심 기능
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {FEATURE_CARDS.map((card) => (
            <article
              key={card.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-lg)',
                padding: 'var(--space-8)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{card.icon}</span>
              <h3
                style={{
                  fontSize: 'var(--font-size-md)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--line-height-base)',
                  margin: 0,
                }}
              >
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
