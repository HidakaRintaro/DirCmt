import { atom } from 'recoil'
import { DirCmt } from 'types/dirCmt'
import { dirCmtJson } from 'utils/mock/dirCmtJson'

export const dirCmtState = atom<DirCmt[]>({
  key: 'dirCmtState',
  default: dirCmtJson,
})
