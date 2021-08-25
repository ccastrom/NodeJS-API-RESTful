const express=require('express');
const config=require('config');
const usuarios=require('./routes/usuarios');

const morgan=require('morgan');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/usuarios',usuarios);

//Configuración de entorno
console.log('Aplicación: '+config.get('nombre'));
console.log('BD server: '+config.get('configDB.host'));

const port =process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Escuchando desde el puerto: "+port);
})