export const moeda = (valor) =>
  Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Estilos de botão reutilizados nas telas
export const botaoPrimario =
  'inline-flex items-center justify-center gap-2 rounded-full bg-golden-pollen-500 px-5 py-2.5 text-sm font-semibold text-carbon-black-950 transition-colors hover:bg-golden-pollen-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-pollen-600 disabled:cursor-not-allowed disabled:bg-carbon-black-200 disabled:text-carbon-black-500'

export const botaoSecundario =
  'inline-flex items-center justify-center gap-2 rounded-full border border-carbon-black-300 bg-white px-5 py-2.5 text-sm font-semibold text-carbon-black-900 transition-colors hover:border-carbon-black-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golden-pollen-600'
