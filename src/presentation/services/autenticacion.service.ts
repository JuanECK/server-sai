import { bcryptAdapter, cryptoAdapter } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { GeneraError, LoginUsusarioDto, UsuarioEntidad, LogOutUsusarioDto } from "../../core";
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import {db}  from "../../data/mysql/db/coneccion";
// import   UsuarioModelo   from "../../data/mysql/model/usuario.model";

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
                
            const { Nombre_Completo, Area, Id_Perfil, Usuario, Contrasenia, Estatus, Clave_Usuario } =  registroUsuarioDto;
    
            const sql = 'exec sp_inserta_usuario :Nombre_Completo, :Area, :Id_Perfil, :Usuario, :Contrasenia, :Estatus, :Clave_Usuario ';
            // const sql = 'CALL sp_inserta_usuario( :Nombre_Completo, :Area, :Id_Perfil, :Usuario, :Contrasenia, :Estatus, :Clave_Usuario, :createAt, :updateAt )';
            const usuario = await db.query( sql, { replacements: {
                Nombre_Completo,
                Area:Area,
                Id_Perfil:Id_Perfil,
                Usuario:Usuario,
                Contrasenia:Contrasenia,
                Estatus:Estatus,
                Clave_Usuario:Clave_Usuario,
            } } );

            // console.log(usuario[0][0])

            const resultado = JSON.parse( JSON.stringify( usuario[0][0] ) )
            if( resultado.Respuesta === 'si' ) throw GeneraError.noEncontrado( 'El usuario ya existe' );

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
            throw GeneraError.noEncontrado( ` ${error} ` )
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

    }

    public async iniciarSession ( loginUsusarioDto:LoginUsusarioDto ) {

        console.log(loginUsusarioDto)

        const{ Usuario, } = loginUsusarioDto
        
        //consulta usando mysql2
        // const usuario = await UsuarioModelo.findOne( { where: { Usuario } } )
    
        // consulta usando procedimientos establecidos en MySQL

        const sql = 'exec sp_valida_usuario :Usuario';
        // const sql = 'CALL sp_valida_usuario(:Usuario)';
        const usuario = await db.query( sql, { replacements: { Usuario:Usuario } } );
        if( usuario[0].length === 0 ) throw GeneraError.badRespuesta( 'El E-mail no existe' );

        const resultado = JSON.parse(JSON.stringify(usuario[0][0]))

        // console.log(resultado)
        // const data = resultado[0]
        // if( !data ) throw GeneraError.badRespuesta( 'El E-mail no existe' );

        // const bitacora = JSON.parse(JSON.stringify(usuario[0][0]))
        // console.log(bitacora.Id_User)

        
        // const result = JSON.parse(JSON.stringify(inserBitacora))
        // console.log({inserto:inserBitacora})
        
        
        const isMaching = bcryptAdapter.compare( loginUsusarioDto.Contrasenia, resultado.Contrasenia );
        if( !isMaching ) throw GeneraError.badRespuesta( 'El password es incorrecto' );
        
        const { Contrasenia, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( resultado );
        
        const token = await JwtAdapter.generateToken({ Id:resultado.Id_User, usuario: resultado.Nombre_Completo, sesion: resultado.Clave_Usuario });
        if ( !token ) throw GeneraError.servidorInterno( 'Error al crear JWT' );

        const llave = JSON.stringify({id_Perfil:resultado.Id_Perfil, Id:resultado.Id_User}) 
        const UserId = cryptoAdapter.secreto(llave)
        usuarioEntidad.Datos = UserId

        const sqlLogBitacora = `exec sp_inserta_inicio_sesion :Id_User,"inicio sesion"` //
        //metodo de MySql
        // const sqlLogBitacora = `CALL sp_inserta_inicio_sesion(${bitacora[0].Id_User},"inicio sesion")`
        const inserBitacora = await db.query( sqlLogBitacora, {replacements:{ Id_User:resultado.Id_User }} );
        if(inserBitacora.length !== 2 )  throw GeneraError.badRespuesta('error al iniciar session')

        console.log(inserBitacora.length)
        const { Id_Perfil, Id_User, Clave_Usuario, ...usuarioData } = usuarioEntidad

        return {

        user: usuarioData,
        // UserId:UserId,
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

    public async terminarSession ( id_user:string ){
    // public async terminarSession ( loginUserDto:LogOutUsusarioDto ){

            // const { id_user } = loginUserDto;
            let sqlLogBitacora = ''
            if(+id_user == 15){
                sqlLogBitacora = `exec sp_inserta_inicio_sesion :Id_User,"Token Manipulado"`;
            }else{
                sqlLogBitacora = `exec sp_inserta_inicio_sesion :Id_User,"Sesion Terminada"`;
            }
            console.log(id_user)
            const inserBitacora = await db.query( sqlLogBitacora, { replacements:{ Id_User:id_user } })
            console.log(inserBitacora)
            if(inserBitacora.length !== 2 )  throw GeneraError.badRespuesta('error al terminar session')
                
            return {
                sessionOut:true
            }
            
    }

    public async GetModuloPerfil ( id:string ) {
        const data = JSON.parse(cryptoAdapter.muestraSecreto(id))

        if(!data) throw GeneraError.noAutorizado('ID incorrecto')
               
        const sql = 'exec  sp_modulos_gral :id';
        const usuario = await db.query( sql, { replacements: { id:data.id_Perfil} } ); 
        // console.log(usuario)           
        const resultado = JSON.parse(JSON.stringify(usuario))

        return resultado

    }
    public async GetModuloId ( id_user:string ) {

        const data = JSON.parse(cryptoAdapter.muestraSecreto(id_user))
        if( !data ) throw GeneraError.noAutorizado('ID incorrecto')
            console.log({data11:data})

        return { Data:data}

    }

    public async GetCredenciales ( id:string ) {
        const data = JSON.parse(cryptoAdapter.muestraSecreto(id))
        return data
    }
}