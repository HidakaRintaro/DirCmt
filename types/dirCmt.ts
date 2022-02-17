export interface DirCmt {
  name: string
  type: 'file' | 'directory'
  comment?: string
  children?: DirCmt[]
}
