import { DirCmt } from 'types/dirCmt'

export const fixedComment = (
  comment: string,
  dirCmtList: DirCmt[],
  selectingRow: string,
): { err: null | string; res: DirCmt[] | null } => {
  const pathAry = selectingRow.split('/')
  pathAry.shift() // 先頭パスの . を削除
  pathAry.pop() // 末尾の空文字を削除

  const dirCmt = insertDirCmt(dirCmtList, pathAry)
  if (!dirCmt) {
    return { err: 'エラーが発生しました', res: null }
  }
  dirCmt.comment = comment
  return { err: null, res: dirCmtList }
}

const insertDirCmt = (
  dirCmtList: DirCmt[],
  pathAry: string[],
): DirCmt | null => {
  const path = pathAry.shift()
  const dirCmt = dirCmtList.find((dirCmt) => dirCmt.name === path)
  if (dirCmt) {
    if (pathAry.length === 0) return dirCmt
    return insertDirCmt(dirCmt.children ?? [], pathAry)
  }
  return null
}
