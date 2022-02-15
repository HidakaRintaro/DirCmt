import { atom } from 'recoil'

export const copyButtonState = atom<boolean>({
  key: 'copyButtonState',
  default: false,
})
