function log(msg){
document.write(msg+"</br>");}
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
tab = new tableObj();

function reqHandle(incomingMessage, response)
{
	this.req = incomingMessage;
	this.response = response;
	this.msg = new Array();
	this.msg["GET"] = handleGet;
	this.msg["POST"] = handlePost;
	this.pathname = url.parse(incomingMessage.url).pathname;
	this.msg[incomingMessage.method].call(this);
	
	function handleGet()
	{
		var that = this;
		if(-1 != this.pathname.indexOf("update"))
		{
			this.response.writeHead(200, {'Content-Type': 'text/html'}); 
			this.response.write(JSON.stringify(tab.data)); 
			this.response.end();
			return;
		}
		else{
			fs.readFile("./tableSer"+this.pathname, function (err, data)
			{
				
				if (err) 
				{
					log(err);
					that.response.writeHead(404, {'Content-Type': 'text/html'});
					that.response.end();	
				}
				else
				{      
					that.response.writeHead(200, {'Content-Type': 'text/html'});			
					that.response.write(data.toString()); 				
					that.response.end();				
				}				
			});	
		}
	}
	function handlePost()
	{
		
		var body = "";
		log("on data");
		this.req.on('data', function (chunk) {
			log("on data");
			body += chunk;
		 });
		var that = this;
		this.req.on('end', function () {
			
			log("body:"+body);

			if(-1 != that.pathname.indexOf("PUT"))
			{
				var data = JSON.parse(body);
			    tab.data[data["index"]][5] = data["data"];
			}
			else
			{
				tab.clear();
			    tab.data = JSON.parse(body);
			}
			that.response.writeHead(200, {'Content-Type': 'text/html'}); 
			that.response.write(JSON.stringify(tab.data)); 
			that.response.end();
			/*
			this.response.writeHead(200, {'Content-Type': 'text/html'});
			log("body");
			this.response.write(JSON.stringify("ssss"));
			log("end");
			this.response.end();
			log("end");
			*/
		});
		
		
	}
	
}
