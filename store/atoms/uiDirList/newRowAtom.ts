import { atom } from 'recoil'

export const newRowState = atom<{
  isShow: boolean
  type: 'file' | 'directory'
  selectingRow: string
}>({
  key: 'uiDirList/newRowState',
  default: { isShow: false, type: 'file', selectingRow: './' },
})
