import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import Procedimentos from './pages/Procedimentos'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Admin from './pages/Admin'
export default function App() {
  return (<Routes><Route path="admin" element={<Admin />} />
    <Route element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="sobre" element={<Sobre />} />
    <Route path="procedimentos" element={<Procedimentos />} />
    <Route path="contato" element={<Contato />} />
    <Route path="minha-conta" element={<Placeholder title="Minha conta" />} />
    <Route path="privacidade" element={<Placeholder title="Política de privacidade" />} />
  </Route></Routes>)
}
