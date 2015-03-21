/**
*
* 目前程序只支持 简单LRC格式
* 
* LRC 格式文件知识请查看 http://zh.wikipedia.org/zh-cn/LRC%E6%A0%BC%E5%BC%8F
* 
* 支持 browserify , node 和 browser 环境
* 
* 使用方法可以看 example 
* 
**/




// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.parseLrc = factory();
  }
}(this, function () {
    var parseLrc = function(data, lrcInfoMap){
        var infoRegExp = /\[(\w{2,6}):(.*)\]/;            // match [ti:Beat it]
        var timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2})\]/;  // match [mm:ss.xx] format regExp
        var lrcInfoMap = lrcInfoMap || {};

        var offset = false;
        var lrcArray = [];
        var lrcInfo = [];

        if(!String.prototype.trim){                    //  if not have add the trim method shim
            String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
        }

        var trimData = data.trim();                        //trim the space
        if(!timeRegExp.test(trimData)) {                   // check the file correct
            console.log('加载的不是合法格式的歌词哦');
            return false;  
        }

        var dataLines = trimData.split(/\n/);              //split lrc to lines
        for (var i=0,l=dataLines.length;i<l;i++){
            if(timeRegExp.test(dataLines[i])){
                var expTime = timeRegExp.exec(dataLines[i]);
                var txt = dataLines[i].replace(expTime[0],'').trim();
                // console.log(expTime[1],expTime[2],expTime[3]);
                var timeStamp = expTime[1]*60 + expTime[2]*1 + expTime[3]/100;
                var tsp = parseFloat(offset ? timeStamp - offset : timeStamp).toFixed(2);
                if(!!txt) lrcArray.push({id:'id-'+i,timestamp: tsp<0?0.01:tsp, lyric: txt});
            }else{
                if(infoRegExp.test(dataLines[i])){
                    var expInfo = infoRegExp.exec(dataLines[i]);
                    var preShort = expInfo[1];
                    var preContent = expInfo[2].trim();
                    if(lrcInfoMap.hasOwnProperty(preShort) && !!preContent){
                        preShort = lrcInfoMap[preShort];
                        // console.log(preShort);
                    }
                    var tmpInfo = {};
                    tmpInfo[expInfo[1]] = preShort;
                    tmpInfo.infoValue = preContent;
                    if (preShort === 'offset') {
                        offset = preContent/1000;
                        // console.log('offset :  '+offset+'\n\n\n');
                    };
                    if(!!preContent) lrcInfo.push(tmpInfo);
                }
            }
        }
        return {lrcInfo: lrcInfo,lrcArray: lrcArray};
    };
    return parseLrc;
}));
