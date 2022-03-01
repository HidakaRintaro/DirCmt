import { selectorFamily } from 'recoil'
import { rowState } from 'store/atoms/uiDirList/rowAtom'

export const isEditNameSelector = selectorFamily<boolean, string>({
  key: 'uiDirList/isEditNameSelector',
  get:
    (param) =>
    ({ get }) =>
      get(rowState(param)).isEditName,
  set:
    (param) =>
    ({ get, set }, newValue) => {
      const row = get(rowState(param))
      set(rowState(param), {
        ...row,
        isEditName: newValue as boolean,
      })
    },
})
