import { ReactNode } from 'react'

interface FooterProps {
  children?: ReactNode
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="border-t-2 bg-gray-100">
      {children}
      <p className="py-4 text-center">
        <small>&copy; 2022 HidakaRintaro</small>
      </p>
    </footer>
  )
}
