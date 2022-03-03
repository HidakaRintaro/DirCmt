import { ChevronIcon } from 'icons/ChevronIcon'
import { FileIcon } from 'icons/FileIcon'
import { FolderIcon } from 'icons/FolderIcon'
import { cloneDeep } from 'lodash'
import {
  useState,
  useRef,
  KeyboardEventHandler,
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
} from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { focusRowState } from 'store/atoms/uiDirList/focusRowAtom'
import { newRowState } from 'store/atoms/uiDirList/newRowAtom'
import { selectingRowState } from 'store/atoms/uiDirList/selectingRowAtom'
import { dirCmtSelector } from 'store/selectors/dirCmtSelector'
import { isEditNameSelector } from 'store/selectors/uiDirList/isEditNameSelector'
import { isHoverSelector } from 'store/selectors/uiDirList/isHoverSelector'
import { isOpenSelector } from 'store/selectors/uiDirList/isOpenSelector'
import { nameSelector } from 'store/selectors/uiDirList/nameSelector'
import { addDirCmt } from 'utils/addDirCmt'
import { duplicateCheck, fixedName } from 'utils/fixedName'

interface DirListColNameProps {
  type: 'file' | 'directory'
  name: string
  depth: number
  path: string
}

interface DirListColNameEditProps {
  type: 'file' | 'directory'
  depth: number
  path: string
}

export const DirListColName: React.FC<DirListColNameProps> = (props) => {
  const { type, name: nowName, depth, path } = props
  const [herePath, setHerePath] = useState(path + nowName + '/')
  const [dirCmtList, setDirCmtList] = useRecoilState(dirCmtSelector)
  const [isOpen, setIsOpen] = useRecoilState(isOpenSelector(herePath))
  const [isEdit, setIsEdit] = useRecoilState(isEditNameSelector(herePath))
  const [name, setName] = useRecoilState(nameSelector(herePath))
  const [isHover, setIsHover] = useRecoilState(isHoverSelector(herePath))
  const setSelectingRow = useSetRecoilState(selectingRowState)
  const [focusRow, setFocusRow] = useRecoilState(focusRowState)
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
    setFocusRow({ path: herePath, side: 'name' })
  }

  useEffect(() => {
    setName(nowName)
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  })

  useEffect(() => {
    setHerePath(path + nowName + '/')
    setName(nowName)
  }, [nowName, path, setName])

  let style = 'flex h-8 w-full items-center gap-[2px] rounded-l-md'
  if (herePath === focusRow.path) {
    style += ' border-[1px] border-r-0 border-orange-300 py-0 pl-0'
    if (focusRow.side === 'name') style += ' bg-orange-100'
  } else if (isHover) {
    style += ' bg-gray-100 py-px pl-px'
  } else {
    style += ' py-px pl-px'
  }

  return (
    <div
      className={style}
      onKeyDown={handleKeyPressEdit}
      tabIndex={-1}
      onFocus={handleFocusRow}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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

export const DirListColNameEdit: React.FC<DirListColNameEditProps> = (
  props,
) => {
  const { type, depth, path } = props
  const herePath = path + ':new/'
  const [dirCmtList, setDirCmtList] = useRecoilState(dirCmtSelector)
  const [isEdit, setIsEdit] = useRecoilState(isEditNameSelector(herePath))
  const [name, setName] = useRecoilState(nameSelector(herePath))
  const setNewRow = useSetRecoilState(newRowState)
  const selectingRow = useRecoilValue(selectingRowState)
  const inputRef = useRef<HTMLInputElement>(null)
  const newDirCmtList = cloneDeep(dirCmtList)

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value)
  }
  const handleBlurNameFixed: FocusEventHandler<HTMLInputElement> = () => {
    if (name === '') {
      setNewRow({ isShow: false, type: type, selectingRow: selectingRow })
      return
    }
    // TODO 強引にインポートして処理をしているのでよしなに修正する(重複処理)
    const pathAry = selectingRow.split('/')
    pathAry.shift() // 先頭パスの . を削除
    pathAry.pop() // 末尾の空文字を削除
    if (duplicateCheck(dirCmtList, [...pathAry, name])) {
      // TODO エラー処理をする
      if (inputRef && inputRef.current) inputRef.current?.focus()
      return
    }
    addDirCmt(selectingRow, newDirCmtList, { name: name, type: type })

    setNewRow({ isShow: false, type: type, selectingRow: selectingRow })
    setIsEdit(false)
    setDirCmtList(newDirCmtList)
  }
  const handleKeyPressNameFixed: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key == 'Enter') {
      if (name === '') {
        setNewRow({ isShow: false, type: type, selectingRow: selectingRow })
        return
      }
      // TODO 強引にインポートして処理をしているのでよしなに修正する(重複処理)
      const pathAry = selectingRow.split('/')
      pathAry.shift() // 先頭パスの . を削除
      pathAry.pop() // 末尾の空文字を削除
      if (duplicateCheck(dirCmtList, [...pathAry, name])) {
        // TODO エラー処理をする
        if (inputRef && inputRef.current) inputRef.current?.focus()
        return
      }
      addDirCmt(selectingRow, newDirCmtList, { name: name, type: type })

      setNewRow({ isShow: false, type: type, selectingRow: selectingRow })
      setIsEdit(false)
      setDirCmtList(newDirCmtList)
    }
  }

  useEffect(() => {
    setName('')
    setIsEdit(true)
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  })

  return (
    <div
      className="flex h-8 w-full items-center gap-[2px] rounded-l-md py-px pl-px hover:bg-orange-100"
      tabIndex={-1}
    >
      <div style={{ paddingLeft: 12 * depth + 'px' }} />
      {type === 'file' ? (
        <div className="pl-5" />
      ) : (
        <span className="cursor-pointer rounded-sm p-1 hover:bg-gray-300">
          <ChevronIcon className="h-3 w-3 stroke-black stroke-2 text-center" />
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
