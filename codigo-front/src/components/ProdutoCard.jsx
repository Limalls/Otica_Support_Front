import { Link } from 'react-router-dom'
import OculosImagem from './OculosImagem'
import { moeda } from '../lib/formatos'

export default function ProdutoCard({ produto }) {
  const esgotado = produto.estoque === 0

  return (
    <Link
      to={`/produto/${produto.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-carbon-black-200 bg-white transition-shadow hover:shadow-lg hover:shadow-carbon-black-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-pollen-600"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-pale-slate-100 p-6">
        <OculosImagem
          forma={produto.forma}
          armacao={produto.armacao}
          lente={produto.corLente}
          titulo={`Ilustração do modelo ${produto.nome}`}
          className="w-full transition-transform duration-300 group-hover:scale-105"
        />
        {esgotado && (
          <span className="absolute left-3 top-3 rounded-full bg-carbon-black-900 px-3 py-1 text-xs font-semibold text-white">
            Esgotado
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium text-carbon-black-600">{produto.categoria}</span>
        <h3 className="font-semibold text-carbon-black-900">{produto.nome}</h3>
        <p className="mt-auto pt-2 text-lg font-bold text-carbon-black-950">{moeda(produto.preco)}</p>
      </div>
    </Link>
  )
}
