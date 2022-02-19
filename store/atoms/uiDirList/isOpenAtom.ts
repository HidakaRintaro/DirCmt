import { atomFamily } from 'recoil'

export const isOpenState = atomFamily<boolean, string>({
  key: 'uiDirList/isOpen',
  default: false,
})
