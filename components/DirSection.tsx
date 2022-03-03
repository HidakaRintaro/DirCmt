import { FileAddIcon } from 'icons/FileAddIcon'
import { FolderAddIcon } from 'icons/FolderAddIcon'
import { Button } from 'components/Button'
import { DirList } from 'components/DirList'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { selectingRowState } from 'store/atoms/uiDirList/selectingRowAtom'
import { newRowState } from 'store/atoms/uiDirList/newRowAtom'
import { TrashIcon } from 'icons/TrashIcon'
import { focusRowState } from 'store/atoms/uiDirList/focusRowAtom'
import { dirCmtState } from 'store/atoms/dirCmtAtom'
import { deleteDirCmt } from 'utils/deleteDircmt'
import { cloneDeep } from 'lodash'

interface DirSectionProps {}

export const DirSection: React.FC<DirSectionProps> = (props) => {
  const [dirCmtList, setDirCmtList] = useRecoilState(dirCmtState)
  const selectingRow = useRecoilValue(selectingRowState)
  const [focusRow, setFocusRow] = useRecoilState(focusRowState)
  const setNewRow = useSetRecoilState(newRowState)
  let newDirCmtList = cloneDeep(dirCmtList)

  const handleClickFolder = () => {
    setNewRow({ isShow: true, type: 'directory', selectingRow: selectingRow })
    setFocusRow({ path: './', side: 'name' })
  }
  const handleClickFile = () => {
    setNewRow({ isShow: true, type: 'file', selectingRow: selectingRow })
    setFocusRow({ path: './', side: 'name' })
  }
  const handleClickDelete = () => {
    newDirCmtList = deleteDirCmt(focusRow.path, newDirCmtList)
    console.log(newDirCmtList)
    setDirCmtList(newDirCmtList)
    setFocusRow({ path: './', side: 'name' })
  }

  return (
    <div
      className={`mx-auto mb-8 flex h-96 flex-col divide-y-2 divide-gray-300 rounded-lg bg-white py-2  px-4 drop-shadow-lg`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-3">
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
        {focusRow.path !== './' && (
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 hover:opacity-80"
            onClick={handleClickDelete}
          >
            <TrashIcon className="stroke-white stroke-2" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-auto">
        <DirList />
      </div>
    </div>
  )
}
