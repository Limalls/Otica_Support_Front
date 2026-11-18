import { forwardRef, useId } from 'react'

// Campo de formulário com rótulo e mensagem de erro, ligado ao React Hook Form.
const Campo = forwardRef(function Campo(
  { label, erro, dica, adorno, className = '', as: Elemento = 'input', children, ...props },
  ref,
) {
  const id = useId()

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-carbon-black-800">
        {label}
      </label>
      <div className="relative">
        <Elemento
          id={id}
          ref={ref}
          aria-invalid={erro ? 'true' : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-carbon-black-900 outline-none transition placeholder:text-carbon-black-400 focus:border-golden-pollen-600 focus:ring-2 focus:ring-golden-pollen-500/40 ${
            adorno ? 'pr-11' : ''
          } ${erro ? 'border-red-600' : 'border-carbon-black-300'}`}
          {...props}
        >
          {children}
        </Elemento>
        {adorno}
      </div>
      {dica && !erro && <p className="mt-1 text-xs text-carbon-black-600">{dica}</p>}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="mt-1 text-xs font-medium text-red-700">
          {erro}
        </p>
      )}
    </div>
  )
})

export default Campo
