import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Páginas provisórias: cada uma será substituída pela tela real em src/pages/.
function Pagina({ titulo }) {
  return <h1 className="text-2xl font-bold">{titulo}</h1>
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Pagina titulo="Ótica Support" />} />
        <Route path="catalogo" element={<Pagina titulo="Catálogo" />} />
        <Route path="agendamento" element={<Pagina titulo="Agendar consulta" />} />
        <Route path="carrinho" element={<Pagina titulo="Carrinho" />} />
      </Route>
    </Routes>
  )
}