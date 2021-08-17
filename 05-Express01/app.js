const express=require('express');
const app=express();

app.get('/',(req,res)=>{
res.send("Hola mundo desde Express.");
});

app.get('/api/usuarios',(req,res)=>{
    res.send(['grover','luis','anna','frank']);
})
const port =process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Escuchando desde el puerto: "+port);
})

