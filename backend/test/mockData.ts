// stored tomorrow's date in a variable
const tomorrow: Date = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

export const validTask = {
  title: 'Running',
  date: tomorrow
}
export const TaskMissingTaskName = {
  title: '',
  date: new Date('2015-12-15')
}
export const TaskWithWrongDate = {
  title: 'write job description',
  date: new Date('2015-12-15')
}
export const TaskMissingDate = {
  title: 'write job description',
  date: ''
}
export const TaskWithWrongDataType = {
  title: 12,
  date: 'ehw'
}
export const TaskUpdateData = {
  title: 'write job description',
  date: tomorrow
}
