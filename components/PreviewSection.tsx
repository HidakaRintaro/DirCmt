import { Button } from 'components/Button'
import { DownloadIcon } from 'icons/DownloadIcon'

export const PreviewSection: React.FC = () => {
  return (
    <div className="mx-auto mb-8 h-96 divide-y-2 divide-gray-300 rounded-lg bg-gray-800 py-2 px-4 drop-shadow-lg">
      <div className="mb-2 flex">
        <Button
          icon={<DownloadIcon className="stroke-white stroke-2" />}
          value="Download"
          size="auto"
        />
      </div>
      <div>Preview</div>
    </div>
  )
}
