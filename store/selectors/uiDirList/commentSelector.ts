import { selectorFamily } from 'recoil'
import { rowState } from 'store/atoms/uiDirList/rowAtom'

export const commentSelector = selectorFamily<string, string>({
  key: 'uiDirList/commentSelector',
  get:
    (param) =>
    ({ get }) =>
      get(rowState(param)).comment,
  set:
    (param) =>
    ({ get, set }, newValue) => {
      const row = get(rowState(param))
      set(rowState(param), {
        ...row,
        comment: newValue as string,
      })
    },
})
