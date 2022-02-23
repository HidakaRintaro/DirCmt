import { DirCmt } from 'types/dirCmt'

export const addDirCmt = (
  selectingRow: string,
  dirCmtList: DirCmt[],
  type: 'file' | 'directory',
) => {
  const pathAry = selectingRow.split('/')
  pathAry.shift() // 先頭パスの . を削除
  pathAry.pop() // 末尾の空文字を削除
  insertDirCmt(dirCmtList, pathAry, type)
}

const insertDirCmt = (
  dirCmtList: DirCmt[],
  pathAry: string[],
  type: 'file' | 'directory',
) => {
  if (pathAry.length === 0) {
    dirCmtList.unshift({ name: '', type: type })
  }
  const path = pathAry.shift()
  const dirCmt = dirCmtList.find((dirCmt) => dirCmt.name === path)
  if (dirCmt) {
    dirCmt.children = dirCmt.children ?? []
    insertDirCmt(dirCmt.children, pathAry, type)
  }
}
