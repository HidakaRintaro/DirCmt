import { atom } from 'recoil'
import { DirCmt } from 'types/dirCmt'

export const dirCmtState = atom<DirCmt[]>({
  key: 'dirCmtState',
  default: [],
})
