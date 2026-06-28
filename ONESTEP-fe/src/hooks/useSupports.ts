import { useEffect, useState } from 'react'

interface SupportItem {
  id: string
  title: string
  category: string
  region: string
  deadline: string
  description: string
}

interface SupportFilters {
  category?: string
  region?: string
}

interface UseSupportsResult {
  data: SupportItem[]
  total: number
  loading: boolean
  error: string | null
}

export function useSupports(filters: SupportFilters): UseSupportsResult {
  const [data, setData] = useState<SupportItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.category && filters.category !== '전체') {
      params.set('category', filters.category)
    }
    if (filters.region && filters.region !== '전국') {
      params.set('region', filters.region)
    }

    const query = params.toString()
    const url = query ? `/api/supports?${query}` : '/api/supports'

    setLoading(true)
    setError(null)

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        return res.json()
      })
      .then((json: { data: Array<{ id: number; title: string; category: string; region: string; deadline: string; description: string }>; total: number }) => {
        const mapped: SupportItem[] = json.data.map((item) => ({
          id: String(item.id),
          title: item.title,
          category: item.category,
          region: item.region,
          deadline: item.deadline.replace(/-/g, '.'),
          description: item.description,
        }))
        setData(mapped)
        setTotal(json.total)
      })
      .catch(() => {
        setError('데이터를 불러오지 못했습니다.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [filters.category, filters.region])

  return { data, total, loading, error }
}
