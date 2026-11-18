import { Link } from 'react-router-dom'
import OculosImagem from '../components/OculosImagem'
import ProdutoCard from '../components/ProdutoCard'
import { produtos } from '../mocks/produtos'
import { botaoPrimario } from '../lib/formatos'

export default function Home() {
  return (
    <div className="flex flex-col gap-14">
      <section className="grid items-center gap-8 overflow-hidden rounded-3xl bg-carbon-black-950 p-8 md:grid-cols-2 md:p-12">
        <div>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Escolha seus óculos de sol e marque a consulta de vista no mesmo lugar
          </h1>
          <p className="mt-4 max-w-md text-pale-slate-200">
            Veja o catálogo, compre online e reserve o horário do seu exame sem precisar ligar para
            a ótica.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/catalogo" className={botaoPrimario}>
              Ver catálogo
            </Link>
            <Link
              to="/agendamento"
              className="inline-flex items-center justify-center rounded-full border border-carbon-black-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-pollen-400"
            >
              Agendar consulta
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-6 rounded-full bg-golden-pollen-500/20 blur-3xl" />
          <OculosImagem
            forma="aviador"
            armacao="#ffb300"
            lente="#1a1919"
            titulo="Ilustração de óculos aviador"
            className="relative w-full max-w-md -rotate-6"
          />
        </div>
      </section>

      <section aria-labelledby="destaques">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="destaques" className="text-xl font-bold text-carbon-black-900">
            Destaques
          </h2>
          <Link
            to="/catalogo"
            className="text-sm font-semibold text-carbon-black-800 underline decoration-golden-pollen-500 decoration-2 underline-offset-4 hover:text-carbon-black-950"
          >
            Ver todos os óculos
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {produtos.slice(0, 4).map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>
    </div>
  )
}
