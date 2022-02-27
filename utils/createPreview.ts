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
    rootDirCmtList.forEach((dirCmt) => {
      const childrenPreview = createPreviewRow(dirCmt, 0, nameLength)
      preview += '\n' + childrenPreview
    })
  }

  return preview
}

const createPreviewRow = (
  dirCmt: DirCmt,
  depth: number,
  nameLength: number,
): string => {
  let preview = ''
  for (let i = 0; i < depth; i++) {
    preview += '│   '
  }

  preview += '├── ' + dirCmt.name

  if (dirCmt.comment) {
    preview += '  ----- ' + dirCmt.comment
  }

  if (dirCmt.children !== undefined) {
    const childrenNameLength = maxNameLength(dirCmt.children)

    dirCmt.children.forEach((childrenDirCmt) => {
      const childrenPreview = createPreviewRow(
        childrenDirCmt,
        depth + 1,
        childrenNameLength,
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
