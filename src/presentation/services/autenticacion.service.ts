import { bcryptAdapter } from "../../config";
import { GeneraError } from "../../core";
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import { ModeloUsuario } from "../../data/mongo/model/usuario.model";


export class AutenticacionServicio {

    constructor(){}

    public async registroUsuario( registroUsuarioDto:RegistroUsusarioDto ){

        const existeUsuario = await ModeloUsuario.findOne( { email: registroUsuarioDto.email } )
        if( existeUsuario ) return GeneraError.badRespuesta('El E-mail ya existe');

        try {

            //Nueva instancia del modelo usuario
            const usuario = new ModeloUsuario( registroUsuarioDto )

            //Encriptar la contraseña
            usuario.password = bcryptAdapter.hash( registroUsuarioDto.password );

            // guarda en la base de datos
            await usuario.save();

            // const { password, ...user }




        } catch (error) {
            throw GeneraError.servidorInterno( ` ${error} ` )
        }
    }
}