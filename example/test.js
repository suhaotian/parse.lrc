var parseLrc = require('../');
var fs = require('fs');
var lrc = fs.readFileSync('example/pfzl.lrc','utf-8')
var lrcData = parseLrc(lrc);
if(lrcData){
  console.log(lrcData.lrcInfo,lrcData.lrcArray);
}else{
  console.log('不是合法的 lrc 文件！');
}