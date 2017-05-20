var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((req,res)=>{
	var myUrl = url.parse(req.url);
	if(myUrl.pathname !='/favicon.ico'){
		if(req.method == "GET"){
			if(myUrl.pathname == '/login'){
				fs.readFile('./login.html',(err,data)=>{
					res.writeHead(200,{'Content-type':'text/html',

						'Access-Control-Allow-Origin':'*'
				});
					res.end(data)
				})
			}else{
					res.writeHead(404,{'Content-type':'text/html'});
					res.end('this is bug')
			}

		}else if(req.method == 'POST'){
			if(myUrl.pathname == '/login'){
				var result = '';
				req.on('data',(chuck)=>{
					result += chuck
				});
				req.on('end',()=>{ 
					res.writeHead(200,{'Content-type':'text/html'});
					res.end(result)
				})
			}else{   
					res.writeHead(404,{'Content-type':'text/html'});
					res.end('this is bug')
			}
		}
	}



}).listen(3006,()=>{
	console.log('this is 3006')
})