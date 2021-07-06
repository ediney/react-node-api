//api-estados.js
var http = require('http'); 
const express = require('express');
const app = express();
app.use(require("cors")());
 
app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})
 
app.get('/estados', (req, res, next) => { 
    console.log("Retornou todos estados!");
    const ufs = [
        {id:01,uf:'AC'},
        {id:02,uf:'AL'},
        {id:03,uf:'AM'},
        {id:04,uf:'AP'},
        {id:05,uf:'DF'},
        {id:06,uf:'ES'},
        {id:07,uf:'GO'},
        {id:08,uf:'MA'},
        {id:09,uf:'MG'},
        {id:10,uf:'MS'},
        {id:11,uf:'MT'},
        {id:12,uf:'PA'},
        {id:13,uf:'PB'},
        {id:14,uf:'PE'},
        {id:15,uf:'PI'},
        {id:16,uf:'PR'},
        {id:17,uf:'RJ'},
        {id:18,uf:'RN'},
        {id:19,uf:'RO'},
        {id:20,uf:'RS'},
        {id:21,uf:'SC'},
        {id:22,uf:'SE'},
        {id:23,uf:'SP'},
        {id:24,uf:'TO'},
    ]
    res.json(ufs);
}) 
 
var server = http.createServer(app); 
server.listen(3030);
console.log("Servidor escutando na porta 3030...")