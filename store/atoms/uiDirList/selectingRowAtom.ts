import { atom } from 'recoil'

// 新しいFolderやFileを追加する時用のパスの位置(FolderとFileとで値の保持方法が違う)
export const selectingRowState = atom<string>({
  key: 'uiDirList/selectingRowState',
  default: './',
})
