import { selectorFamily } from 'recoil'
import { rowState } from 'store/atoms/uiDirList/rowAtom'

export const isEditCommentSelector = selectorFamily<boolean, string>({
  key: 'uiDirList/isEditCommentSelector',
  get:
    (param) =>
    ({ get }) =>
      get(rowState(param)).isEditComment,
  set:
    (param) =>
    ({ get, set }, newValue) => {
      const row = get(rowState(param))
      set(rowState(param), {
        ...row,
        isEditComment: newValue as boolean,
      })
    },
})
