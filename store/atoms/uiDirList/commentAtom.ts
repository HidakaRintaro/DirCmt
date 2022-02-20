import { atomFamily } from 'recoil'

export const commentState = atomFamily<string, string>({
  key: 'uiDirList/commentState',
  default: '',
})
