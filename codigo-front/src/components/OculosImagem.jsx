// Ilustração de óculos em SVG, usada no lugar das fotos enquanto não temos as imagens reais.
const lentes = {
  redondo: <circle cx="52" cy="40" r="27" />,
  quadrado: <rect x="24" y="16" width="54" height="42" rx="10" />,
  aviador: <path d="M24 22 Q24 18 30 18 H76 Q82 18 80 26 Q74 62 50 62 Q26 62 24 30 Z" />,
  gatinho: <path d="M22 30 Q20 18 34 22 L78 28 Q84 30 82 40 Q78 58 52 58 Q24 58 22 38 Z" />,
  esportivo: <rect x="20" y="20" width="62" height="34" rx="16" />,
}

export default function OculosImagem({
  forma = 'redondo',
  armacao = '#343232',
  lente = '#1a1919',
  titulo,
  className = '',
}) {
  const acessibilidade = titulo ? { role: 'img', 'aria-label': titulo } : { 'aria-hidden': true }
  const desenho = lentes[forma] ?? lentes.redondo

  const lado = (
    <>
      <g fill={lente} fillOpacity="0.92" stroke={armacao} strokeWidth="4" strokeLinejoin="round">
        {desenho}
      </g>
      <path
        d="M34 28 L46 22"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  )

  return (
    <svg viewBox="0 0 200 80" fill="none" className={className} {...acessibilidade}>
      <path d="M80 32 Q100 22 120 32" stroke={armacao} strokeWidth="4" strokeLinecap="round" />
      <path
        d="M24 28 L6 24 M176 28 L194 24"
        stroke={armacao}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {lado}
      <g transform="translate(200 0) scale(-1 1)">{lado}</g>
    </svg>
  )
}
