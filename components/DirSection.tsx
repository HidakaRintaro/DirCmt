import { FileAddIcon } from 'icons/FileAddIcon'
import { FolderAddIcon } from 'icons/FolderAddIcon'
import { Button } from 'components/Button'
import { DirList } from 'components/DirList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dirCmtState } from 'store/atoms/dirCmtAtom'
import { selectingRowState } from 'store/atoms/uiDirList/selectingRowAtom'
import { addDirCmt } from 'utils/addDirCmt'
import { cloneDeep } from 'lodash'

interface DirSectionProps {}

export const DirSection: React.FC<DirSectionProps> = (props) => {
  const [dirCmtList, setDirCmtList] = useRecoilState(dirCmtState)
  const selectingRow = useRecoilValue(selectingRowState)
  const newDirCmtList = cloneDeep(dirCmtList)
  const handleClickFolder = () => {
    addDirCmt(selectingRow, newDirCmtList, 'directory')
    setDirCmtList(newDirCmtList)
  }
  const handleClickFile = () => {
    addDirCmt(selectingRow, newDirCmtList, 'file')
    setDirCmtList(newDirCmtList)
  }

  return (
    <div
      className={`mx-auto mb-8 flex h-96 flex-col divide-y-2 divide-gray-300 rounded-lg bg-white py-2  px-4 drop-shadow-lg`}
    >
      <div className="mb-2 flex gap-3">
        <Button
          icon={<FolderAddIcon className="stroke-white stroke-2" />}
          value="Folder"
          onClick={handleClickFolder}
        />
        <Button
          icon={<FileAddIcon className="stroke-white stroke-2" />}
          value="File"
          onClick={handleClickFile}
        />
      </div>
      <div className="flex-1 overflow-auto">
        <DirList />
      </div>
    </div>
  )
}
