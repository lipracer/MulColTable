
var http = require('http');
var fs = require("fs") ;
var querystring = require('querystring');

 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';  
  
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    //body = querystring.parse(body);
    // 设置响应头部信息及编码

    //
    var fileName = this.connection.remoteAddress.replace(/^.*:/, 'ip') + "-" + getTime();
    //document.write(fileName);
    document.getElementById("reqList").innerHTML = document.getElementById("reqList").innerHTML + "<li>" + body + "</li>";
    //fs.writeFile('./mySer/'+fileName+".log", body, function (err) {
    //});
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 

    res.end();
  });
}).listen(9999);

function getTime()
{
  var myDate = new Date();
  return ( 
  myDate.getFullYear() + '-' 
  + (myDate.getMonth()+1) + '-'
  + myDate.getDate() + '-'
  + myDate.getHours() + '-' 
  + myDate.getMinutes() + '-'
  + myDate.getSeconds() + '-'
  + myDate.getMilliseconds())
}