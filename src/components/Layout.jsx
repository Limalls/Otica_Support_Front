import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

// Estrutura comum a todas as páginas: navbar no topo e o conteúdo da rota abaixo.
// O rodapé entra aqui depois.
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-carbon-black-50 text-carbon-black-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}