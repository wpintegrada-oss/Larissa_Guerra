import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'
import { site } from './config'
export default function SiteProvider({ children }: { children: ReactNode }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!db) return
    getDoc(doc(db, 'settings', 'site')).then(s => {
      const d = s.data(); if (!d) return
      for (const k of ['whatsapp', 'email', 'hours', 'regions'] as const) if (typeof d[k] === 'string' && d[k]) site[k] = d[k]
      setV(1)
    }).catch(() => {})
  }, [])
  return <Fragment key={v}>{children}</Fragment>
}
