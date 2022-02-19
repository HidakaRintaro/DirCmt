import { ChevronIcon } from 'icons/ChevronIcon'
import { FileIcon } from 'icons/FileIcon'
import { FolderIcon } from 'icons/FolderIcon'
import { Dispatch, SetStateAction, useState } from 'react'
import { DirCmt } from 'types/dirCmt'

interface DirTdNameProps {
  type: 'file' | 'directory'
  name: string
  depth: number
  state: [boolean, Dispatch<SetStateAction<boolean>>]
}

interface DirTdCommentProps {
  comment: string
}

interface DirTableRowProps {
  row: DirCmt
  depth: number
}

const DirTdName: React.FC<DirTdNameProps> = ({ type, name, depth, state }) => {
  const [isOpen, setIsOpen] = state
  const [isEditName, setIsEditName] = useState(false)
  return (
    <td className="h-8 w-40 rounded-l-md border-r-2 border-gray-200 pl-1">
      <div className="flex items-center gap-[2px]">
        <span style={{ paddingLeft: 12 * depth + 'px' }}></span>
        {type === 'file' ? (
          <span className="pl-5"></span>
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
        <span>
          {type === 'file' ? (
            <FileIcon className="h-5 w-5 stroke-black stroke-2" />
          ) : (
            <FolderIcon className="h-5 w-5 stroke-black stroke-2" />
          )}
        </span>
        <div>
          {isEditName ? (
            <input
              onKeyPress={() => setIsEditName(false)}
              value={name}
              className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
            ></input>
          ) : (
            <span
              className="pl-[5px]"
              onDoubleClick={() => setIsEditName(true)}
            >
              {name}
            </span>
          )}
        </div>
      </div>
    </td>
  )
}

const DirTdComment: React.FC<DirTdCommentProps> = ({ comment }) => {
  const [isComment, setIsComment] = useState(false)
  return (
    <td className="rounded-r-md px-2">
      {isComment ? (
        <input
          onKeyPress={() => setIsComment(false)}
          value={comment ?? ''}
          className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
        ></input>
      ) : (
        <span className="pl-[5px]" onDoubleClick={() => setIsComment(true)}>
          {comment ?? ''}
        </span>
      )}
    </td>
  )
}

export const DirTableRow: React.FC<DirTableRowProps> = (props) => {
  const { row, depth } = props
  const [opened, setOpened] = useState(false)

  return (
    <>
      <tr className="hover:bg-orange-100">
        <DirTdName
          type="directory"
          name={row.name}
          depth={depth}
          state={[opened, setOpened]}
        />
        <DirTdComment comment={row.comment ?? ''} />
      </tr>
      {opened &&
        (row.children ?? []).map((child) => {
          if (child.type === 'file') {
            return (
              <tr className="hover:bg-orange-100">
                <DirTdName
                  type="file"
                  name={child.name}
                  depth={depth + 1}
                  state={[opened, setOpened]}
                />
                <DirTdComment comment={child.comment ?? ''} />
              </tr>
            )
          } else {
            return <DirTableRow row={child} depth={depth + 1} />
          }
        })}
    </>
  )
}
