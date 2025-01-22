import { bcryptAdapter, cryptoAdapter } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { GeneraError, LoginUsusarioDto, UsuarioEntidad } from "../../core";
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import   UsuarioModelo   from "../../data/mysql/model/usuario.model";


export class AutenticacionServicio {

    constructor(){}

    public async registroUsuario( registroUsuarioDto:RegistroUsusarioDto ){

        console.log({objeto:registroUsuarioDto})
        
        const Usuario = registroUsuarioDto.Usuario;

        const existeUsuario = await UsuarioModelo.findOne({ where: { Usuario }})
        if( existeUsuario ) return GeneraError.badRespuesta('El E-mail ya existe');

        try {

            
            //destructurar el objeto
            const { Nombre_Completo, Area, Id_Perfil, Usuario, Contrasenia, Estatus, Clave_Usuario, createAt } =  registroUsuarioDto;
            
            //Nueva instancia del modelo usuario
            const usuario = new UsuarioModelo(
                {
                    'Usuario':Usuario, 
                    'Contrasenia':Contrasenia, 
                    'Estatus':Estatus, 
                    'Clave_Usuario':Clave_Usuario, 
                    'createAt':createAt, 
                    'Nombre_Completo':Nombre_Completo, 
                    'Area':Area, 
                    'Id_Perfil':Id_Perfil
                });
                
            //Encriptar la contraseña

            usuario.Contrasenia = bcryptAdapter.hash( registroUsuarioDto.Contrasenia );
            
            usuario.Clave_Usuario = cryptoAdapter.secreto( registroUsuarioDto.Clave_Usuario )

            // guarda en la base de datos
            await usuario.save();
            
            return  true;
            // const { password, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( usuario );
            // console.log({modelo:usuario})
            // const token = await JwtAdapter.generateToken( { id: usuario.Clave_Usuario } );
            // if(  !token ) throw GeneraError.servidorInterno( 'Error al crear JWT' );

            // return {
                // usuario: usuarioEntidad,
                // token: token,
            // }

        } catch (error) {
            throw GeneraError.servidorInterno( ` ${error} ` )
        }
    }


    public async accesoUsuario( loginUsusarioDto:LoginUsusarioDto ){

        console.log({objeto:loginUsusarioDto})
        
        const Usuario = loginUsusarioDto.Usuario;

        const usuario = await UsuarioModelo.findOne({ where: { Usuario }})
        if( !usuario ) return GeneraError.badRespuesta('El E-mail no existe');

        const isMaching = bcryptAdapter.compare( loginUsusarioDto.Contrasenia, usuario.Contrasenia );
        if( !isMaching ) throw GeneraError.badRespuesta( 'El password es incorrecto' );

        const { Contrasenia, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( usuario );

        const token = await JwtAdapter.generateToken({ id: usuario.Id_User, usuario: usuario.Usuario, sesion: usuario.Clave_Usuario });
        if ( !token ) throw GeneraError.servidorInterno('Error while creating JWT');

        return {
        user: usuarioEntidad,
        token: token,
        }

    }   
}