import { useState } from 'react'
import { SupportCard } from '../components/ui/SupportCard'
import { useSupports } from '../hooks/useSupports'

const FIELDS = ['전체', '주거', '금융', '의료', '교육', '취업', '심리정서', '법률', '기타']
const REGIONS = ['전국', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산']
const AGES = ['전체', '18~24세', '25~29세', '30~34세']

export function SupportListPage() {
  const [selectedField, setSelectedField] = useState('전체')
  const [selectedRegion, setSelectedRegion] = useState('전국')
  const [selectedAge, setSelectedAge] = useState('전체')

  const { data, total, loading, error } = useSupports({
    category: selectedField,
    region: selectedRegion,
  })

  const filterTagStyle = (active: boolean): React.CSSProperties => ({
    padding: 'var(--space-2) var(--space-4)',
    borderRadius: 'var(--border-radius-md)',
    border: `1px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-surface)',
    color: active ? 'var(--color-surface)' : 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: active ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  })

  return (
    <div
      style={{
        maxWidth: 'var(--max-width-content)',
        margin: '0 auto',
        padding: '0 var(--space-6) var(--space-12)',
      }}
    >
      <h1
        style={{
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-8)',
        }}
      >
        지원사업 검색
      </h1>

      {/* Filter Panel */}
      <section
        aria-label="필터"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--space-6)',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              margin: '0 0 var(--space-3) 0',
            }}
          >
            분야
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {FIELDS.map((field) => (
              <button
                key={field}
                type="button"
                style={filterTagStyle(selectedField === field)}
                onClick={() => setSelectedField(field)}
              >
                {field}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              margin: '0 0 var(--space-3) 0',
            }}
          >
            지역
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {REGIONS.map((region) => (
              <button
                key={region}
                type="button"
                style={filterTagStyle(selectedRegion === region)}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              margin: '0 0 var(--space-3) 0',
            }}
          >
            나이
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {AGES.map((age) => (
              <button
                key={age}
                type="button"
                style={filterTagStyle(selectedAge === age)}
                onClick={() => setSelectedAge(age)}
              >
                {age}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Result Info */}
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-5)',
        }}
      >
        총 <strong style={{ color: 'var(--color-text-primary)' }}>{total}건</strong>의 지원사업이 있습니다.
        {selectedField !== '전체' && ` (분야: ${selectedField})`}
        {selectedRegion !== '전국' && ` (지역: ${selectedRegion})`}
        {selectedAge !== '전체' && ` (나이: ${selectedAge})`}
      </p>

      {/* Support Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {loading && (
          Array.from({ length: 4 }).map((_, i) => (
            <article
              key={i}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-md)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-sm)',
                minHeight: 180,
              }}
            >
              <div style={{ background: 'var(--color-border)', borderRadius: 4, height: 20, width: '40%', marginBottom: 'var(--space-3)' }} />
              <div style={{ background: 'var(--color-border)', borderRadius: 4, height: 24, marginBottom: 'var(--space-3)' }} />
              <div style={{ background: 'var(--color-border)', borderRadius: 4, height: 16, width: '80%' }} />
            </article>
          ))
        )}

        {!loading && error !== null && (
          <p style={{ color: 'var(--color-error)', textAlign: 'center', padding: 'var(--space-12) 0' }}>
            데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        {!loading && error === null && data.map((item) => (
          <SupportCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
