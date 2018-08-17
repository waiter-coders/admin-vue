// 通过配置文件，装在对应vue组件的工具类

export const formConfig = {
  string: 'admin-input',
  select: 'admin-select',
  multiSelect: 'check-box',
  undefined: 'admin-input',
  datetime: 'datetime',
  html: 'editor',
  date: 'datetime'
}
//datetime的类型选择year/month/date/week/ datetime/datetimerange/daterange
export const timeFormat = {
  year: 'yyyy',
  month: 'MM',
  date: 'yyyy-MM-dd',
  week: 'WW',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  timestamp: 'timestamp',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

export const initFormData = (key, value) => {
  var model = {}
  model[key] = value || ''
  return model
}
