import { useState } from 'react'
import { GuideCard } from '../components/ui/GuideCard'

const CATEGORIES = ['주거', '금융', '세금', '행정', '의료'] as const
type Category = (typeof CATEGORIES)[number]

interface GuideItem {
  id: string
  title: string
  description: string
  tags: string[]
}

const GUIDES: Record<Category, GuideItem[]> = {
  주거: [
    {
      id: 'housing-1',
      title: '공공임대주택 신청 방법',
      description: '자립준비청년을 위한 LH 매입임대주택, 전세임대주택 신청 절차와 자격 조건을 안내합니다. 시세 30% 수준의 저렴한 주거 지원을 받을 수 있습니다.',
      tags: ['LH', '임대주택', '주거지원'],
    },
    {
      id: 'housing-2',
      title: '전·월세 계약 시 주의사항',
      description: '처음 계약하는 분들을 위한 전세·월세 계약서 체크리스트와 사기 예방 방법을 알려드립니다. 확정일자, 전입신고, 임대차 보호법 핵심 내용을 확인하세요.',
      tags: ['전세', '월세', '계약서'],
    },
    {
      id: 'housing-3',
      title: '주거급여 신청 안내',
      description: '저소득 1인 가구를 위한 주거급여 신청 방법과 지원 금액을 안내합니다. 지역별 기준 임대료를 확인하고 혜택을 최대한 활용하세요.',
      tags: ['주거급여', '복지'],
    },
  ],
  금융: [
    {
      id: 'finance-1',
      title: '청년 전용 통장·적금 상품 비교',
      description: '청년 우대형 청약통장, 청년도약계좌, 청년희망적금 등 정부 지원 금융 상품을 비교·정리했습니다.',
      tags: ['적금', '청약', '재테크'],
    },
    {
      id: 'finance-2',
      title: '디딤씨앗통장(아동발달지원계좌) 활용법',
      description: '보호아동을 위해 적립된 디딤씨앗 자금을 활용하는 방법과 인출 조건, 사용 용도 제한 등을 안내합니다.',
      tags: ['디딤씨앗', '저축'],
    },
  ],
  세금: [
    {
      id: 'tax-1',
      title: '연말정산 처음 하는 분 가이드',
      description: '근로소득이 있다면 매년 해야 하는 연말정산을 처음 접하는 청년을 위해 절차와 공제 항목을 쉽게 설명합니다.',
      tags: ['연말정산', '소득공제'],
    },
    {
      id: 'tax-2',
      title: '종합소득세 신고 방법',
      description: '프리랜서, 아르바이트 병행 등 다양한 소득이 있을 때 매년 5월 종합소득세 신고 방법을 안내합니다.',
      tags: ['종소세', '세금신고'],
    },
    {
      id: 'tax-3',
      title: '부가가치세 기초 지식',
      description: '자영업이나 소규모 창업 시 알아야 할 부가가치세 기본 개념과 신고·납부 일정을 소개합니다.',
      tags: ['부가세', '창업'],
    },
  ],
  행정: [
    {
      id: 'admin-1',
      title: '주민등록 전입신고 방법',
      description: '새 주소지로 이사 후 14일 이내에 해야 하는 전입신고 절차를 온라인·방문 두 가지 방법으로 안내합니다.',
      tags: ['전입신고', '주민센터'],
    },
    {
      id: 'admin-2',
      title: '건강보험 지역가입자 전환 절차',
      description: '보호 종료 후 직장 건강보험 자격 상실 시 지역가입자로 전환하는 방법과 보험료 감면 혜택을 알아봅니다.',
      tags: ['건강보험', '보험료'],
    },
  ],
  의료: [
    {
      id: 'medical-1',
      title: '보호종료아동 의료비 지원 제도',
      description: '만 24세 이하 보호종료아동을 위한 의료비 지원 제도를 소개합니다. 입원·통원 의료비 본인부담금 전액을 지원받을 수 있습니다.',
      tags: ['의료비지원', '건강'],
    },
    {
      id: 'medical-2',
      title: '정신건강 상담 서비스 이용 방법',
      description: '자립 과정에서 심리·정서적 어려움을 겪을 때 무료로 이용할 수 있는 정신건강 상담 기관과 서비스를 소개합니다.',
      tags: ['심리상담', '정신건강'],
    },
  ],
}

export function GuidePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('주거')

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
          marginBottom: 'var(--space-4)',
        }}
      >
        생활 가이드
      </h1>
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-8)',
        }}
      >
        자립 생활에 필요한 분야별 실용 정보를 모았습니다.
      </p>

      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="가이드 카테고리"
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          flexWrap: 'wrap',
          marginBottom: 'var(--space-8)',
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: 'var(--space-2) var(--space-5)',
              borderRadius: 'var(--border-radius-md)',
              border: `1px solid ${activeCategory === cat ? 'var(--color-secondary)' : 'var(--color-border)'}`,
              backgroundColor: activeCategory === cat ? 'var(--color-secondary)' : 'var(--color-surface)',
              color: activeCategory === cat ? 'var(--color-surface)' : 'var(--color-text-secondary)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: activeCategory === cat ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guide Cards */}
      <div
        role="tabpanel"
        aria-label={`${activeCategory} 가이드`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-6)',
        }}
      >
        {GUIDES[activeCategory].map((guide) => (
          <GuideCard
            key={guide.id}
            title={guide.title}
            description={guide.description}
            tags={guide.tags}
          />
        ))}
      </div>
    </div>
  )
}
