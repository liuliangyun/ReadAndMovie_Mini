function convertStarsNumberToArray(number) {
  var array = [];
  var firstNumber = number.toString().substring(0, 1);
  for(let i = 1; i <= 5; i++) {
    if(i <= firstNumber) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url, callBack) {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      // 把header请求改成  header: { 'content-type': 'application/xml' }就可以了。额。。。明明获取的数据就是json，。。。可能是小程序后台对header做了限制。
      'Content-Type': 'application/xml'
    },
    success: (res) => {
      callBack(res.data);
    },
    fail: (error) => {
    }
  })
}

function convertToCastString(casts) {
  var castsJoin = "";
  for(var index in casts) {
    castsJoin = castsJoin + casts[index].name + " / ";
  }
  return castsJoin.substring(0, castsJoin.length - 2);
}

function convertToCastInfo(casts) {
  var castsArray = [];
  for(var index in casts) {
    var cast = {
      img: casts[index].avatars ? casts[index].avatars.large : "",
      name: casts[index].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertStarsNumberToArray: convertStarsNumberToArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfo: convertToCastInfo
}