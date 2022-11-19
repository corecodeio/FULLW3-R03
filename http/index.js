const http = require('http');
const fs = require('fs');
const path = require('path');

const mainPage = (res)=>{
    res.setHeader("Content-Type","text/html");
    res.write("<html>");
    res.write(`
        <head>
            <title>Example</title>
        </dead>
        <body>
            <h1>register log</h1>
            <form action="/send" method="POST">
            <input type="text" name='log' placeholder="ingrese log..."/>
            <button type="submit">enviar</button>
            </form>
        </body>
    `)
    res.write("</html>");
    res.end();
}
const notFound = (res)=>{
    res.setHeader("Content-Type","text/html");
    res.write("<html>");
    res.write(`
        <head>
            <title>not Found</title>
        </dead>
        <body>
            <h1>Not Found</h1>
        </body>
    `)
    res.write("</html>");
    res.end();
}
const registerLog = (req) =>{
    //console.log('log');
    const pathLog = path.join('.',path.sep,'files','log.txt');
    let reqBody = []; 
    req.on('data',(chunck)=>{
        console.log(chunck);
        reqBody.push(chunck);
    })
    req.on('end',()=>{
        const parceBody = Buffer.concat(reqBody).toString('utf-8');
        console.log(parceBody);
        const text = parceBody.split('=')[1];
        fs.writeFileSync(pathLog,`${new Date()} - ${text} \n`,{flag:'a'});
    })
}
const resquestHandler = (req,res)=>{
    //console.log(req);
    const { url, method } = req;

    if(url === '/'){
        return mainPage(res);
    } else if ( url === '/send' && method === "POST"){
        registerLog(req);
        res.statusCode = 302;
        res.setHeader('Location','/');
    }
    notFound(res);
}
const server = http.createServer(resquestHandler);

server.listen(8000);

