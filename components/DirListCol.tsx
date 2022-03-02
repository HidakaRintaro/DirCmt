import { useRecoilValue } from 'recoil'
import { newRowState } from 'store/atoms/uiDirList/newRowAtom'
import { isOpenSelector } from 'store/selectors/uiDirList/isOpenSelector'
import { DirCmt } from 'types/dirCmt'
import {
  DirListColComment,
  DirListColCommentEdit,
} from 'components/DirListColComment'
import { DirListColName, DirListColNameEdit } from 'components/DirListColName'

interface DirListColProps {
  type: 'name' | 'comment'
  data: DirCmt
  depth: number
  path: string
}

export const DirListCol: React.FC<DirListColProps> = (props) => {
  const { type, data, path, depth } = props
  const herePath = path + data.name + '/'
  const isOpen = useRecoilValue(isOpenSelector(herePath))
  const newRow = useRecoilValue(newRowState)

  return (
    <>
      {type === 'name' ? (
        <DirListColName
          name={data.name}
          type={data.type}
          depth={depth}
          path={path}
        />
      ) : (
        <DirListColComment
          type={data.type}
          name={data.name}
          comment={data.comment ?? ''}
          path={path}
        />
      )}
      {newRow.isShow &&
        newRow.selectingRow === herePath &&
        newRow.type &&
        (type === 'name' ? (
          <DirListColNameEdit
            type={newRow.type}
            depth={depth + 1}
            path={herePath}
          />
        ) : (
          <DirListColCommentEdit />
        ))}
      {isOpen &&
        (data.children ?? []).map((child, index) => {
          return child.type === 'file' ? (
            type === 'name' ? (
              <DirListColName
                key={index}
                name={child.name}
                type={child.type}
                depth={depth + 1}
                path={herePath}
              />
            ) : (
              <DirListColComment
                type={child.type}
                name={child.name}
                key={index}
                comment={child.comment ?? ''}
                path={herePath}
              />
            )
          ) : (
            <DirListCol
              key={index}
              type={type}
              data={child}
              depth={depth + 1}
              path={herePath}
            />
          )
        })}
    </>
  )
}
