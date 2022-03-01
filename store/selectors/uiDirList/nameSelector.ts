import { selectorFamily } from 'recoil'
import { rowState } from 'store/atoms/uiDirList/rowAtom'

export const nameSelector = selectorFamily<string, string>({
  key: 'uiDirList/nameSelector',
  get:
    (param) =>
    ({ get }) =>
      get(rowState(param)).name,
  set:
    (param) =>
    ({ get, set }, newValue) => {
      const row = get(rowState(param))
      set(rowState(param), {
        ...row,
        name: newValue as string,
      })
    },
})
