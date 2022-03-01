import { ChevronIcon } from 'icons/ChevronIcon'
import { FileIcon } from 'icons/FileIcon'
import { FolderIcon } from 'icons/FolderIcon'
import { cloneDeep } from 'lodash'
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { selectingRowState } from 'store/atoms/uiDirList/selectingRowAtom'
import { dirCmtSelector } from 'store/selectors/dirCmtSelector'
import { commentSelector } from 'store/selectors/uiDirList/commentSelector'
import { isEditCommentSelector } from 'store/selectors/uiDirList/isEditCommentSelector'
import { isEditNameSelector } from 'store/selectors/uiDirList/isEditNameSelector'
import { isOpenSelector } from 'store/selectors/uiDirList/isOpenSelector'
import { nameSelector } from 'store/selectors/uiDirList/nameSelector'
import { DirCmt } from 'types/dirCmt'
import { fixedName } from 'utils/fixedName'

interface DirListColNameProps {
  type: 'file' | 'directory'
  name: string
  depth: number
  path: string
}

interface DirListColCommentProps {
  name: string
  comment: string
  path: string
}

interface DirListColProps {
  type: 'name' | 'comment'
  data: DirCmt
  depth: number
  path: string
}

const DirListColName: React.FC<DirListColNameProps> = (props) => {
  const { type, name: nowName, depth, path } = props
  const herePath = path + nowName + '/'
  const [dirCmtList, setDirCmtList] = useRecoilState(dirCmtSelector)
  const [isOpen, setIsOpen] = useRecoilState(isOpenSelector(herePath))
  const [isEdit, setIsEdit] = useRecoilState(isEditNameSelector(herePath))
  const [name, setName] = useRecoilState(nameSelector(herePath))
  const setSelectingRow = useSetRecoilState(selectingRowState)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyPressEdit: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== 'Enter') return
    setIsEdit(true)
    event.currentTarget.blur()
  }
  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value)
  }
  const handleBlurNameFixed: FocusEventHandler<HTMLInputElement> = () => {
    const { err, res: newDirCmtList } = fixedName(
      name,
      cloneDeep(dirCmtList),
      herePath,
    )

    if (err || !newDirCmtList) {
      if (inputRef && inputRef.current) inputRef.current?.focus()
      // TODO エラーの時の処理を追加する
      return
    }
    setIsEdit(false)
    setDirCmtList(newDirCmtList)
  }
  const handleKeyPressNameFixed: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key == 'Enter') {
      const { err, res: newDirCmtList } = fixedName(
        name,
        cloneDeep(dirCmtList),
        herePath,
      )

      if (err || !newDirCmtList) {
        if (inputRef && inputRef.current) inputRef.current?.focus()
        // TODO エラーの時の処理を追加する
        return
      }
      setIsEdit(false)
      setDirCmtList(newDirCmtList)
    }
  }
  const handleFocusRow = () => {
    setSelectingRow(type === 'file' ? path : herePath)
  }

  useEffect(() => {
    setName(nowName)
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  })

  return (
    <div
      className="flex h-8 w-full items-center gap-[2px] rounded-l-md pl-1 hover:bg-orange-100"
      onKeyDown={handleKeyPressEdit}
      tabIndex={-1}
      onFocus={handleFocusRow}
    >
      <div style={{ paddingLeft: 12 * depth + 'px' }} />
      {type === 'file' ? (
        <div className="pl-5" />
      ) : (
        <span
          className="cursor-pointer rounded-sm p-1 hover:bg-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronIcon
            className={`h-3 w-3 stroke-black stroke-2 text-center ${
              isOpen ? 'origin-center rotate-90' : ''
            }`}
          />
        </span>
      )}
      <span className="max-w-[20px]">
        {type === 'file' ? (
          <FileIcon className="h-5 w-5 stroke-black stroke-2" />
        ) : (
          <FolderIcon className="h-5 w-5 stroke-black stroke-2" />
        )}
      </span>
      <div className="overflow-hidden overflow-ellipsis">
        {isEdit ? (
          <input
            value={name}
            className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
            onBlur={handleBlurNameFixed}
            onKeyPress={handleKeyPressNameFixed}
            onChange={handleChangeName}
            ref={inputRef}
          />
        ) : (
          <span className="pl-[5px]">{name}</span>
        )}
      </div>
    </div>
  )
}

const DirListColComment: React.FC<DirListColCommentProps> = (props) => {
  const { name, comment: nowComment, path } = props
  const herePath = path + name + '/'
  const [isEdit, setIsEdit] = useRecoilState(isEditCommentSelector(herePath))
  const [comment, setComment] = useRecoilState(commentSelector(herePath))
  const setSelectingRow = useSetRecoilState(selectingRowState)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyPressEdit: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== 'Enter') return
    setIsEdit(true)
    event.currentTarget.blur()
  }
  const handleChangeComment: ChangeEventHandler<HTMLInputElement> = (event) => {
    setComment(event.target.value)
  }
  const handleBlurCommentFixed: FocusEventHandler<HTMLInputElement> = () => {
    setIsEdit(false)
  }
  const handleKeyPressCommentFixed: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key == 'Enter') setIsEdit(false)
  }
  useEffect(() => {
    setComment(nowComment)
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  })

  return (
    <div
      className="flex h-8 w-full items-center whitespace-nowrap rounded-r-md px-2 hover:bg-orange-100"
      onKeyDown={handleKeyPressEdit}
      tabIndex={-1}
      onFocus={() => setSelectingRow(path)}
      onBlur={() => setSelectingRow('./')}
    >
      {isEdit ? (
        <input
          value={comment}
          className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
          onBlur={handleBlurCommentFixed}
          onKeyPress={handleKeyPressCommentFixed}
          onChange={handleChangeComment}
          ref={inputRef}
        />
      ) : (
        <span className="min-w-0 pl-[5px]">{comment}</span>
      )}
    </div>
  )
}

export const DirListCol: React.FC<DirListColProps> = (props) => {
  const { type, data, path, depth } = props
  const herePath = path + data.name + '/'
  const isOpen = useRecoilValue(isOpenSelector(herePath))
  return (
    <>
      {type === 'name' ? (
        <DirListColName
          name={data.name}
          type={data.type}
          depth={depth}
          path={path}
        />
      ) : (
        <DirListColComment
          name={data.name}
          comment={data.comment ?? ''}
          path={path}
        />
      )}
      {isOpen &&
        (data.children ?? []).map((child, index) => {
          return child.type === 'file' ? (
            type === 'name' ? (
              <DirListColName
                key={index}
                name={child.name}
                type={child.type}
                depth={depth + 1}
                path={herePath}
              />
            ) : (
              <DirListColComment
                name={child.name}
                key={index}
                comment={child.comment ?? ''}
                path={herePath}
              />
            )
          ) : (
            <DirListCol
              key={index}
              type={type}
              data={child}
              depth={depth + 1}
              path={herePath}
            />
          )
        })}
    </>
  )
}
