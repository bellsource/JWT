const express =require("express");
const server = express();
const bodyParser = require ("body-parser");
const jwt = require("jsonwebtoken");

const usuarios = ["matias", "juan", "natalia "];

const verificarToken = (req,res,next) =>{
    try{
        //obtengo el token
        const token = req.headers.authorization.split(' ')[1];
        //split toma una cadena y la transforma en un array y obtiene la 2° posición o posición[1]

        //verificación del token con la palabra secreta
        const verifyJWT = jwt.verify(token,"SecretW0rd")//se pasa el token y la firma
        if(verifyJWT){
            next();
        }
    }catch(e){
        res.json({Error: "Error al validar usuario"});
    }
}

server.use(bodyParser.json());

function validarUsuario(user, pass){
    if(user =="belu" && pass == "123"){
        return true;
    }
  return false;
}

server.post("/seguro",verificarToken, (req,res) =>{
    res.json("Entro correctamente");
});

//endpoint
server.post("/login",(req,res) =>{
    const {usuario, pass} = req.body;
    const valido = validarUsuario(usuario,pass);

    if(!valido){
        res.json("el usuario o contraseña son invalidos");
        return;
    }
    const token = jwt.sign({
        usuario
    }, "SecretW0rd");//firma
    res.json({token});//retorno
});

//creo una funcion encargada de verificar el token


server.get("/",(req,res)=> {
    res.json(usuarios);
})

server.get("/contact",(req,res)=> {
    usuarios.push("lorena");
    res.json(usuarios);
})

server.listen(3000,() => {
    console.log("servidor iniciado");
})