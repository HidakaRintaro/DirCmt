import { dirCmtJson } from 'utils/mock/dirCmtJson'
import {
  Divider,
  SplitPane,
  SplitPaneLeft,
  SplitPaneRight,
} from 'components/SplitPane'
import { DirListCol } from 'components/DirListCol'

export const DirList: React.FC = () => {
  // TODO: 仮データ、後データ
  const data = dirCmtJson
  return (
    <SplitPane>
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
    </SplitPane>
  )
}
