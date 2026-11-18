import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import Produto from './pages/Produto'
import Carrinho from './pages/Carrinho'
import Agendamento from './pages/Agendamento'
import Login from './pages/Login'
import ProdutoNovo from './pages/ProdutoNovo'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="produto/:id" element={<Produto />} />
        <Route path="carrinho" element={<Carrinho />} />
        <Route path="agendamento" element={<Agendamento />} />
        <Route path="login" element={<Login />} />
        <Route path="admin/produtos/novo" element={<ProdutoNovo />} />
      </Route>
    </Routes>
  )
}
