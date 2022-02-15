import { CopyIcon } from 'icons/CopyIcon'
import { textCopy } from 'utils/textCopy'

interface CopyButtonProps {
  text: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  return (
    <button
      onClick={() => textCopy(text)}
      className="rounded-md border-[1px] border-gray-500 bg-gray-700 p-2 text-center hover:border-gray-400 hover:bg-gray-600"
    >
      <CopyIcon className="stroke-white stroke-2" />
    </button>
  )
}
