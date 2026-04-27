import { AlertCircle } from 'lucide-react'


export default function Input({
  label,
  id,
  name,
  value,
  onChange,
  placeholder = '',
  type        = 'text',
  error,
  className   = '',
  disabled    = false,
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>

      <label
        htmlFor={id}
        className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-lg px-3 py-2 text-xs text-gray-800
          bg-gray-50 border outline-none transition-all
          placeholder:text-gray-400
          focus:ring-2 focus:ring-teal-200 focus:border-teal-400
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : 'border-gray-200'
          }
        `}
      />

      {error && (
        <p className="flex items-center gap-1 text-[10px] text-red-500 mt-0.5">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}

    </div>
  )
}