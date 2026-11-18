import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2 } from 'lucide-react'
import OculosImagem from '../components/OculosImagem'
import { useCartStore } from '../store/useCartStore'
import { botaoPrimario, botaoSecundario, moeda } from '../lib/formatos'

export default function Carrinho() {
  const items = useCartStore((state) => state.items)
  const remover = useCartStore((state) => state.removeItem)
  // O total aqui serve só para exibir. O total oficial do pedido vem da API.
  const total = items.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-carbon-black-300 bg-white px-6 py-16 text-center">
        <ShoppingBag aria-hidden="true" className="h-10 w-10 text-carbon-black-400" />
        <h1 className="text-xl font-bold text-carbon-black-900">Seu carrinho está vazio</h1>
        <p className="max-w-sm text-sm text-carbon-black-600">
          Escolha um óculos no catálogo para começar.
        </p>
        <Link to="/catalogo" className={botaoPrimario}>
          Ver catálogo
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-carbon-black-900">Carrinho</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-carbon-black-200 bg-white p-3"
            >
              <div className="w-24 shrink-0 rounded-xl bg-pale-slate-100 p-2">
                <OculosImagem forma={item.forma} armacao={item.armacao} lente={item.corLente} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-carbon-black-900">{item.nome}</p>
                <p className="text-sm text-carbon-black-600">
                  {item.quantidade} × {moeda(item.preco)}
                </p>
              </div>
              <p className="font-bold text-carbon-black-950">{moeda(item.preco * item.quantidade)}</p>
              <button
                type="button"
                onClick={() => remover(item.id)}
                aria-label={`Remover ${item.nome} do carrinho`}
                className="rounded-full p-2 text-carbon-black-600 hover:bg-carbon-black-100 hover:text-red-700"
              >
                <Trash2 aria-hidden="true" className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-carbon-black-200 bg-white p-5">
          <h2 className="font-semibold text-carbon-black-900">Resumo</h2>
          <div className="mt-4 flex items-center justify-between text-carbon-black-800">
            <span>Total</span>
            <span className="text-xl font-bold text-carbon-black-950">{moeda(total)}</span>
          </div>
          <button type="button" disabled className={`${botaoPrimario} mt-5 w-full`}>
            Finalizar compra
          </button>
          <p className="mt-2 text-xs text-carbon-black-600">O pagamento será feito na próxima etapa.</p>
          <Link to="/catalogo" className={`${botaoSecundario} mt-4 w-full`}>
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  )
}
