import { DirCmt } from 'types/dirCmt'

export const createPreview = (dirCmtList: DirCmt[], depth: number): string => {
  let preview = '.'
  let rootDirCmtList: DirCmt[] | undefined = dirCmtList
  if (dirCmtList.length === 1) {
    const dirCmt = dirCmtList[0]
    preview = dirCmt.name
    if (dirCmt.comment) {
      preview += '  ----- ' + dirCmt.comment
    }
    rootDirCmtList = dirCmtList[0].children
  }

  if (rootDirCmtList !== undefined) {
    const nameLength = maxNameLength(rootDirCmtList)
    const ListLength = rootDirCmtList.length
    rootDirCmtList.forEach((dirCmt, index) => {
      const childrenPreview = createPreviewRow(
        dirCmt,
        [],
        nameLength,
        ListLength - 1 === index,
      )
      preview += '\n' + childrenPreview
    })
  }

  return preview
}

const createPreviewRow = (
  dirCmt: DirCmt,
  depthList: boolean[],
  nameLength: number,
  isLast: boolean,
): string => {
  let preview = ''
  depthList.forEach((depth) => {
    preview += depth ? '│   ' : '    '
  })

  preview += (isLast ? '└── ' : '├── ') + dirCmt.name

  if (dirCmt.comment) {
    const repeatCnt = nameLength - dirCmt.name.length
    preview += ' '.repeat(repeatCnt) + '  ----- ' + dirCmt.comment
  }

  if (dirCmt.children !== undefined) {
    const childrenNameLength = maxNameLength(dirCmt.children)
    const ListLength = dirCmt.children.length
    dirCmt.children.forEach((childrenDirCmt, index) => {
      const childrenPreview = createPreviewRow(
        childrenDirCmt,
        [...depthList, !isLast],
        childrenNameLength,
        ListLength - 1 === index,
      )
      preview += '\n' + childrenPreview
    })
  }

  return preview
}

const maxNameLength = (dirCmtList: DirCmt[]): number => {
  let maxLength = 0
  dirCmtList.forEach((dirCmt) => {
    if (dirCmt.name.length > maxLength) maxLength = dirCmt.name.length
  })
  return maxLength
}
