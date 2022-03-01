import { selectorFamily } from 'recoil'
import { rowState } from 'store/atoms/uiDirList/rowAtom'

export const isOpenSelector = selectorFamily<boolean, string>({
  key: 'uiDirList/isOpenSelector',
  get:
    (param) =>
    ({ get }) =>
      get(rowState(param)).isOpen,
  set:
    (param) =>
    ({ get, set }, newValue) => {
      const row = get(rowState(param))
      set(rowState(param), {
        ...row,
        isOpen: newValue as boolean,
      })
    },
})
