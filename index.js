const http=require('http');
server=http.createServer((req,res)=>{
    // console.log('Server is now running');
    res.writeHead(200,{"content-type":"text/html"})
    res.end("<h1>Welcome to the bicycle project</h1>")
});

server.listen(3000);