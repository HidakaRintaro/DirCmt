import { atomFamily } from 'recoil'

export const isEditState = atomFamily<boolean, string>({
  key: 'uiDirList/isEditState',
  default: false,
})
