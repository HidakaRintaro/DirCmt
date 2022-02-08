import { ReactNode } from 'react'

interface ButtonProps {
  icon?: ReactNode
  value: string
  size?: 'md' | 'lg' | 'auto'
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { icon, value, size = 'md' } = props
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-lg bg-orange-400 p-2 hover:opacity-80 ${
        size === 'md' ? 'w-28' : size === 'lg' ? 'w-36' : 'w-auto'
      }`}
    >
      {icon && <div>{icon}</div>}
      <div className="font-bold text-white">{value}</div>
    </button>
  )
}
