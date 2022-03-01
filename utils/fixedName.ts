import { DirCmt } from 'types/dirCmt'

export const fixedName = (
  name: string,
  dirCmtList: DirCmt[],
  selectingRow: string,
): { err: null | string; res: DirCmt[] | null } => {
  const pathAry = selectingRow.split('/')
  pathAry.shift() // 先頭パスの . を削除
  pathAry.pop() // 末尾の空文字を削除
  if (name === '') {
    return { err: '名前が入力されていません', res: null }
  }
  if (
    duplicateCheck(dirCmtList, [...pathAry.slice(0, pathAry.length - 1), name])
  ) {
    return { err: '名前が重複しています', res: null }
  }

  const dirCmt = insertDirCmt(dirCmtList, pathAry)
  if (!dirCmt) {
    return { err: 'エラーが発生しました', res: null }
  }
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

const duplicateCheck = (dirCmtList: DirCmt[], pathAry: string[]): boolean => {
  if (pathAry.length === 0) return true
  const path = pathAry.shift()
  const dirCmt = dirCmtList.find((dirCmt) => dirCmt.name === path)
  if (dirCmt) {
    return duplicateCheck(dirCmt.children ?? [], pathAry)
  } else {
    return false
  }
}
