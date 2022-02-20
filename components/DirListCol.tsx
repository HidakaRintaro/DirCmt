import { ChevronIcon } from 'icons/ChevronIcon'
import { FileIcon } from 'icons/FileIcon'
import { FolderIcon } from 'icons/FolderIcon'
import { KeyboardEventHandler, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { commentState } from 'store/atoms/uiDirList/commentAtom'
import { isEditState } from 'store/atoms/uiDirList/isEditAtom'
import { isOpenState } from 'store/atoms/uiDirList/isOpenAtom'
import { nameState } from 'store/atoms/uiDirList/nameAtom'
import { DirCmt } from 'types/dirCmt'

interface DirListColNameProps {
  type: 'file' | 'directory'
  name: string
  depth: number
  path: string
}

interface DirListColCommentProps {
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
  const [isOpen, setIsOpen] = useRecoilState(isOpenState(path))
  const [isEdit, setIsEdit] = useRecoilState(isEditState('name:' + path))
  const [name, setName] = useRecoilState(nameState(path))

  const handleKeyPressEdit: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== 'Enter') return
    console.log('enter down')
    setIsEdit(true)
  }

  useEffect(() => {
    setName(nowName)
  })

  return (
    <div
      className="flex h-8 w-full items-center gap-[2px] rounded-l-md pl-1 hover:bg-orange-100"
      onKeyDown={handleKeyPressEdit}
      tabIndex={-1}
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
          />
        ) : (
          <span className="pl-[5px]" /*onDoubleClick={() => setIsEdit(true)}*/>
            {name}
          </span>
        )}
      </div>
    </div>
  )
}

const DirListColComment: React.FC<DirListColCommentProps> = (props) => {
  const { comment: nowComment, path } = props
  const [isEdit, setIsEdit] = useRecoilState(isEditState('comment:' + path))
  const [comment, setComment] = useRecoilState(commentState(path))

  const handleKeyPressEdit: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== 'Enter') return
    console.log('enter down')
    setIsEdit(true)
  }

  useEffect(() => {
    setComment(nowComment)
  })
  return (
    <div
      className="flex h-8 w-full items-center whitespace-nowrap rounded-r-md px-2 hover:bg-orange-100"
      onKeyDown={handleKeyPressEdit}
      tabIndex={-1}
    >
      {isEdit ? (
        <input
          // onKeyPress={() => setIsEdit(false)}
          value={comment}
          className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
        />
      ) : (
        <span
          className="min-w-0 pl-[5px]" /*onDoubleClick={() => setIsEdit(true)}*/
        >
          {comment}
        </span>
      )}
    </div>
  )
}

export const DirListCol: React.FC<DirListColProps> = (props) => {
  const { type, data, path, depth } = props
  const herePath = path + data.name + '/'
  const isOpen = useRecoilValue(isOpenState(herePath))
  return (
    <>
      {type === 'name' ? (
        <DirListColName
          name={data.name}
          type={data.type}
          depth={depth}
          path={herePath}
        />
      ) : (
        <DirListColComment comment={data.comment ?? ''} path={herePath} />
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
                path={herePath + child.name + '/'}
              />
            ) : (
              <DirListColComment
                key={index}
                comment={child.comment ?? ''}
                path={herePath + child.name + '/'}
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
