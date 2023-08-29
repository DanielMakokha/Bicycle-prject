const http=require('http');
const url=require('url')
const fs=require('fs').promises;
server=http.createServer(async(req,res)=>{

    console.log(req.headers);
    const myUrl= new URL(req.url,`http://$req.headers.host/`);
    const pathname=myUrl.pathname;
    const id=myUrl.searchParams.get('id')

    console.log(req.url);
    if (pathname ==='/') {
        const html=await fs.readFile('./view/bicycles.html','utf-8')
        res.writeHead(200,{"content-type":"text/html"})
        res.end(html)
    }else if(pathname==='/bicycle' && id>=0 && id<=5){
        const html=await fs.readFile('./view/overview.html','utf-8');
        res.writeHead(200,{"content-type":"text/html"});
        res.end(html);
    }
    else if (/\.(png)$/i.test(res.url)) {
      const image=await fs.readFile('./public/image/${req.url.slice(1)}') 
      res.writeHead(200,{"content-type":"image/png"})
      res.end(image)
    }
    else{
        res.writeHead(404,{"content-type":"text/html"})
        res.end('<h1>File not found</h1>')
    }

    res.writeHead(200,{"content-type":"text/html"})
});

server.listen(3001);