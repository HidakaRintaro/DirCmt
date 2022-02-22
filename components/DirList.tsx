import {
  Divider,
  SplitPane,
  SplitPaneLeft,
  SplitPaneRight,
} from 'components/SplitPane'
import { DirListCol } from 'components/DirListCol'
import { useRecoilValue } from 'recoil'
import { dirCmtState } from 'store/atoms/dirCmtAtom'

export const DirList: React.FC = () => {
  const dirCmtList = useRecoilValue(dirCmtState)
  return (
    <SplitPane>
      <SplitPaneLeft>
        {dirCmtList.map((dirCmt, index) => (
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
        {dirCmtList.map((dirCmt, index) => (
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
