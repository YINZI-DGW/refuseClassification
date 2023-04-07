function formateDate(datetime, type = 's') {
    function addDateZero(num) {
        return (num < 10 ? "0" + num : num);
    }
    let d = new Date(datetime);
    console.log(d)
    let formatdatetime;
    if (type == 's') {
        formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
    } else if (type == 'd') {
        formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate());
    }
    return formatdatetime;
  }
  function FormatData(data, obj) {
    let val = data
    if (Array.isArray(val)) {
      val.forEach(info => {
        Object.entries(obj).forEach(item => {
          if (item[1] === '' || item[1] === null || item[1] === undefined) {
            return;
          }
          let format = item[1].split('|')
          format.forEach(k => {
            if (k == 'json') {
              info[item[0]] = JSON.parse(info[item[0]])
            } else if (k == 'date') {
              info[item[0]] = formateDate(info[item[0]])
            } else if (k == 'time') {
              info[item[0]] = formateDate(info[item[0]], 'd')
            }
          })
        })
      })
    } else {
      Object.entries(obj).forEach(item => {
        if (item[1] === '' || item[1] === null || item[1] === undefined) {
          return;
        }
        let format = item[1].split('|')
        format.forEach(k => {
          if (k == 'json') {
            console.log(val, val[item[0]])
            val[item[0]] = JSON.parse(val[item[0]])
          } else if (k == 'date') {
            val[item[0]] = formateDate(val[item[0]])
          } else if (k == 'time') {
            val[item[0]] = formateDate(val[item[0]], 'd')
          }
        })
      })
    }
    return val
  }
  
  exports.FormatData = FormatData;