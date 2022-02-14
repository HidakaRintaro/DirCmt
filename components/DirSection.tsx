import { FileAddIcon } from 'icons/FileAddIcon'
import { FolderAddIcon } from 'icons/FolderAddIcon'
import { Button } from 'components/Button'
import { DirTable } from './DirTable'

interface DirSectionProps {}

export const DirSection: React.FC<DirSectionProps> = (props) => {
  return (
    <div
      className={`mx-auto mb-8 flex h-96 flex-col divide-y-2 divide-gray-300 rounded-lg bg-white py-2  px-4 drop-shadow-lg`}
    >
      <div className="mb-2 flex gap-3">
        <Button
          icon={<FolderAddIcon className="stroke-white stroke-2" />}
          value="Folder"
        />
        <Button
          icon={<FileAddIcon className="stroke-white stroke-2" />}
          value="File"
        />
      </div>
      <div className="flex-1 overflow-auto">
        <DirTable />
      </div>
    </div>
  )
}
