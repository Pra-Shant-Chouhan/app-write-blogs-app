import React, { useId } from 'react'

interface SelectProps {
  options: { value: string; label: string }[]
  label?: string
  className?: string
  [key: string]: any
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  label,
  className,
  ...props
}, ref) => {
  const id = useId()
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
      <select id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
)
// export default React.forwardRef(Select) // *** other way of export with forward ref
export default Select