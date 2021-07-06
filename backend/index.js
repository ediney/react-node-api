const http = require("http");
const express = require("express");

const db = require("./db");

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// rota protegida
app.get('/clientes', verifyJWT, (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'ediney'}]);
});

app.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'admin' && req.body.password === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
});

app.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}