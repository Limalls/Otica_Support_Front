import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX, X } from 'lucide-react'
import ProdutoCard from '../components/ProdutoCard'
import { categorias, produtos } from '../mocks/produtos'
import { botaoSecundario } from '../lib/formatos'

const semAcento = (texto) =>
  texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

export default function Catalogo() {
  const [params, setParams] = useSearchParams()
  const busca = params.get('busca') ?? ''
  const categoria = params.get('categoria') ?? 'Todos'
  const ordem = params.get('ordem') ?? 'padrao'

  // Guarda os filtros na URL, para a busca do navbar e o botão "voltar" funcionarem
  const atualizar = (chave, valor, padrao) => {
    const novos = new URLSearchParams(params)
    if (!valor || valor === padrao) novos.delete(chave)
    else novos.set(chave, valor)
    setParams(novos)
  }

  const lista = useMemo(() => {
    const termo = semAcento(busca.trim())
    const filtrados = produtos.filter((produto) => {
      if (!produto.ativo) return false
      if (categoria !== 'Todos' && produto.categoria !== categoria) return false
      if (!termo) return true
      return semAcento(`${produto.nome} ${produto.categoria} ${produto.descricao}`).includes(termo)
    })
    if (ordem === 'menor') return [...filtrados].sort((a, b) => a.preco - b.preco)
    if (ordem === 'maior') return [...filtrados].sort((a, b) => b.preco - a.preco)
    return filtrados
  }, [busca, categoria, ordem])

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-carbon-black-900">Catálogo</h1>
          <p className="mt-1 text-sm text-carbon-black-600" aria-live="polite">
            {lista.length === 1 ? '1 óculos encontrado' : `${lista.length} óculos encontrados`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="ordem" className="text-sm text-carbon-black-700">
            Ordenar por
          </label>
          <select
            id="ordem"
            value={ordem}
            onChange={(evento) => atualizar('ordem', evento.target.value, 'padrao')}
            className="rounded-lg border border-carbon-black-300 bg-white px-3 py-2 text-sm text-carbon-black-900 outline-none focus:border-golden-pollen-600 focus:ring-2 focus:ring-golden-pollen-500/40"
          >
            <option value="padrao">Destaques</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {['Todos', ...categorias].map((nome) => {
          const ativa = nome === categoria
          return (
            <button
              key={nome}
              type="button"
              aria-pressed={ativa}
              onClick={() => atualizar('categoria', nome, 'Todos')}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-pollen-600 ${
                ativa
                  ? 'border-carbon-black-950 bg-carbon-black-950 text-white'
                  : 'border-carbon-black-300 bg-white text-carbon-black-800 hover:border-carbon-black-500'
              }`}
            >
              {nome}
            </button>
          )
        })}

        {busca && (
          <button
            type="button"
            onClick={() => atualizar('busca', '')}
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-golden-pollen-100 px-3 py-1.5 text-sm font-medium text-golden-pollen-900 hover:bg-golden-pollen-200"
          >
            Busca: {busca}
            <X aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="sr-only">Remover busca</span>
          </button>
        )}
      </div>

      {lista.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {lista.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-carbon-black-300 bg-white px-6 py-16 text-center">
          <SearchX aria-hidden="true" className="h-10 w-10 text-carbon-black-400" />
          <h2 className="text-lg font-semibold text-carbon-black-900">Nenhum óculos encontrado</h2>
          <p className="max-w-sm text-sm text-carbon-black-600">
            Tente buscar por outro nome ou escolha outra categoria.
          </p>
          <button type="button" onClick={() => setParams({})} className={botaoSecundario}>
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
