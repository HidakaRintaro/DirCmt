import { ChevronIcon } from 'icons/ChevronIcon'
import { FileIcon } from 'icons/FileIcon'
import { useState } from 'react'

export const DirTable: React.FC = () => {
  // TODO: 仮データ、後データ
  let ary = []
  for (let i = 1; i < 100; i++) {
    ary.push({ id: i, name: '' })
  }
  const [check, setCheck] = useState(false)
  const [fileName, setFileName] = useState(false)
  const [comment, setComment] = useState(false)
  return (
    <table className="w-full">
      {ary.map((a) => (
        <tr key={a.id} className="even:bg-orange-100">
          <td className="h-8 w-40 rounded-l-md border-r-2 border-gray-200 pl-1">
            <div className="flex items-center gap-[2px]">
              <span
                className="cursor-pointer rounded-sm p-1 hover:bg-gray-300"
                onClick={() => setCheck(!check)}
              >
                <ChevronIcon
                  className={`h-3 w-3 stroke-black stroke-2 text-center ${
                    check ? 'origin-center rotate-90' : ''
                  }`}
                />
              </span>
              <span>
                <FileIcon className="h-5 w-5 stroke-black stroke-2" />
              </span>
              <div>
                {fileName ? (
                  <input
                    onKeyPress={() => setFileName(false)}
                    value={a.id}
                    className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
                  ></input>
                ) : (
                  <span
                    className="pl-[5px]"
                    onDoubleClick={() => setFileName(true)}
                  >
                    {a.id}
                  </span>
                )}
              </div>
            </div>
          </td>
          <td className="rounded-r-md px-2">
            {comment ? (
              <input
                onKeyPress={() => setComment(false)}
                value={a.id}
                className="w-full rounded border-[1px] border-orange-300 px-1 outline-none"
              ></input>
            ) : (
              <span className="pl-[5px]" onDoubleClick={() => setComment(true)}>
                {a.id}
              </span>
            )}
          </td>
        </tr>
      ))}
    </table>
  )
}
