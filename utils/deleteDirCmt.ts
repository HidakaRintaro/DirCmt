import { DirCmt } from 'types/dirCmt'

export const deleteDirCmt = (
  focusRow: string,
  dirCmtList: DirCmt[],
): DirCmt[] => {
  const pathAry = focusRow.split('/')
  pathAry.shift()
  pathAry.pop()
  return searchDirCmt(dirCmtList, pathAry)
}

const searchDirCmt = (dirCmtList: DirCmt[], pathAry: string[]) => {
  if (pathAry.length === 1) {
    return dirCmtList.filter((dirCmt) => dirCmt.name !== pathAry[0])
  }

  const path = pathAry.shift()
  const dirCmt = dirCmtList.find((dirCmt) => dirCmt.name === path)
  if (dirCmt) {
    const newChildren = searchDirCmt(dirCmt.children ?? [], pathAry)
    dirCmt.children = newChildren
  }
  return dirCmtList
}
