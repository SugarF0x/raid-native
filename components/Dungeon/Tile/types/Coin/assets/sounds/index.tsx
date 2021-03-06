import { FileType } from '@definitions'

const collect: FileType[] = [
  require('./collect/0.mp3'),
  require('./collect/1.mp3'),
  require('./collect/2.mp3'),
]

const select: FileType[] = [
  require('./select/0.mp3'),
  require('./select/1.mp3'),
  require('./select/2.mp3'),
]

export default {
  collect,
  select
}
