import { createRef, ReactNode } from 'react'

interface SplitPaneLeftProps {
  children: ReactNode
}

interface SplitPaneRightProps {
  children: ReactNode
}

export const Divider: React.FC = () => {
  return <div className="cursor-col-resize border-[1px] border-gray-200" />
}

export const SplitPaneLeft: React.FC<SplitPaneLeftProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>
}

export const SplitPaneRight: React.FC<SplitPaneRightProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>
}
