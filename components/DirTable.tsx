interface DirTableProps {
  dirJson: object
}

export const DirTable: React.FC = () => {
  let ary = []
  for (let i = 1; i < 100; i++) {
    ary.push({ id: i, name: '' })
  }
  return (
    <table className="w-full">
      {ary.map((a) => (
        <tr key={a.id} className="even:bg-orange-100">
          <td className="h-8 rounded-l-md">{a.id}</td>
          <td className="rounded-r-md">{a.id}</td>
        </tr>
      ))}
    </table>
  )
}
