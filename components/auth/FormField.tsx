import { LucideIcon } from 'lucide-react'

interface FormFieldProps {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  icon?: LucideIcon
  required?: boolean
}

export function FormField({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  )
}