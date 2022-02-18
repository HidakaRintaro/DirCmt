import { ChevronIcon } from 'icons/ChevronIcon'
import { FileIcon } from 'icons/FileIcon'
import { FolderIcon } from 'icons/FolderIcon'
import { useState } from 'react'
import { DirCmt } from 'types/dirCmt'

interface DirTdCommentProps {
  comment: string
}

interface DirTableRowProps {
  row: DirCmt
  depth: number
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

  const [fileName, setFileName] = useState(false)
  return (
    <>
      <tr className={`even:bg-orange-100`}>
        <td className="h-8 w-40 rounded-l-md border-r-2 border-gray-200 pl-1">
          <div className="flex items-center gap-[2px]">
            <span style={{ width: 12 * depth + 'px' }}></span>
            <span
              className="cursor-pointer rounded-sm p-1 hover:bg-gray-300"
              onClick={() => setOpened(!opened)}
            >
              <ChevronIcon
                className={`h-3 w-3 stroke-black stroke-2 text-center ${
                  opened ? 'origin-center rotate-90' : ''
                }`}
              />
            </span>
            <span>
              <FolderIcon className="h-5 w-5 stroke-black stroke-2" />
            </span>
            <div>
              {fileName ? (
                <input
                  onKeyPress={() => setFileName(false)}
                  value={row.name}
                  className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
                ></input>
              ) : (
                <span
                  className="pl-[5px]"
                  onDoubleClick={() => setFileName(true)}
                >
                  {row.name}
                </span>
              )}
            </div>
          </div>
        </td>
        <DirTdComment comment={row.comment ?? ''} />
      </tr>
      {opened &&
        (row.children ?? []).map((child) => {
          if (child.type === 'file') {
            return (
              <tr className="even:bg-orange-100">
                <td className="h-8 w-40 rounded-l-md border-r-2 border-gray-200 pl-1">
                  <div className="flex items-center gap-[2px]">
                    <span className="w-5"></span>
                    <span style={{ width: 12 * (depth + 1) + 'px' }}></span>
                    <span>
                      <FileIcon className="h-5 w-5 stroke-black stroke-2" />
                    </span>
                    <div>
                      {fileName ? (
                        <input
                          onKeyPress={() => setFileName(false)}
                          value={child.name}
                          className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
                        ></input>
                      ) : (
                        <span
                          className="pl-[5px]"
                          onDoubleClick={() => setFileName(true)}
                        >
                          {child.name}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
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
