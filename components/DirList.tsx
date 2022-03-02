import {
  Divider,
  SplitPane,
  SplitPaneLeft,
  SplitPaneRight,
} from 'components/SplitPane'
import { DirListCol } from 'components/DirListCol'
import { useRecoilValue } from 'recoil'
import { dirCmtState } from 'store/atoms/dirCmtAtom'
import { newRowState } from 'store/atoms/uiDirList/newRowAtom'
import { DirListColCommentEdit } from './DirListColComment'
import { DirListColNameEdit } from './DirListColName'

export const DirList: React.FC = () => {
  const dirCmtList = useRecoilValue(dirCmtState)
  const newRow = useRecoilValue(newRowState)

  return (
    <SplitPane>
      <SplitPaneLeft>
        {newRow.isShow && newRow.selectingRow === './' && newRow.type && (
          <DirListColNameEdit type={newRow.type} depth={0} path=":new" />
        )}
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
        {newRow.isShow && newRow.selectingRow === './' && newRow.type && (
          <DirListColCommentEdit />
        )}
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
