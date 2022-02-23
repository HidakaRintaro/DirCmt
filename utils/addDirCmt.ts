import { DirCmt } from 'types/dirCmt'

export const addDirCmt = (
  selectingRow: string,
  dirCmtList: DirCmt[],
  type: 'file' | 'directory',
): DirCmt[] => {
  const pathAry = selectingRow.split('/')
  pathAry.shift() // 先頭パスの . を削除
  pathAry.pop() // 末尾の空文字を削除
  return insertDirCmt(dirCmtList, pathAry, type)
}

const insertDirCmt = (
  dirCmtList: DirCmt[],
  pathAry: string[],
  type: 'file' | 'directory',
): DirCmt[] => {
  if (pathAry.length === 0) {
    dirCmtList.unshift({ name: '', type: type })
    return dirCmtList
  }

  dirCmtList.forEach((dirCmt) => {
    dirCmt.children = dirCmt.children ?? []
    if (dirCmt.name === pathAry.shift()) {
      return insertDirCmt(dirCmt.children, pathAry, type)
    }
  })
  return []
}
