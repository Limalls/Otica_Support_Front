import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CircleCheck } from 'lucide-react'
import Campo from '../components/Campo'
import OculosImagem from '../components/OculosImagem'
import { categorias } from '../mocks/produtos'
import { botaoPrimario, botaoSecundario, moeda } from '../lib/formatos'

const schema = z.object({
  nome: z.string().trim().min(3, 'O nome precisa ter pelo menos 3 letras'),
  categoria: z.string().min(1, 'Escolha uma categoria'),
  preco: z.coerce.number().positive('Informe um preço maior que zero'),
  estoque: z.coerce
    .number()
    .int('Use um número inteiro')
    .min(0, 'O estoque não pode ser negativo'),
  descricao: z.string().trim().min(10, 'Descreva o produto em pelo menos 10 caracteres'),
  imagemUrl: z.union([z.literal(''), z.string().url('Digite um endereço válido, como https://...')]),
  ativo: z.boolean(),
})

const formas = {
  Aviador: 'aviador',
  Redondo: 'redondo',
  Quadrado: 'quadrado',
  Gatinho: 'gatinho',
  Esportivo: 'esportivo',
}

const valoresIniciais = {
  nome: '',
  categoria: '',
  preco: '',
  estoque: '',
  descricao: '',
  imagemUrl: '',
  ativo: true,
}

export default function ProdutoNovo() {
  const [cadastrado, setCadastrado] = useState(null)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: valoresIniciais })

  // Acompanha o que está sendo digitado para atualizar a pré-visualização
  const [nome, categoria, preco] = useWatch({ control, name: ['nome', 'categoria', 'preco'] })
  const precoNumero = Number(preco)

  // Protótipo: ainda não chama a API (POST /produtos). Só mostra o resultado.
  const cadastrar = (dados) => setCadastrado(dados)

  if (cadastrado) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-3xl border border-carbon-black-200 bg-white p-10 text-center">
        <CircleCheck aria-hidden="true" className="h-12 w-12 text-golden-pollen-600" />
        <h1 className="text-2xl font-bold text-carbon-black-950">Óculos cadastrado</h1>
        <p className="text-carbon-black-700">
          {cadastrado.nome} ({cadastrado.categoria}) por {moeda(cadastrado.preco)}, com{' '}
          {cadastrado.estoque} em estoque.
        </p>
        <p className="text-xs text-carbon-black-500">
          Protótipo: os dados ainda não são salvos, falta ligar à API.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              reset(valoresIniciais)
              setCadastrado(null)
            }}
            className={botaoPrimario}
          >
            Cadastrar outro
          </button>
          <Link to="/catalogo" className={botaoSecundario}>
            Ver catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-carbon-black-900">Cadastrar óculos</h1>
        <p className="mt-1 text-sm text-carbon-black-600">
          Preencha os dados do produto. Os campos mudam a pré-visualização ao lado.
        </p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
        <form
          onSubmit={handleSubmit(cadastrar)}
          noValidate
          className="grid gap-4 rounded-2xl border border-carbon-black-200 bg-white p-6 sm:grid-cols-2"
        >
          <Campo
            className="sm:col-span-2"
            label="Nome"
            placeholder="Ex.: Aviador Clássico"
            erro={errors.nome?.message}
            {...register('nome')}
          />

          <Campo label="Categoria" as="select" erro={errors.categoria?.message} {...register('categoria')}>
            <option value="">Selecione</option>
            {categorias.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Campo>

          <Campo
            label="Preço (R$)"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            placeholder="0,00"
            erro={errors.preco?.message}
            {...register('preco')}
          />

          <Campo
            label="Estoque"
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="0"
            erro={errors.estoque?.message}
            {...register('estoque')}
          />

          <Campo
            label="Imagem"
            type="url"
            placeholder="https://..."
            dica="Opcional. Cole o endereço de uma foto do produto."
            erro={errors.imagemUrl?.message}
            {...register('imagemUrl')}
          />

          <Campo
            className="sm:col-span-2"
            label="Descrição"
            as="textarea"
            rows={4}
            placeholder="Conte como é o óculos, o material e para quem ele combina."
            erro={errors.descricao?.message}
            {...register('descricao')}
          />

          <label className="flex items-center gap-2 text-sm text-carbon-black-800 sm:col-span-2">
            <input
              type="checkbox"
              className="h-4 w-4 accent-golden-pollen-600"
              {...register('ativo')}
            />
            Mostrar no catálogo
          </label>

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button type="submit" className={botaoPrimario}>
              Cadastrar óculos
            </button>
            <Link to="/catalogo" className={botaoSecundario}>
              Cancelar
            </Link>
          </div>
        </form>

        <aside
          aria-label="Pré-visualização do produto"
          className="rounded-2xl border border-carbon-black-200 bg-white p-4 lg:sticky lg:top-24"
        >
          <p className="mb-3 text-sm font-medium text-carbon-black-600">Pré-visualização</p>
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-pale-slate-100 p-6">
            <OculosImagem
              forma={formas[categoria] ?? 'redondo'}
              armacao="#343232"
              lente="#1a1919"
              className="w-full"
            />
          </div>
          <p className="mt-3 text-xs font-medium text-carbon-black-600">{categoria || 'Categoria'}</p>
          <p className="font-semibold text-carbon-black-900">{nome?.trim() || 'Nome do óculos'}</p>
          <p className="mt-1 text-lg font-bold text-carbon-black-950">
            {precoNumero > 0 ? moeda(precoNumero) : 'R$ 0,00'}
          </p>
        </aside>
      </div>
    </div>
  )
}
