import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CalendarDays, Glasses, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import BarraBusca from './Barrabusca'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/catalogo', label: 'Catálogo' },
]

// Sublinhado que cresce da esquerda para a direita no hover e na página atual
const linkClass = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-golden-pollen-500 after:transition-transform after:duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-golden-pollen-400 ${
    isActive
      ? 'text-white after:scale-x-100'
      : 'text-pale-slate-200 after:scale-x-0 hover:text-white hover:after:scale-x-100'
  }`

const botaoIconeClass =
  'rounded-full p-2 text-pale-slate-200 transition-colors hover:bg-carbon-black-800 hover:text-white focus-visible:outline-2 focus-visible:outline-golden-pollen-400 sm:p-2.5'

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const [buscaAberta, setBuscaAberta] = useState(false)
  const [rolou, setRolou] = useState(false)
  const quantidade = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantidade, 0),
  )

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8)
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const fechar = () => setAberto(false)

  const abrirBusca = () => {
    setAberto(false)
    setBuscaAberta(true)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-carbon-black-800 bg-carbon-black-950 transition-shadow duration-300 ${
        rolou ? 'shadow-lg shadow-black/40' : ''
      }`}
    >
      {/* Sem largura máxima: a logo fica na ponta esquerda e o carrinho na direita */}
      <div className="relative flex w-full items-center gap-3 px-3 py-3 sm:gap-4 sm:px-6 lg:gap-8 lg:px-8">
        {/* Logo. Quando tiver a imagem, troque o selo e o texto por
            <img src={logo} alt="Ótica Support" className="h-9" /> */}
        <Link
          to="/"
          onClick={fechar}
          className="group/logo flex shrink-0 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-golden-pollen-400 sm:gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-golden-pollen-500 text-carbon-black-950 transition-transform duration-300 group-hover/logo:-rotate-6 group-hover/logo:scale-105">
            <Glasses aria-hidden="true" className="h-5 w-5" />
          </span>
          <span className="text-base font-bold leading-none text-white sm:text-lg">
            Ótica <span className="text-golden-pollen-500">Support</span>
          </span>
        </Link>

        {/* Links (telas grandes) */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">
          {links.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Busca no centro (tablet e computador) */}
        <div className="hidden flex-1 justify-center md:flex">
          <BarraBusca atalho />
        </div>

        {/* Lado direito */}
        <div className="ml-auto flex items-center gap-0.5 sm:gap-2 md:ml-0">
          {/* Lupa (só no celular): ao tocar, a busca se abre sobre a barra */}
          <button
            type="button"
            onClick={abrirBusca}
            aria-label="Abrir busca"
            aria-expanded={buscaAberta}
            className={`${botaoIconeClass} md:hidden`}
          >
            <Search aria-hidden="true" className="h-6 w-6" />
          </button>

          <Link
            to="/agendamento"
            className="hidden items-center gap-2 rounded-full bg-golden-pollen-500 px-4 py-2 text-sm font-semibold text-carbon-black-950 transition-colors hover:bg-golden-pollen-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-pollen-300 lg:flex"
          >
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            Agendar consulta
          </Link>

          <CarrinhoLink quantidade={quantidade} onClick={fechar} />

          <button
            type="button"
            onClick={() => setAberto((valor) => !valor)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            className={`${botaoIconeClass} lg:hidden`}
          >
            {aberto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {/* Busca aberta no celular: cobre a barra inteira, revelada a partir da lupa */}
        {buscaAberta && (
          <div className="absolute inset-0 z-10 flex items-center gap-2 bg-carbon-black-950 px-3 sm:px-6 md:hidden motion-safe:animate-abre">
            <BarraBusca autoFoco aoFechar={() => setBuscaAberta(false)} className="max-w-none" />
            <button
              type="button"
              onClick={() => setBuscaAberta(false)}
              aria-label="Fechar busca"
              className={botaoIconeClass}
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>

      {/* Menu aberto (celular e tablet) */}
      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Menu"
          className="border-t border-carbon-black-800 px-4 pb-4 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col gap-1 pt-3">
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={fechar}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-base font-medium ${
                      isActive
                        ? 'bg-carbon-black-800 text-golden-pollen-400'
                        : 'text-pale-slate-200 hover:bg-carbon-black-900 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/agendamento"
                onClick={fechar}
                className="flex items-center justify-center gap-2 rounded-full bg-golden-pollen-500 px-4 py-3 font-semibold text-carbon-black-950 hover:bg-golden-pollen-400"
              >
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                Agendar consulta
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

function CarrinhoLink({ quantidade, onClick }) {
  const descricao =
    quantidade === 0
      ? 'Carrinho vazio'
      : `Carrinho com ${quantidade} ${quantidade === 1 ? 'item' : 'itens'}`

  return (
    <Link to="/carrinho" onClick={onClick} aria-label={descricao} className={`relative ${botaoIconeClass}`}>
      <ShoppingCart aria-hidden="true" className="h-6 w-6" />
      {quantidade > 0 && (
        // A "key" faz o contador dar um pulinho toda vez que o número muda
        <span
          key={quantidade}
          aria-hidden="true"
          className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-carbon-black-950 motion-safe:animate-pop"
        >
          {quantidade}
        </span>
      )}
    </Link>
  )
}