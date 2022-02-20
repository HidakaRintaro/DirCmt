import { atomFamily } from 'recoil'

export const nameState = atomFamily<string, string>({
  key: 'uiDirList/nameState',
  default: '',
})
