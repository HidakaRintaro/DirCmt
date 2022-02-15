import { Button } from 'components/Button'
import { DownloadIcon } from 'icons/DownloadIcon'
import { CopyButton } from 'components/CopyButton'
import { Tooltip } from 'components/Tooltip'

export const PreviewSection: React.FC = () => {
  const samplePreview =
    '.\n├── app      ----> application core codes\n│   ├── app      ----> collection of dependency injected\n│   ├── app      ----> collection of dependency injected\n│   ├── config   ----> config\n│   ├── domain   ----> domain layer, core business logics\n│   ├── handler  ----> (interface layer & application layer), request handlers\n│   └── dao      ----> (infrastructure layer), implementation of domain/repository\n│\n└── ddl      ----> DB definition master'
  return (
    <div className="mx-auto mb-8 flex h-96 flex-col divide-y-2 divide-gray-300 rounded-lg bg-gray-800 py-2 px-4 drop-shadow-lg">
      <div className="mb-2 flex">
        <Button
          icon={<DownloadIcon className="stroke-white stroke-2" />}
          value="Download"
          size="auto"
        />
      </div>
      <div className="group relative">
        <div className="absolute top-1 right-0 z-50 flex items-center gap-2">
          <div className="hidden group-hover:block">
            <Tooltip text="コピーしました" />
          </div>
          <div className="hidden group-hover:block">
            <CopyButton text={samplePreview} />
          </div>
        </div>
        <pre className="flex-1 overflow-scroll px-2 font-mono text-gray-100">
          {samplePreview}
        </pre>
      </div>
    </div>
  )
}
