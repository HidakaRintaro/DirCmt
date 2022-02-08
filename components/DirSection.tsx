import { FileAddIcon } from '~/icons/FileAddIcon'
import { FolderAddIcon } from '~/icons/FolderAddIcon'
import { Button } from '~/components/IconButton'

interface DirSectionProps {}

export const DirSection: React.FC<DirSectionProps> = (props) => {
  return (
    <div className="mx-auto  h-96 divide-y-2 divide-gray-300 rounded-lg bg-white py-2 px-4  drop-shadow-lg">
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
      <div>folder</div>
    </div>
  )
}
