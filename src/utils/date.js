const dateFormatter = {
  toChinese: (dateString, formatter) => {
    let nowDate = new Date()
    let needDate = dateFormatter.getDate(dateString)
    let leaveTime = (nowDate.getTime() - needDate.getTime()) / 1000
    let han = leaveTime > 0 ? '前' : '后'
    leaveTime = Math.abs(leaveTime)
    if (leaveTime < 60) {
      return leaveTime + '秒' + han
    } else if (leaveTime < 3600) {
      return Math.ceil(leaveTime / 60) + '分钟' + han
    } else if (leaveTime < 86400) {
      return Math.ceil(leaveTime / 3600) + '小时' + han
    } else {
      return Math.ceil(leaveTime / 86400) + '天' + han
    }
    // return formatter.replace('%Y', needDate.getFullYear())
    //   .replace('%M', ('00' + needDate.getMonth()).slice(-2))
    //   .replace('%D', ('00' + needDate.getDate()).slice(-2))
  },
  getDate: (dateString) => {
    return new Date(dateString.replace(/-/g, '/'))
  }
}

export default dateFormatter
