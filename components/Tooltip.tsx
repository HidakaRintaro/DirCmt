import { useRecoilValue } from 'recoil'
import { copyButtonState } from 'store/atoms/copyButtonAtom'

interface TooltipProps {
  text: string
}
export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  const copyButtonValue = useRecoilValue(copyButtonState)

  return (
    <div
      className={`rounded bg-gray-600 px-2 py-1 text-xs text-white ${
        copyButtonValue ? '' : 'opacity-0'
      }`}
    >
      {text}
    </div>
  )
}
