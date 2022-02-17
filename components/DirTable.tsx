import { DirTableRow } from 'components/DirTableRow'
import { dirCmtJson } from 'utils/mock/dirCmtJson'

export const DirTable: React.FC = () => {
  // TODO: 仮データ、後データ
  const data = dirCmtJson
  return (
    <table className="w-full">
      <DirTableRow
        row={{ name: 'root', type: 'directory', children: dirCmtJson }}
        depth={0}
      />
    </table>
  )
}
