import { Button } from 'components/Button'
import { DownloadIcon } from 'icons/DownloadIcon'

export const PreviewSection: React.FC = () => {
  const samplePreview =
    '.\n├── app      ----> application core codes\n│   ├── app      ----> collection of dependency injected\n│   ├── app      ----> collection of dependency injected\n│   ├── config   ----> config\n│   ├── domain   ----> domain layer, core business logics\n│   ├── handler  ----> (interface layer & application layer), request handlers\n│   └── dao      ----> (infrastructure layer), implementation of domain/repository\n│\n└── ddl      ----> DB definition master'
  return (
    <div className="mx-auto mb-8 h-96 divide-y-2 divide-gray-300 rounded-lg bg-gray-800 py-2 px-4 drop-shadow-lg">
      <div className="mb-2 flex">
        <Button
          icon={<DownloadIcon className="stroke-white stroke-2" />}
          value="Download"
          size="auto"
        />
      </div>
      <div className="whitespace-pre-line px-2 font-mono text-gray-100">
        {samplePreview}
      </div>
    </div>
  )
}
