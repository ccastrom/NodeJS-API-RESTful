const express=require('express');
const app=express();
const Joi=require('joi');
app.use(express.json());
/**
 * Se define un arreglo con usuarios genericos
 */
const usuarios= [{id:1,nombre:"Claudio"},
                 {id:2,nombre:"Pepe"},
                 {id:3,nombre:"Jose"}];

/**
 * Primera petición para obtener información!
 */
app.get('/',(req,res)=>{
res.send("Hola mundo desde Express.");
});
/**Petición get para obtener como respuesta una lista de usuarios definidas */
app.get('/api/usuarios',(req,res)=>{
    res.send(usuarios);
})
/**
 * Petición get para obtener un usuario de la lista definida según un parametro
 */
app.get('/api/usuarios/:id',(req,res)=>{
  let usuario=existeUsuario(req.params.id)
  if(!usuario) res.status(404).send('El usuario no fue encontrado');
  res.send(usuario);
})
/**
 * Petición para añadir un usuario nueva a la lista, se valida los valores utilizando Joi
 */
app.post('/api/usuarios',(req,res)=>{
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });
    const {error,value}=validarUsuario(req.body.nombre);
    if(!error){
        const usuario={
            id:usuarios.length+1,
            nombre:value.nombre
        };
        usuarios.push(usuario);//Añadir usuario a la lista
        res.send(usuario);
        
    }else{
        const message=error.details[0].message;
        res.status(400).send(message);
    }
})
app.put('/api/usuarios/:id',(req,res)=>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('El usuario no fue encontrado');
        return;
    } 
    const {error,value}= validarUsuario(req.body.nombre);
    if(error){
        const message=error.details[0].message;
        res.status(400).send(message);
        return;
    }
    usuario.nombre=value.nombre;
    res.send(usuario);

})
const port =process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Escuchando desde el puerto: "+port);
})

function existeUsuario(id){
    return (usuario=usuarios.find(u=>u.id== parseInt(id)));
}
function validarUsuario(name){
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });
    return schema.validate({ nombre:name});
}