import { DirCmt } from 'types/dirCmt'

export const dirCmtSort = (dirCmtList: DirCmt[]) => {
  return dirCmtList.sort((a, b) => {
    const [nameA, nameB] = [a.name.toLowerCase(), b.name.toLowerCase()]

    if (nameA < nameB) return -1
    if (nameA > nameB) return 1

    if (a.type < b.type) return -1
    if (a.type > b.type) return 1

    return 0
  })
}
