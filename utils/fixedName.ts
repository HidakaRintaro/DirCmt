import { DirCmt } from 'types/dirCmt'

export const fixedName = (
  name: string,
  selectingRow: string,
): { err: null | string } => {
  if (name === '') {
    return { err: '名前が入力されていません' }
  }
  // TODO 重複チェック

  return { err: null }
}
