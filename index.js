const http=require('http');
const url=require('url')
server=http.createServer((req,res)=>{

    console.log(req.headers);
    const myUrl= new URL(req.url,`http://$req.headers.host/`);
    const pathname=myUrl.pathname;
    const id=myUrl.searchParams.get('id')
    console.log(pathname,id);

    res.writeHead(200,{"content-type":"text/html"})
    res.end("<h1>Welcome to the bicycle project</h1>")
});

server.listen(3000);