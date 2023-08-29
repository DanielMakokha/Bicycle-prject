const http=require('http');
const url=require('url')
const fs=require('fs').promises;
const bicycles=require('./data/data.json')
console.log(bicycles);

server=http.createServer(async(req,res)=>{

    // console.log(req.headers);
    const myUrl= new URL(req.url,`http://$req.headers.host/`);
    const pathname=myUrl.pathname;
    const id=myUrl.searchParams.get('id')

    // console.log(req.url);
    if (pathname ==='/') {
        const html=await fs.readFile('./view/bicycles.html','utf-8')
        res.writeHead(200,{"content-type":"text/html"})
        res.end(html)
    }else if(pathname==='/bicycle' && id>=0 && id<=5){
        let html=await fs.readFile('./view/overview.html','utf-8');
        const bicycle=bicycles.find((b) =>b.id===id);
        console.log(bicycle);
        html=html.replace(/<%IMAGE%>/g, bicycle.image)
        html=html.replace(/<%NAME%>/g, bicycle.name);

        let price=bicycle.originalPrice;
        if (bicycle.hasDiscount) {
            price=(price*(100-bicycle.discount))/100
        }
        html=html.replace(/<%NEWPRICE%>/g,`$${price}`)



        res.writeHead(200,{"content-type":"text/html"});
        res.end(html);
    }
    else if(/\.(png)$/i.test(req.url)) {
      const image=await fs.readFile(`./public/image/${req.url.slice(1)}`) 
      res.writeHead(200,{"content-type":"image/png"});
      res.end(image);
    }
    else if(/\.(css)$/i.test(req.url)) {
        const css=await fs.readFile(`./public/css/index.css`) 
        res.writeHead(200,{"content-type":"text/css"});
        res.end(css);
      }
      else if(/\.(svg)$/i.test(req.url)) {
        const svg=await fs.readFile(`./public/image/icons.svg`) 
        res.writeHead(200,{"content-type":"image/svg+xml"});
        res.end(svg);
      }
    else{
        res.writeHead(404,{"content-type":"text/html"})
        res.end('<h1>File not found</h1>')
    }

    res.writeHead(200,{"content-type":"text/html"})
});

server.listen(3000);