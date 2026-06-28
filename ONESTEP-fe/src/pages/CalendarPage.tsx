import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type CalendarValue = Date | null | [Date | null, Date | null]

const DUMMY_DEADLINES: { date: Date; label: string }[] = [
  { date: new Date(2026, 5, 30), label: '자립수당 신청 마감' },
  { date: new Date(2026, 6, 15), label: '청년 매입임대 신청 마감' },
  { date: new Date(2026, 6, 31), label: '드림스타트 직업훈련 마감' },
]

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getDeadlinesForDate(date: Date) {
  return DUMMY_DEADLINES.filter((d) => isSameDay(d.date, date))
}

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      setSelectedDate(value)
    }
  }

  const selectedDeadlines = getDeadlinesForDate(selectedDate)

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
        신청 캘린더
      </h1>
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-8)',
        }}
      >
        지원사업 마감일을 달력에서 확인하세요.
      </p>

      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <style>{`
          .react-calendar {
            width: 100%;
            border: none;
            font-family: var(--font-family-base);
            font-size: var(--font-size-sm);
          }
          .react-calendar__tile--active {
            background: var(--color-primary) !important;
            color: white !important;
            border-radius: var(--border-radius-sm);
          }
          .react-calendar__tile--now {
            background: var(--color-primary-light) !important;
            color: var(--color-primary) !important;
            border-radius: var(--border-radius-sm);
          }
          .react-calendar__tile:hover {
            background: var(--color-bg) !important;
            border-radius: var(--border-radius-sm);
          }
          .react-calendar__navigation button:hover {
            background: var(--color-bg) !important;
            border-radius: var(--border-radius-sm);
          }
          .react-calendar__month-view__days__day--weekend {
            color: var(--color-error);
          }
        `}</style>

        <Calendar
          onChange={handleChange}
          value={selectedDate}
          locale="ko-KR"
          tileContent={({ date, view }) => {
            if (view !== 'month') return null
            const deadlines = getDeadlinesForDate(date)
            if (deadlines.length === 0) return null
            return (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-error)',
                    display: 'inline-block',
                  }}
                  aria-label={`마감일 ${deadlines.length}건`}
                />
              </div>
            )
          }}
        />
      </div>

      {/* Selected date deadlines */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--border-radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h2
          style={{
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {selectedDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          마감 일정
        </h2>

        {selectedDeadlines.length > 0 ? (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {selectedDeadlines.map((d) => (
              <li
                key={d.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)',
                  backgroundColor: '#FEF2F2',
                  borderRadius: 'var(--border-radius-md)',
                  border: '1px solid #FECACA',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-error)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  {d.label}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}
          >
            선택한 날짜에 마감 일정이 없습니다.
          </p>
        )}

        <div style={{ marginTop: 'var(--space-6)' }}>
          <h3
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            전체 마감 일정
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {DUMMY_DEADLINES.map((d) => (
              <li
                key={d.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span>{d.label}</span>
                <span style={{ color: 'var(--color-error)', fontWeight: 'var(--font-weight-medium)' }}>
                  {d.date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
