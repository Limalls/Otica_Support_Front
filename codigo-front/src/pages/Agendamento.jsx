import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CircleCheck } from 'lucide-react'
import Campo from '../components/Campo'
import { botaoPrimario, botaoSecundario } from '../lib/formatos'

const schema = z.object({
  nome: z.string().trim().min(3, 'Informe seu nome completo'),
  telefone: z
    .string()
    .refine((valor) => valor.replace(/\D/g, '').length >= 10, 'Digite o telefone com DDD'),
  email: z.string().min(1, 'Informe seu e-mail').email('Digite um e-mail válido'),
  observacao: z.string().max(300, 'Use no máximo 300 caracteres'),
})

// Horários de exemplo, de 30 em 30 minutos. Quando a API estiver pronta,
// virão de GET /agendamentos/horarios?data=AAAA-MM-DD.
const horarios = Array.from({ length: 18 }, (_, i) => {
  const minutos = 9 * 60 + i * 30
  return `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`
})

const ocupadosNoDia = (data) => {
  const dia = Number(data.slice(8, 10))
  return horarios.filter((_, i) => (i * 7 + dia) % 5 === 0)
}

const formatarData = (iso) => {
  const [ano, mes, dia] = iso.split('-').map(Number)
  const data = new Date(ano, mes - 1, dia)
  return {
    iso,
    longa: data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }),
  }
}

const paraIso = (data) =>
  `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`

export default function Agendamento() {
  const [hoje] = useState(() => new Date())
  const [data, setData] = useState(() =>
    paraIso(new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1)),
  )
  const [horario, setHorario] = useState('')
  const [erroHorario, setErroHorario] = useState('')
  const [agendado, setAgendado] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { nome: '', telefone: '', email: '', observacao: '' },
  })

  const ocupados = ocupadosNoDia(data)

  const mudarData = (nova) => {
    setData(nova)
    if (ocupadosNoDia(nova).includes(horario)) setHorario('')
  }

  // Protótipo: ainda não chama a API (POST /agendamentos).
  const confirmar = (dados) => {
    if (!horario) {
      setErroHorario('Escolha um horário para a consulta.')
      return
    }
    setAgendado({ ...dados, data, horario })
  }

  if (agendado) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-3xl border border-carbon-black-200 bg-white p-10 text-center">
        <CircleCheck aria-hidden="true" className="h-12 w-12 text-golden-pollen-600" />
        <h1 className="text-2xl font-bold text-carbon-black-950">Consulta agendada</h1>
        <p className="text-carbon-black-700">
          {agendado.nome}, sua consulta está marcada para {formatarData(agendado.data).longa} às{' '}
          {agendado.horario}.
        </p>
        <p className="text-xs text-carbon-black-500">
          Protótipo: o agendamento ainda não é salvo, falta ligar à API.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              reset()
              setHorario('')
              setAgendado(null)
            }}
            className={botaoPrimario}
          >
            Agendar outra consulta
          </button>
          <Link to="/" className={botaoSecundario}>
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-carbon-black-900">Agendar consulta de vista</h1>
        <p className="mt-1 text-sm text-carbon-black-600">
          Escolha o dia e o horário e deixe seus dados para confirmarmos.
        </p>
      </header>

      <form onSubmit={handleSubmit(confirmar)} noValidate className="grid items-start gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-carbon-black-200 bg-white p-6">
          <h2 className="font-semibold text-carbon-black-900">1. Dia e horário</h2>

          <div className="mt-4">
            <label htmlFor="data" className="mb-1.5 block text-sm font-medium text-carbon-black-800">
              Dia da consulta
            </label>
            <input
              id="data"
              type="date"
              value={data}
              min={paraIso(hoje)}
              onChange={(evento) => evento.target.value && mudarData(evento.target.value)}
              className="rounded-lg border border-carbon-black-300 bg-white px-3 py-2.5 text-sm text-carbon-black-900 outline-none focus:border-golden-pollen-600 focus:ring-2 focus:ring-golden-pollen-500/40"
            />
            <p className="mt-2 text-sm text-carbon-black-700 first-letter:uppercase">
              {formatarData(data).longa}
            </p>
          </div>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-medium text-carbon-black-800">Horários</legend>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6">
              {horarios.map((hora) => {
                const ocupado = ocupados.includes(hora)
                const escolhido = hora === horario
                return (
                  <button
                    key={hora}
                    type="button"
                    disabled={ocupado}
                    aria-pressed={escolhido}
                    onClick={() => {
                      setHorario(hora)
                      setErroHorario('')
                    }}
                    className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-pollen-600 ${
                      escolhido
                        ? 'border-golden-pollen-600 bg-golden-pollen-500 text-carbon-black-950'
                        : ocupado
                          ? 'cursor-not-allowed border-carbon-black-200 bg-carbon-black-100 text-carbon-black-400 line-through'
                          : 'border-carbon-black-300 bg-white text-carbon-black-900 hover:border-carbon-black-600'
                    }`}
                  >
                    {hora}
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-xs text-carbon-black-600">Horários riscados já estão ocupados.</p>
            {erroHorario && (
              <p role="alert" className="mt-2 text-sm font-medium text-red-700">
                {erroHorario}
              </p>
            )}
          </fieldset>
        </section>

        <section className="rounded-2xl border border-carbon-black-200 bg-white p-6">
          <h2 className="font-semibold text-carbon-black-900">2. Seus dados</h2>
          <div className="mt-4 flex flex-col gap-4">
            <Campo
              label="Nome completo"
              autoComplete="name"
              erro={errors.nome?.message}
              {...register('nome')}
            />
            <Campo
              label="Telefone com DDD"
              type="tel"
              autoComplete="tel"
              placeholder="(84) 99999-9999"
              erro={errors.telefone?.message}
              {...register('telefone')}
            />
            <Campo
              label="E-mail"
              type="email"
              autoComplete="email"
              erro={errors.email?.message}
              {...register('email')}
            />
            <Campo
              label="Observação"
              as="textarea"
              rows={3}
              dica="Opcional. Conte, por exemplo, se já usa óculos."
              erro={errors.observacao?.message}
              {...register('observacao')}
            />
            <button type="submit" className={`${botaoPrimario} w-full sm:w-auto sm:self-start`}>
              Confirmar agendamento
            </button>
          </div>
        </section>
      </form>
    </div>
  )
}
