import { atomFamily } from 'recoil'

interface Option {
  name: string
  comment: string
  isEditName: boolean
  isEditComment: boolean
  isOpen: boolean
}

export const rowState = atomFamily<Option, string>({
  key: 'uiDirList/rowState',
  default: {
    name: '',
    comment: '',
    isEditName: false,
    isEditComment: false,
    isOpen: false,
  },
})
