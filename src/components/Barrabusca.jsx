import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'

const sugestoes = [
  'Buscar óculos de sol',
  'aviador',
  'polarizado',
  'lente espelhada',
  'armação redonda',
]

export default function BarraBusca({
  atalho = false,
  autoFoco = false,
  aoFechar,
  className = 'max-w-sm focus-within:max-w-xl',
}) {
  const [valor, setValor] = useState('')
  const [indice, setIndice] = useState(0)
  const [focado, setFocado] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Troca a sugestão a cada 3 segundos, exceto para quem pediu menos movimento
  useEffect(() => {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzir) return
    const id = setInterval(() => setIndice((i) => (i + 1) % sugestoes.length), 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (autoFoco) inputRef.current?.focus()
  }, [autoFoco])

  // Atalho: apertar "/" em qualquer lugar da página foca a busca
  useEffect(() => {
    if (!atalho) return
    const aoDigitar = (evento) => {
      const alvo = evento.target
      const emCampo =
        alvo instanceof HTMLElement &&
        (alvo.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(alvo.tagName))
      // Se a busca está escondida (celular), não faz nada
      const visivel = inputRef.current && inputRef.current.offsetParent !== null
      if (evento.key === '/' && !emCampo && visivel && !evento.metaKey && !evento.ctrlKey) {
        evento.preventDefault()
        inputRef.current.focus()
      }
    }
    document.addEventListener('keydown', aoDigitar)
    return () => document.removeEventListener('keydown', aoDigitar)
  }, [atalho])

  const buscar = (evento) => {
    evento.preventDefault()
    const termo = valor.trim()
    if (!termo) {
      inputRef.current?.focus()
      return
    }
    navigate(`/catalogo?busca=${encodeURIComponent(termo)}`)
    inputRef.current?.blur()
    aoFechar?.()
  }

  const limpar = () => {
    setValor('')
    inputRef.current?.focus()
  }

  const aoApertarTecla = (evento) => {
    if (evento.key === 'Escape') {
      setValor('')
      inputRef.current?.blur()
      aoFechar?.()
    }
  }

  return (
    <form
      role="search"
      onSubmit={buscar}
      className={`group relative w-full transition-[max-width] duration-500 ease-out ${className}`}
    >
      {/* Borda dourada que corre quando a busca está em foco */}
      <span
        aria-hidden="true"
        className="busca-borda pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-focus-within:shadow-[0_0_22px_rgba(255,179,0,0.3)] motion-safe:animate-borda"
      />

      <div className="relative flex items-center rounded-full bg-carbon-black-900 ring-1 ring-carbon-black-700 transition-shadow group-focus-within:ring-0">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 h-4 w-4 text-pale-slate-400 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-golden-pollen-400"
        />

        <input
          ref={inputRef}
          type="text"
          value={valor}
          onChange={(evento) => setValor(evento.target.value)}
          onFocus={() => setFocado(true)}
          onBlur={() => setFocado(false)}
          onKeyDown={aoApertarTecla}
          aria-label="Buscar óculos"
          autoComplete="off"
          className="w-full rounded-full bg-transparent py-2.5 pl-11 pr-14 text-sm text-white outline-none"
        />

        {/* Sugestão que troca sozinha enquanto o campo está vazio */}
        {valor === '' && (
          <span
            key={indice}
            aria-hidden="true"
            className="pointer-events-none absolute left-11 right-14 truncate text-sm text-pale-slate-400 motion-safe:animate-sobe"
          >
            {sugestoes[indice]}
          </span>
        )}

        {valor !== '' ? (
          <button
            type="button"
            onClick={limpar}
            aria-label="Limpar busca"
            className="absolute right-3 rounded-full p-1 text-pale-slate-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-golden-pollen-400"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : (
          !focado && (
            <kbd
              aria-hidden="true"
              className="pointer-events-none absolute right-4 hidden rounded border border-carbon-black-700 px-1.5 text-xs text-pale-slate-400 md:inline"
            >
              /
            </kbd>
          )
        )}
      </div>
    </form>
  )
}