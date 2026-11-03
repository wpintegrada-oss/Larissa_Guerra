import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
export type Req = { tipo: 'agendar' | 'orcamento' | 'contato'; item?: string; nome: string; fone: string; endereco?: string; data?: string; obs?: string }
export async function saveRequest(r: Req) {
  if (!db) return false
  try {
    const clean = Object.fromEntries(Object.entries(r).filter(([, v]) => v))
    await addDoc(collection(db, 'requests'), { ...clean, status: 'novo', createdAt: serverTimestamp() })
    return true
  } catch { return false }
}
