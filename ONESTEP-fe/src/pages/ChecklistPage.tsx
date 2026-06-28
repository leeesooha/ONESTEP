import { useState } from 'react'
import { ChecklistItem } from '../components/ui/ChecklistItem'
import { ProgressBar } from '../components/ui/ProgressBar'

const TABS = ['보호종료 직후', '안착기', '성장기'] as const
type Tab = (typeof TABS)[number]

const ITEMS: Record<Tab, string[]> = {
  '보호종료 직후': [
    '주민등록 주소 이전하기',
    '자립수당 신청하기',
    '건강보험 지역가입자 전환 확인',
    '통장 개설 및 관리 시작',
  ],
  '안착기': [
    '월세 납부 자동이체 설정',
    '긴급복지지원 신청 검토',
    '직업훈련 프로그램 알아보기',
    '정신건강 상담 서비스 이용',
    '지역사회 네트워크 형성',
  ],
  '성장기': [
    '자산형성지원(디딤씨앗) 점검',
    '대학 진학 또는 취업 준비',
    '개인 저축 목표 설정',
    '장기 주거 계획 수립',
  ],
}

const INITIAL_STATE: Record<Tab, boolean[]> = {
  '보호종료 직후': [false, false, false, false],
  '안착기': [false, false, false, false, false],
  '성장기': [false, false, false, false],
}

export function ChecklistPage() {
  const [activeTab, setActiveTab] = useState<Tab>('보호종료 직후')
  const [checkedState, setCheckedState] = useState<Record<Tab, boolean[]>>(INITIAL_STATE)

  const toggle = (tab: Tab, index: number) => {
    setCheckedState((prev) => ({
      ...prev,
      [tab]: prev[tab].map((v, i) => (i === index ? !v : v)),
    }))
  }

  const currentItems = ITEMS[activeTab]
  const currentChecked = checkedState[activeTab]
  const doneCount = currentChecked.filter(Boolean).length
  const progress = currentItems.length > 0 ? Math.round((doneCount / currentItems.length) * 100) : 0

  return (
    <div
      style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 var(--space-6) var(--space-12)',
      }}
    >
      <h1
        style={{
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        자립 체크리스트
      </h1>
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-8)',
        }}
      >
        단계별로 챙겨야 할 항목을 확인하고 하나씩 완료해 보세요.
      </p>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="자립 단계"
        style={{
          display: 'flex',
          borderBottom: '2px solid var(--color-border)',
          marginBottom: 'var(--space-6)',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: activeTab === tab ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)',
              color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <ProgressBar
          value={progress}
          label={`${doneCount} / ${currentItems.length} 완료 (${progress}%)`}
        />
      </div>

      {/* Checklist Items */}
      <div
        role="tabpanel"
        aria-label={activeTab}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
      >
        {currentItems.map((label, index) => (
          <ChecklistItem
            key={label}
            label={label}
            checked={currentChecked[index]}
            onChange={() => toggle(activeTab, index)}
          />
        ))}
      </div>
    </div>
  )
}
