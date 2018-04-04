

function log(msg){
document.write(msg+"</br>");
}


var http = require('http');
var fs = require('fs');
var url = require('url');

tab = new tableObj();
tab.insert(["n","n","n","n","n","n"]);
tab.setRepairInfo(1, "你大爷还是你大爷");


 
// 创建服务器
http.createServer( function (incomingMessage, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(incomingMessage.url).pathname;
   
   // 输出请求的文件名
   log(pathname);
   log(pathname=="/test");
   if(pathname=="/test")
   {
	    response.writeHead(200, {'Content-Type': 'json'});    
        log("200");
         // 响应文件内容
        //response.write(JSON.stringify(tab.data));    
		response.write("123");  
		log("123");
	    return;
   }

   
   // 从文件系统中读取请求的文件内容
   fs.readFile("./src"+pathname, function (err, data) {
      if (err) {
         log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{             
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});    
         
         // 响应文件内容
         response.write(data.toString());        
      }
      //  发送响应数据
      response.end();
   });   
}).listen(8080);
 
// 控制台会输出以下信息
log('Server running at http://127.0.0.1:8080/');
