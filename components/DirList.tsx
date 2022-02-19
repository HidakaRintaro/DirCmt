import { dirCmtJson } from 'utils/mock/dirCmtJson'
import { Divider, SplitPaneLeft, SplitPaneRight } from 'components/SplitPane'
import { DirListCol } from 'components/DirListCol'

export const DirList: React.FC = () => {
  // TODO: 仮データ、後データ
  const data = dirCmtJson
  return (
    <div className="flex h-full w-full">
      <SplitPaneLeft>
        {dirCmtJson.map((dirCmt, index) => (
          <DirListCol
            key={index}
            type="name"
            data={dirCmt}
            depth={0}
            path="./"
          />
        ))}
      </SplitPaneLeft>
      <Divider />
      <SplitPaneRight>
        {dirCmtJson.map((dirCmt, index) => (
          <DirListCol
            key={index}
            type="comment"
            data={dirCmt}
            depth={0}
            path="./"
          />
        ))}
      </SplitPaneRight>
    </div>
  )
}
