import {
  createContext,
  createRef,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

const SplitPaneContext = createContext(
  {} as {
    clientWidth: number
    setClientWidth: (value: number) => void
    onMouseHoldDown: MouseEventHandler<HTMLDivElement>
  },
)

interface SplitPaneLeftProps {
  children: ReactNode
}

interface SplitPaneRightProps {
  children: ReactNode
}

export const Divider: React.FC = () => {
  const { onMouseHoldDown } = useContext(SplitPaneContext)
  return (
    <div
      className="w-[5px] cursor-col-resize bg-gray-200 hover:bg-orange-100 active:bg-orange-100"
      onMouseDown={onMouseHoldDown}
    />
  )
}

export const SplitPaneLeft: React.FC<SplitPaneLeftProps> = ({ children }) => {
  const topRef = createRef<HTMLDivElement>()
  const { clientWidth, setClientWidth } = useContext(SplitPaneContext)

  useEffect(() => {
    if (!clientWidth) {
      setClientWidth(topRef.current?.clientWidth ?? 0)
      return
    }
    if (clientWidth < 100 || clientWidth > 500) return

    topRef.current!.style.minWidth = clientWidth + 'px'
    topRef.current!.style.maxWidth = clientWidth + 'px'
  }, [clientWidth])

  return (
    <div className="flex-1" ref={topRef}>
      {children}
    </div>
  )
}

export const SplitPaneRight: React.FC<SplitPaneRightProps> = ({ children }) => {
  return <div className="flex-1 overflow-x-hidden">{children}</div>
}

export const SplitPane: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clientWidth, setClientWidth] = useState<number>(150)
  const xDividerPos = useRef<number>(0)

  const onMouseHoldDown: MouseEventHandler<HTMLDivElement> = (event) => {
    xDividerPos.current = event.clientX
  }

  const onMouseHoldUp = () => {
    xDividerPos.current = 0
  }

  const onMouseHoldMove: (event: MouseEvent) => void = (event) => {
    if (xDividerPos.current === 0) return
    setClientWidth(clientWidth + event.clientX - xDividerPos.current)
    xDividerPos.current = event.clientX
  }

  useEffect(() => {
    document.addEventListener('mouseup', onMouseHoldUp)
    document.addEventListener('mousemove', onMouseHoldMove)

    return () => {
      document.removeEventListener('mouseup', onMouseHoldUp)
      document.removeEventListener('mousemove', onMouseHoldMove)
    }
  })

  return (
    <div className="mt-[1px] flex h-[calc(100%-1px)] w-full">
      <SplitPaneContext.Provider
        value={{ clientWidth, setClientWidth, onMouseHoldDown }}
      >
        {children}
      </SplitPaneContext.Provider>
    </div>
  )
}
