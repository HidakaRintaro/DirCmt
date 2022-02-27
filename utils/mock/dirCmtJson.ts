import { DirCmt } from 'types/dirCmt'

export const dirCmtJson: DirCmt[] = [
  {
    name: 'project',
    type: 'directory',
    comment:
      '仮のプロジェクトディレクトリのトップ.仮のプロジェクトディレクトリのトップ.仮のプロジェクトディレクトリのトップ.仮のプロジェクトディレクトリのトップ.仮のプロジェクトディレクトリのトップ.',
    children: [
      {
        name: 'app',
        type: 'directory',
      },
      {
        name: 'src',
        type: 'directory',
        comment: 'ビジネスロジック',
        children: [
          {
            name: 'index.js',
            type: 'file',
            comment: 'index file',
          },
          {
            name: 'samples',
            type: 'directory',
            children: [
              {
                name: 'test1.js',
                type: 'file',
                comment: 'testの1回目のファイル',
              },
            ],
          },
          {
            name: 'api',
            type: 'directory',
            comment: 'apiをまとめたフォルダ',
            children: [
              {
                name: 'index.js',
                type: 'file',
              },
              {
                name: 'hello.js',
                type: 'file',
                comment: 'デフォルトファイル',
              },
            ],
          },
        ],
      },
      {
        name: 'config.js',
        type: 'file',
        comment: '設定ファイル',
      },
      {
        name: 'README.md',
        type: 'file',
      },
    ],
  },
  {
    name: 'sample.txt',
    type: 'file',
    comment: 'test file',
  },
]
