import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { seed, type Procedure } from '../data/procedures'
export function useProcedures() {
  const [list, setList] = useState<Procedure[]>(db ? [] : seed)
  const [loading, setLoading] = useState(Boolean(db))
  useEffect(() => {
    if (!db) return
    getDocs(collection(db, 'procedures')).then(s => {
      const rows = s.docs.map(d => ({ ...d.data(), id: d.id }) as Procedure)
      setList(rows.length ? rows.filter(r => r.ativo !== false).sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)) : seed)
    }).catch(() => setList(seed)).finally(() => setLoading(false))
  }, [])
  return { list, loading }
}
