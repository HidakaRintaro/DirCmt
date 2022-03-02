import { atom } from 'recoil'

export const focusRowState = atom<{ path: string; side: 'name' | 'comment' }>({
  key: 'uiDirList/focusRowState',
  default: { path: './', side: 'name' },
})
