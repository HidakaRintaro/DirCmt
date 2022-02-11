import { ChevronIcon } from 'icons/ChevronIcon'
import { FileIcon } from 'icons/FileIcon'

export const DirTable: React.FC = () => {
  let ary = []
  for (let i = 1; i < 100; i++) {
    ary.push({ id: i, name: '' })
  }
  return (
    <table className="w-full">
      {ary.map((a) => (
        <tr key={a.id} className="even:bg-orange-100">
          <td className="flex h-8 items-center gap-[2px] rounded-l-md pl-1">
            <span>
              <ChevronIcon className="h-3 w-3 stroke-black stroke-2" />
            </span>
            <span>
              <FileIcon className="h-5 w-5 stroke-black stroke-2" />
            </span>
            {a.id}
          </td>
          <td className="rounded-r-md">{a.id}</td>
        </tr>
      ))}
    </table>
  )
}
