import { DirTableRow } from 'components/DirTableRow'

export const DirTable: React.FC = () => {
  // TODO: 仮データ、後データ
  let ary = []
  for (let i = 1; i < 100; i++) {
    ary.push({ id: i, name: '' })
  }

  return (
    <table className="w-full">
      {ary.map((a) => (
        <DirTableRow key={a.id} rowData={a} />
      ))}
    </table>
  )
}
