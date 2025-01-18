import { bcryptAdapter, cryptoAdapter } from "../../config";
import { JwtAdapter } from "../../config/jwt.adapter";
import { GeneraError, UsuarioEntidad } from "../../core";
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import { ModeloUsuario } from "../../data/mongo/model/usuario.model";


export class AutenticacionServicio {

    constructor(){}

    public async registroUsuario( registroUsuarioDto:RegistroUsusarioDto ){

        console.log({objeto:registroUsuarioDto})
        
        const existeUsuario = await ModeloUsuario.findOne( { email: registroUsuarioDto.email } )
        // if( existeUsuario ) return GeneraError.badRespuesta('El E-mail ya existe');

        try {

            //Nueva instancia del modelo usuario
            const usuario = new ModeloUsuario( registroUsuarioDto )
            
            //Encriptar la contraseña
            usuario.password = bcryptAdapter.hash( registroUsuarioDto.password );
            
            usuario.claveUnica = cryptoAdapter.secreto( registroUsuarioDto.claveUnica )
            
            // guarda en la base de datos
            // await usuario.save();
            
            const { password, ...usuarioEntidad } = UsuarioEntidad.formularioObjeto( usuario );
            console.log({modelo:usuario})
            const token = await JwtAdapter.generateToken( { id: usuario.id } );
            if(  !token ) throw GeneraError.servidorInterno( 'Error al crear JWT' );

            return {
                usuario: usuarioEntidad,
                token: token,
            }

        } catch (error) {
            throw GeneraError.servidorInterno( ` ${error} ` )
        }
    }
}