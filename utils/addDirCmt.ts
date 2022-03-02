import { DirCmt } from 'types/dirCmt'

export const addDirCmt = (
  selectingRow: string,
  dirCmtList: DirCmt[],
  dirCmt: DirCmt,
) => {
  const pathAry = selectingRow.split('/')
  pathAry.shift() // 先頭パスの . を削除
  pathAry.pop() // 末尾の空文字を削除
  insertDirCmt(dirCmtList, dirCmt, pathAry)
}

const insertDirCmt = (
  dirCmtList: DirCmt[],
  addDirCmt: DirCmt,
  pathAry: string[],
) => {
  if (pathAry.length === 0) {
    dirCmtList.push(addDirCmt)
  }
  const path = pathAry.shift()
  const dirCmt = dirCmtList.find((dirCmt) => dirCmt.name === path)
  if (dirCmt) {
    dirCmt.children = dirCmt.children ?? []
    insertDirCmt(dirCmt.children, addDirCmt, pathAry)
  }
}
