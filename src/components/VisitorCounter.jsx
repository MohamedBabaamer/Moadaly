import { useEffect, useState } from 'react'

export default function VisitorCounter({ namespace = 'mohamedbabaamer-moadaly', keyName = 'visits' }) {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const url = `https://api.countapi.xyz/hit/${namespace}/${keyName}`

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        if (data && typeof data.value === 'number') {
          setCount(data.value)
        } else {
          setError('no-data')
        }
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message || 'error')
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => { mounted = false }
  }, [namespace, keyName])

  return (
    <div className="visitor-counter" title="Number of visits">
      {loading ? (
        <span className="visitor-count">...</span>
      ) : error ? (
        <span className="visitor-count">—</span>
      ) : (
        <span className="visitor-count">{count.toLocaleString()}</span>
      )}
      <style jsx>{`
        .visitor-counter{ display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--muted); }
        .visitor-count{ background:rgba(0,0,0,0.06); padding:4px 8px; border-radius:999px; font-weight:600; }
      `}</style>
    </div>
  )
}
