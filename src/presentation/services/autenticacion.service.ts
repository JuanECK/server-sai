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
        
        // const Usuario = registroUsuarioDto.Usuario;
        // const existeUsuario = await UsuarioModelo.findOne({ where: { Usuario }})
        // if( existeUsuario ) throw GeneraError.badRespuesta('El E-mail ya existe');
        
        try {
            
            registroUsuarioDto.Contrasenia = bcryptAdapter.hash( registroUsuarioDto.Contrasenia );
                
            registroUsuarioDto.Clave_Usuario = cryptoAdapter.secreto( registroUsuarioDto.Clave_Usuario )
                
            const { Nombre_Completo, Area, Id_Perfil, Usuario, Contrasenia, Estatus, Clave_Usuario, createAt, updateAt } =  registroUsuarioDto;
    
            const sql = 'CALL sp_inserta_usuario( :Nombre_Completo, :Area, :Id_Perfil, :Usuario, :Contrasenia, :Estatus, :Clave_Usuario, :createAt, :updateAt )';
            const usuario = await db.query( sql, { replacements: {
                Nombre_Completo,
                Area:Area,
                Id_Perfil:Id_Perfil,
                Usuario:Usuario,
                Contrasenia:Contrasenia,
                Estatus:Estatus,
                Clave_Usuario:Clave_Usuario,
                createAt:createAt,
                updateAt:updateAt,
            } } );
            const resultado = JSON.parse( JSON.stringify( usuario ) )
            const data = resultado[0]

            if( data.result === 0 ) throw GeneraError.badRespuesta( 'El usuario ya existe' );

            return {message: 'Usuario creado con exito'};

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
            throw GeneraError.badRespuesta( ` ${error} ` )
        }
    }


    public async accesoUsuario( loginUsusarioDto:LoginUsusarioDto ){

        const{ Usuario } = loginUsusarioDto
        
        //consulta usando mysql2
        // const usuario = await UsuarioModelo.findOne( { where: { Usuario } } )
    
        // consulta usando procedimientos establecidos en MySQL
        const sql = 'CALL sp_valida_usuario(:Usuario)';
        const usuario = await db.query( sql, { replacements: { Usuario:Usuario } } );
        
        const resultado = JSON.parse(JSON.stringify(usuario))
        const data = resultado[0]

        if( !data ) throw GeneraError.badRespuesta( 'El E-mail no existe' );

        const isMaching = bcryptAdapter.compare( loginUsusarioDto.Contrasenia, data.Contrasenia );
        if( !isMaching ) throw GeneraError.badRespuesta( 'El password es incorrecto' );

        const { Contrasenia, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( data );

        const token = await JwtAdapter.generateToken({ Id:data.Id_User, usuario: resultado.Nombre_Completo, sesion: data.Clave_Usuario });
        if ( !token ) throw GeneraError.servidorInterno( 'Error while creating JWT' );

        return {

        user: usuarioEntidad,
        token

        }

    }   

    public async sessionUsuario ( Token:string ){
        // console.log(Token)
        const payload = await JwtAdapter.validateToken( Token );
        if( !payload ) throw GeneraError.noAutorizado( 'token invalido' );

        return {respuesta:true}
    }

    public async coockie ( coockie:string ){
        const payload = await JwtAdapter.validateToken( coockie );
        if( !payload ) throw GeneraError.noAutorizado( 'token invalido' );

        return {respuesta:true}
        // console.log({esta:coockie})
        
        // return {
        //     user: 'Juan', loged: true
        // }
    }

    public async iniciarSession ( loginUsusarioDto:LoginUsusarioDto ) {


        const{ Usuario } = loginUsusarioDto
        
        //consulta usando mysql2
        // const usuario = await UsuarioModelo.findOne( { where: { Usuario } } )
    
        // consulta usando procedimientos establecidos en MySQL
        const sql = 'CALL sp_valida_usuario(:Usuario)';
        const usuario = await db.query( sql, { replacements: { Usuario:Usuario } } );
        
        const resultado = JSON.parse(JSON.stringify(usuario))
        const data = resultado[0]

        if( !data ) throw GeneraError.badRespuesta( 'El E-mail no existe' );

        const isMaching = bcryptAdapter.compare( loginUsusarioDto.Contrasenia, data.Contrasenia );
        if( !isMaching ) throw GeneraError.badRespuesta( 'El password es incorrecto' );

        const { Contrasenia, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( data );

        const token = await JwtAdapter.generateToken({ Id:data.Id_User, usuario: resultado.Nombre_Completo, sesion: data.Clave_Usuario });
        if ( !token ) throw GeneraError.servidorInterno( 'Error while creating JWT' );

        return {

        user: usuarioEntidad,
        token

        }


        // return

        //     res.cookie("x-auth-token", 'juaaaaan', {
        //           httpOnly: true,
        //         //   expires: new Date(Date.now() + 900000),
        //           sameSite: "strict",
        //           secure: true,
        //         //   priority:"high"
        //         });

        //     return res
        //     .status(200)
        //     .json({user: 'Juan', loged: true})  
    }
}