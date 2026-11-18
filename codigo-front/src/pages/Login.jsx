import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Glasses } from 'lucide-react'
import Campo from '../components/Campo'
import { botaoPrimario } from '../lib/formatos'

const schema = z.object({
  email: z.string().min(1, 'Informe seu e-mail').email('Digite um e-mail válido'),
  senha: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
})

export default function Login() {
  const navigate = useNavigate()
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { email: '', senha: '' } })

  // Protótipo: ainda não chama a API. Qualquer e-mail e senha válidos entram.
  const entrar = () => navigate('/admin/produtos/novo')

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-carbon-black-200 bg-white p-8 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-golden-pollen-500 text-carbon-black-950">
        <Glasses aria-hidden="true" className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-carbon-black-950">Entrar</h1>
      <p className="mt-1 text-sm text-carbon-black-600">
        Acesso do dono da ótica para cadastrar óculos e ver pedidos e consultas.
      </p>

      <form onSubmit={handleSubmit(entrar)} noValidate className="mt-6 flex flex-col gap-4">
        <Campo
          label="E-mail"
          type="email"
          autoComplete="email"
          placeholder="voce@otica.com"
          erro={errors.email?.message}
          {...register('email')}
        />
        <Campo
          label="Senha"
          type={mostrarSenha ? 'text' : 'password'}
          autoComplete="current-password"
          erro={errors.senha?.message}
          adorno={
            <button
              type="button"
              onClick={() => setMostrarSenha((valor) => !valor)}
              aria-label={mostrarSenha ? 'Esconder senha' : 'Mostrar senha'}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-carbon-black-600 hover:text-carbon-black-950"
            >
              {mostrarSenha ? (
                <EyeOff aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Eye aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          }
          {...register('senha')}
        />
        <button type="submit" className={`${botaoPrimario} mt-2 w-full`}>
          Entrar
        </button>
      </form>
    </div>
  )
}
