import { Button } from 'components/Button'
import { DownloadIcon } from 'icons/DownloadIcon'
import { CopyButton } from 'components/CopyButton'
import { Tooltip } from 'components/Tooltip'
import { createPreview } from 'utils/createPreview'
import { useRecoilValue } from 'recoil'
import { dirCmtState } from 'store/atoms/dirCmtAtom'

export const PreviewSection: React.FC = () => {
  const dirCmtList = useRecoilValue(dirCmtState)
  const preview = dirCmtList.length === 0 ? '' : createPreview(dirCmtList, 0)
  return (
    <div className="mx-auto mb-8 flex h-96 flex-col divide-y-2 divide-gray-300 rounded-lg bg-gray-800 py-2 px-4 drop-shadow-lg">
      <div className="mb-2 flex">
        <Button
          icon={<DownloadIcon className="stroke-white stroke-2" />}
          value="Download"
          size="auto"
        />
      </div>
      <div className="group flex-1 overflow-auto">
        <div className="sticky top-6 z-50 flex h-0 items-center justify-end gap-2">
          <div className="hidden group-hover:block">
            <Tooltip text="コピーしました" />
          </div>
          <div className="hidden group-hover:block">
            <CopyButton text={preview} />
          </div>
        </div>
        <pre className="overflow-auto px-2 font-mono text-gray-100">
          {preview}
        </pre>
      </div>
    </div>
  )
}
