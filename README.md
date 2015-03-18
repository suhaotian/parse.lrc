# simple parse .lrc file lib 

install :

`npm install parse.lrc`

## support simple format lrc;

just parse .lrc file ,and return ;
a array include timeStamp and lyric line .

work in browser and node .

```js
  var fs = require('fs');
 
 var parseLrc = require('parse.lrc');
 
 var lrcData = fs.readFileSync('somefile.lrc','utf-8');
 
 var lrc = parseLrc(lrcData);
 console.log(lrc);   //output: {lrcInfo:{...},lrcArray{....}}
 ```

 