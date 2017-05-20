var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring')

http.createServer((req,res)=>{
	var myUrl = url.parse(req.url);
	if(myUrl.pathname !='/favicon.ico'){
		if(req.method == "GET"){
			if(myUrl.pathname == '/login'){
				fs.readFile('./ajax.html',(err,data)=>{
					res.writeHead(200,{'Content-type':'text/html',
						'Access-Control-Allow-Origin':'*'
				})
					res.end(data)
				})
			}else if(myUrl.pathname == '/mylogin'){
				var params = querystring.parse(myUrl.query);
				var sum = {}
				if(params){
					if(params.user == '' && params.pas == '' ){
							sum.code = 0;
							sum.data = 'good'
					}else{
							sum.code = 1;
							sum.data = 'err'
					}
				}else{
						sum.code = 2;
							sum.data = 'no no '
				}
				res.writeHead(200,{'Content-type':'text/html',
					'Access-Control-Allow-Origin':'*'
			});
					res.end(JSON.stringify(sum))
				
			}else{
					res.writeHead(404,{'Content-type':'text/html'});
					res.end('this is bug')
			}

		}else if(req.method == 'POST'){
			if(myUrl.pathname == '/mylogin'){
				var result = '';
				req.on('data',(chuck)=>{
					result += chuck
				});
				req.on('end',()=>{ 
				console.log(result)
					var params = querystring.parse(result);
					let sum = {};
					if(params){
						if(params.user == 'gon' && params.pas == '123'){
							sum.code = 0;
							sum.data = 'success'
						}else{
							sum.code = 1;
							sum.data = 'pass'
						}
					}else{
						sum.code = 2;
							sum.data = 'no no '
					}
					res.writeHead(200,{
		 				"Content-Type":"text/html;charset=utf8",
		 				'Access-Control-Allow-Origin':'*'
		 			});
		 		    res.end(JSON.stringify(sum));
				})
			}
		}
	}



}).listen(8082,()=>{
	console.log('this is 8082')
})