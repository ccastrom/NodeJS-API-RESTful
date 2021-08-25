const express= require('express');
const rutas= express.Router();
const Joi=require('joi');

/**
 * Se define un arreglo con usuarios genericos
 */
 const usuarios= [{id:1,nombre:"Claudio"},
 {id:2,nombre:"Pepe"},
 {id:3,nombre:"Jose"}];


rutas.get('/',(req,res)=>{
    res.send(usuarios);
})
/**
 * Petición get para obtener un usuario de la lista definida según un parametro
 */
rutas.get('/:id',(req,res)=>{
  let usuario=existeUsuario(req.params.id)
  if(!usuario) res.status(404).send('El usuario no fue encontrado');
  res.send(usuario);
})
/**
 * Petición para añadir un usuario nueva a la lista
 */
rutas.post('/',(req,res)=>{
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
rutas.put('/:id',(req,res)=>{
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
rutas.delete('/:id',(req,res)=>{
    let usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('El usuario no fue encontrado');
        return;
    } 

    const index=usuarios.indexOf(usuario);
    usuarios.splice(index,1);
    res.send(usuarios);
});

function existeUsuario(id){
    return (usuario=usuarios.find(u=>u.id== parseInt(id)));
}
function validarUsuario(name){
    const schema = Joi.object({
        nombre: Joi.string().min(3).required()
    });
    return schema.validate({ nombre:name});
}

module.exports=rutas;