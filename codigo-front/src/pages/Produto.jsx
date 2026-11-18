import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import OculosImagem from '../components/OculosImagem'
import { produtos } from '../mocks/produtos'
import { useCartStore } from '../store/useCartStore'
import { botaoPrimario, botaoSecundario, moeda } from '../lib/formatos'

export default function Produto() {
  const { id } = useParams()
  const produto = produtos.find((item) => String(item.id) === id)
  const adicionar = useCartStore((state) => state.addItem)
  const [quantidade, setQuantidade] = useState(1)
  const [adicionado, setAdicionado] = useState(false)

  if (!produto) {
    return (
      <div className="flex flex-col items-start gap-3">
        <h1 className="text-2xl font-bold text-carbon-black-900">Produto não encontrado</h1>
        <p className="text-carbon-black-700">Esse óculos não existe ou saiu do catálogo.</p>
        <Link to="/catalogo" className={botaoSecundario}>
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  const esgotado = produto.estoque === 0
  const mudar = (valor) => setQuantidade(Math.min(Math.max(1, valor), produto.estoque))

  const comprar = () => {
    adicionar(produto, quantidade)
    setAdicionado(true)
  }

  return (
    <div>
      <Link
        to="/catalogo"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-carbon-black-700 hover:text-carbon-black-950"
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex items-center justify-center rounded-3xl bg-pale-slate-100 p-8 md:p-12">
          <OculosImagem
            forma={produto.forma}
            armacao={produto.armacao}
            lente={produto.corLente}
            titulo={`Ilustração do modelo ${produto.nome}`}
            className="w-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-carbon-black-600">{produto.categoria}</span>
          <h1 className="mt-1 text-3xl font-bold text-carbon-black-950">{produto.nome}</h1>
          <p className="mt-4 text-3xl font-bold text-carbon-black-950">{moeda(produto.preco)}</p>
          <p className="mt-1 text-sm text-carbon-black-600">
            {esgotado
              ? 'Esgotado no momento'
              : produto.estoque <= 5
                ? `Restam apenas ${produto.estoque} unidades`
                : 'Em estoque'}
          </p>

          <p className="mt-6 max-w-prose leading-relaxed text-carbon-black-800">{produto.descricao}</p>

          <dl className="mt-6 grid max-w-sm grid-cols-2 gap-x-6 gap-y-3 border-y border-carbon-black-200 py-5 text-sm">
            <dt className="text-carbon-black-600">Material</dt>
            <dd className="font-medium text-carbon-black-900">{produto.material}</dd>
            <dt className="text-carbon-black-600">Lentes</dt>
            <dd className="font-medium text-carbon-black-900">{produto.lente}</dd>
            <dt className="text-carbon-black-600">Formato</dt>
            <dd className="font-medium text-carbon-black-900">{produto.categoria}</dd>
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div
              role="group"
              aria-label="Quantidade"
              className="inline-flex items-center rounded-full border border-carbon-black-300 bg-white"
            >
              <button
                type="button"
                onClick={() => mudar(quantidade - 1)}
                disabled={esgotado || quantidade <= 1}
                aria-label="Diminuir quantidade"
                className="rounded-full p-3 text-carbon-black-800 hover:bg-carbon-black-100 disabled:text-carbon-black-300"
              >
                <Minus aria-hidden="true" className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                {esgotado ? 0 : quantidade}
              </span>
              <button
                type="button"
                onClick={() => mudar(quantidade + 1)}
                disabled={esgotado || quantidade >= produto.estoque}
                aria-label="Aumentar quantidade"
                className="rounded-full p-3 text-carbon-black-800 hover:bg-carbon-black-100 disabled:text-carbon-black-300"
              >
                <Plus aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <button type="button" onClick={comprar} disabled={esgotado} className={botaoPrimario}>
              <ShoppingCart aria-hidden="true" className="h-4 w-4" />
              {esgotado ? 'Esgotado' : 'Adicionar ao carrinho'}
            </button>
          </div>

          {adicionado && (
            <p
              role="status"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-carbon-black-800"
            >
              <Check aria-hidden="true" className="h-4 w-4 text-golden-pollen-700" />
              Adicionado ao carrinho.{' '}
              <Link to="/carrinho" className="underline underline-offset-4">
                Ver carrinho
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
