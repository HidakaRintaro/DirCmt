import { CopyIcon } from 'icons/CopyIcon'
import { useSetRecoilState } from 'recoil'
import { copyButtonState } from 'store/atoms/copyButtonAtom'
import { textCopy } from 'utils/textCopy'

interface CopyButtonProps {
  text: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const setCopyButtonValue = useSetRecoilState(copyButtonState)
  const onClickHandler = () => {
    textCopy(text)
    setCopyButtonValue(true)
    // TODO: ↓この処理っていいの？
    setTimeout(() => {
      setCopyButtonValue(false)
    }, 2000)
  }
  return (
    <button
      onClick={onClickHandler}
      className="rounded-md border-[1px] border-gray-500 bg-gray-700 p-2 text-center opacity-90 hover:border-gray-400 hover:bg-gray-600"
    >
      <CopyIcon className="stroke-white stroke-2" />
    </button>
  )
}
