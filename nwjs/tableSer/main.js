var http = require('http');
var url = require('url');
// 创建服务器
http.createServer( function (incomingMessage, response) {  
   // 解析请求，包括文件名
   	//this.pathname = url.parse(incomingMessage.url).pathname;
	//log("./tableSer"+this.pathname);
    new reqHandle(incomingMessage, response);

}).listen(8080);

