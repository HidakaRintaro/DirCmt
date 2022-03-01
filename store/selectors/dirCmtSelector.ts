import { selector } from 'recoil'
import { dirCmtState } from 'store/atoms/dirCmtAtom'
import { DirCmt } from 'types/dirCmt'

export const dirCmtSelector = selector<DirCmt[]>({
  key: 'dirCmtSelector',
  get: ({ get }) => get(dirCmtState),
  set: ({ get, set }, newValue) => {
    set(dirCmtState, newValue)
  },
})
