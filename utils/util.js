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

module.exports = {
  convertStarsNumberToArray: convertStarsNumberToArray
}