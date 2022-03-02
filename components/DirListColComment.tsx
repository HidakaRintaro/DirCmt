import { cloneDeep } from 'lodash'
import {
  useState,
  useRef,
  KeyboardEventHandler,
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
} from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { focusRowState } from 'store/atoms/uiDirList/focusRowAtom'
import { selectingRowState } from 'store/atoms/uiDirList/selectingRowAtom'
import { dirCmtSelector } from 'store/selectors/dirCmtSelector'
import { commentSelector } from 'store/selectors/uiDirList/commentSelector'
import { isEditCommentSelector } from 'store/selectors/uiDirList/isEditCommentSelector'
import { isHoverSelector } from 'store/selectors/uiDirList/isHoverSelector'
import { fixedComment } from 'utils/fixedComment'

interface DirListColCommentProps {
  type: 'file' | 'directory'
  name: string
  comment: string
  path: string
}

export const DirListColComment: React.FC<DirListColCommentProps> = (props) => {
  const { type, name, comment: nowComment, path } = props
  const [herePath, setHerePath] = useState(path + name + '/')
  const [dirCmtList, setDirCmtList] = useRecoilState(dirCmtSelector)
  const [isEdit, setIsEdit] = useRecoilState(isEditCommentSelector(herePath))
  const [comment, setComment] = useRecoilState(commentSelector(herePath))
  const [isHover, setIsHover] = useRecoilState(isHoverSelector(herePath))
  const setSelectingRow = useSetRecoilState(selectingRowState)
  const [focusRow, setFocusRow] = useRecoilState(focusRowState)
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
    const { err, res: newDirCmtList } = fixedComment(
      comment,
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
  const handleKeyPressCommentFixed: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key == 'Enter') {
      const { err, res: newDirCmtList } = fixedComment(
        comment,
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
    setFocusRow(herePath)
  }

  useEffect(() => {
    setComment(nowComment)
  }, [])

  useEffect(() => {
    if (inputRef && inputRef.current) inputRef.current.focus()
  })

  useEffect(() => {
    setHerePath(path + name + '/')
    setComment(nowComment)
  }, [name, nowComment, path, setComment])

  return (
    <div
      className={`flex h-8 w-full items-center whitespace-nowrap rounded-r-md ${
        herePath === focusRow
          ? 'border-[1px] border-l-0 border-orange-300 py-0 pr-0'
          : isHover
          ? 'bg-gray-100 py-px pr-px'
          : ' py-px pr-px '
      }`}
      onKeyDown={handleKeyPressEdit}
      tabIndex={-1}
      onFocus={handleFocusRow}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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

export const DirListColCommentEdit: React.FC = () => {
  return (
    <div
      className="flex h-8 w-full items-center whitespace-nowrap rounded-r-md py-px pr-px hover:bg-orange-100"
      tabIndex={-1}
    >
      <span className="min-w-0 pl-[5px]"></span>
    </div>
  )
}
