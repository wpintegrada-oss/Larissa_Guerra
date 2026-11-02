import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import Procedimentos from './pages/Procedimentos'
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="sobre" element={<Placeholder title="Sobre" />} />
    <Route path="procedimentos" element={<Procedimentos />} />
    <Route path="minha-conta" element={<Placeholder title="Minha conta" />} />
    <Route path="privacidade" element={<Placeholder title="Política de privacidade" />} />
    <Route path="termos" element={<Placeholder title="Termos de uso" />} />
  </Route></Routes>)
}
