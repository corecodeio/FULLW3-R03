const express = require('express');
const app = express();

//middelware
app.use((req,res,next)=>{
    console.log('m1');
    next();
})

app.use((req,res,next)=>{
    console.log('m2');
    next();
})
app.use((req,res,next)=>{
    console.log('m3');
    res.send(`
    <html>
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
    </html>
`)
})
app.listen(8000,()=>{
    console.log('servidor escuchando en el puerto: 8000');
})