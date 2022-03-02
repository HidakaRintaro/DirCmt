import { selectorFamily } from 'recoil'
import { rowState } from 'store/atoms/uiDirList/rowAtom'

export const isHoverSelector = selectorFamily<boolean, string>({
  key: 'uiDirList/isHoverSelector',
  get:
    (param) =>
    ({ get }) =>
      get(rowState(param)).isHover,
  set:
    (param) =>
    ({ get, set }, newValue) => {
      const row = get(rowState(param))
      set(rowState(param), {
        ...row,
        isHover: newValue as boolean,
      })
    },
})
