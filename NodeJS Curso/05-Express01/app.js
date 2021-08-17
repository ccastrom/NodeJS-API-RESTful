const express=require('express');
const app=express();

app.get('/',(req,res)=>{
res.send("Hola mundo desde Express.");
});

app.get('/api/usuarios',(req,res)=>{
    res.send(['grover','luis','anna','frank']);
})

app.listen(3000,()=>{
    console.log("Escuchando desde el puerto 3000");
})

