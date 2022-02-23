import { atom } from 'recoil'

export const selectingRowState = atom<string>({
  key: 'uiDirList/selectingRowState',
  default: './',
})
