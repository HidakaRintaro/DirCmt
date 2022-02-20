import { atomFamily } from 'recoil'

export const isOpenState = atomFamily<boolean, string>({
  key: 'uiDirList/isOpenState',
  default: false,
})
