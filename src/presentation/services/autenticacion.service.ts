import { bcryptAdapter, cryptoAdapter } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { GeneraError, LoginUsusarioDto, UsuarioEntidad } from "../../core";
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import {db}  from "../../data/mysql/db/coneccion";
import   UsuarioModelo   from "../../data/mysql/model/usuario.model";

//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//---------------CONECCION FINAL CON LA BASE DE DATOS Y REALIZAR LA PETICION----------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
export class AutenticacionServicio {

    constructor(){}

    public async registroUsuario( registroUsuarioDto:RegistroUsusarioDto ){
        
        const Usuario = registroUsuarioDto.Usuario;
        
        // const existeUsuario = await UsuarioModelo.findOne({ where: { Usuario }})
        // if( existeUsuario ) throw GeneraError.badRespuesta('El E-mail ya existe');
        
        try {
            
        registroUsuarioDto.Contrasenia = bcryptAdapter.hash( registroUsuarioDto.Contrasenia );
            
        registroUsuarioDto.Clave_Usuario = cryptoAdapter.secreto( registroUsuarioDto.Clave_Usuario )
            
        const { Nombre_Completo, Area, Id_Perfil, Usuario, Contrasenia, Estatus, Clave_Usuario, createAt, updateAt } =  registroUsuarioDto;

        const sql = 'CALL sp_inserta_usuario( :Nombre_Completo, :Area, :Id_Perfil, :Usuario, :Contrasenia, :Estatus, :Clave_Usuario, :createAt, :updateAt )';
        const usuario = await db.query(sql,{replacements:{
            Nombre_Completo,
            Area:Area,
            Id_Perfil:Id_Perfil,
            Usuario:Usuario,
            Contrasenia:Contrasenia,
            Estatus:Estatus,
            Clave_Usuario:Clave_Usuario,
            createAt:createAt,
            updateAt:updateAt,
        }});

        // usuario.map((usuario)=>{usuario.includes('')})
        // console.log(usuario)
        const resultado = usuario.at(0)
        // const res = usuario.map(e=>{return {result:e.map(u=>u.usuario)}});

  
        console.log(resultado)
        // console.log(usuario.includes(usuario.at(0)))

        // console.log(usuario.includes(usuario.at(0)))

        // if( usuario.includes(usuario.at(0)) ) throw GeneraError.badRespuesta( 'El usuario ya existeeee' );
        // const [usuario] = await db.query(sql, [Usuario]);

            
            //destructurar el objeto
            // const { Nombre_Completo, Area, Id_Perfil, Usuario, Contrasenia, Estatus, Clave_Usuario, createAt } =  registroUsuarioDto;
            
            // //Nueva instancia del modelo usuario
            // const usuario = new UsuarioModelo(
            //     {
            //         'Usuario':Usuario, 
            //         'Contrasenia':Contrasenia, 
            //         'Estatus':Estatus, 
            //         'Clave_Usuario':Clave_Usuario, 
            //         'createAt':createAt, 
            //         'Nombre_Completo':Nombre_Completo, 
            //         'Area':Area, 
            //         'Id_Perfil':Id_Perfil
            //     });
                
            // //Encriptar la contraseña

            // usuario.Contrasenia = bcryptAdapter.hash( registroUsuarioDto.Contrasenia );
            
            // usuario.Clave_Usuario = cryptoAdapter.secreto( registroUsuarioDto.Clave_Usuario )

            // // guarda en la base de datos
            // await usuario.save();
            
            return  resultado;
            // const { password, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( usuario );
            // console.log({modelo:usuario})
            // const token = await JwtAdapter.generateToken( { id: usuario.Clave_Usuario } );
            // if(  !token ) throw GeneraError.servidorInterno( 'Error al crear JWT' );

            // return {
                // usuario: usuarioEntidad,
                // token: token,
            // }

        } catch (error) {
            console.log( error )
            throw GeneraError.servidorInterno( ` ${error} ` )
        }
    }


    public async accesoUsuario( loginUsusarioDto:LoginUsusarioDto ){

        // console.log(loginUsusarioDto)
        // const email = loginUsusarioDto.Usuario;
        const{ Usuario } = loginUsusarioDto
        
        //consulta usando mysql2
        // const usuario = await UsuarioModelo.findOne( { where: { Usuario } } )
        
        // consulta usando procedimientos establecidos en MySQL
        const sql = 'CALL sp_valida_usuario(:Usuario)';
        const usuario = await db.query(sql,{replacements:{Usuario:Usuario}});

        console.log(usuario)


        if( !usuario[0] ) throw GeneraError.badRespuesta( 'El E-mail no existe' );

        // const isMaching = bcryptAdapter.compare( loginUsusarioDto.Contrasenia, usuario.Contrasenia );
        // if( !isMaching ) throw GeneraError.badRespuesta( 'El password es incorrecto' );

        // const { Contrasenia, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( usuario );

        // const token = await JwtAdapter.generateToken({ usuario: usuario.Nombre_Completo, sesion: usuario.Clave_Usuario });
        // if ( !token ) throw GeneraError.servidorInterno('Error while creating JWT');

        // return {

        // user: usuarioEntidad,
        
        // // token: token
        // // ,
        // token

        // }

    }   
}