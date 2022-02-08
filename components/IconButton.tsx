import { ReactNode } from 'react'

interface ButtonProps {
  icon?: ReactNode
  value: string
  size?: 'sm' | 'lg'
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { icon, value, size = 'sm' } = props
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-lg bg-orange-400  p-2 hover:opacity-80 ${
        size === 'sm' ? 'w-28' : 'w-40'
      }`}
    >
      {icon && <div>{icon}</div>}
      <div className="font-bold text-white">{value}</div>
    </button>
  )
}
