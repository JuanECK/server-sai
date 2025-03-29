import { Response, Request } from "express"
import { GeneraError, LoginUsusarioDto, LogOutUsusarioDto } from "../../core"
import { RegistroUsusarioDto } from "../../core/DTOS/auteticacion/registro-usuario.dto";
import { AutenticacionServicio } from "../services/autenticacion.service";
import   UsuarioModelo   from "../../data/mysql/model/usuario.model";
import { db } from "../../data/mysql/db/coneccion";
import { cryptoAdapter } from "../../config";

export class AutenticacionControlador {

    constructor(
        public readonly autentucacionServicio: AutenticacionServicio,
    ){}

    private manejadorErrores = ( error: unknown, res:Response ) =>{

        if( error instanceof GeneraError ){
            return res.status( error.codigoEstatus).json({ error: error.mensaje })
        }
        
        console.log(`${error}`);
        return res.status(500).json({error: 'Error interno del servidor'})

    }

    registroUsuario = ( req:Request, res:Response ) =>{

        const[ error, registroDto ] = RegistroUsusarioDto.crear( req.body );
        if( error ) return res.status( 400 ).json( { error } );

        this.autentucacionServicio.registroUsuario( registroDto! )
        .then( ( usuario ) => res.json( usuario ) )
        .catch( error => this.manejadorErrores( error, res ) )
        
    }

    coockie = async ( req:Request, res:Response ) => {

            const respCoockie = req.headers.cookie
            // console.log('cookie')

            const coockie = respCoockie?.split("; ").filter(c=>/^auth_access_token.+/.test(c))
            // const coockie = respCoockie?.split("; ").filter(c=>/^x-auth-token.+/.test(c))
            .map(e=>e.split("="));

        if( respCoockie === undefined || coockie?.length === 0 ) return res.status(401).json({Response:'No autorizado'}) 
            
            // console.log({respuesta:coockie?.length})

            const cookie = coockie?.at(0)
            // console.log(cookie![1])
            this.autentucacionServicio.coockie( cookie![1] )
            .then( ( user ) => res.json( user ) )
            .catch( error => this.manejadorErrores( error, res ) )

    }

    iniciarSession = async ( req:Request, res:Response ) =>{

        const[ error, loginUserDto ] = LoginUsusarioDto.crear( req.body );
        if( error ) return res.status( 404 ).json( { error } )
            
        this.autentucacionServicio.iniciarSession(loginUserDto!)
        .then( ( usuario ) => 
            {
                console.log(usuario)
                const {token, ...user} = usuario

                res.cookie("auth_access_token", token, {
                httpOnly: true,
                //   expires: new Date(Date.now() + 900000),
                sameSite: "strict",
                secure: true,
                //   priority:"high"
                }),

            res.status(200).json( user )
        } 
    
        )
        .catch( error => this.manejadorErrores( error, res ))

    }

    terminarSession = async ( req:Request, res:Response ) =>{
        // console.log(req)

        const idUser = this.parseCriptoID(req.body.id_user)

        console.log(idUser.Id)
        
        // if( !idUser.Id ) return res.status(403).json('Falta id Usuario')
        if( !idUser.Id ) { idUser.Id = 15 }

        this.autentucacionServicio.terminarSession( idUser.Id )
        .then( ( usuario )=>{

            res.cookie("auth_access_token", 'expirado',{
                  expires: new Date(0),
                }),
            res.json({logOut:true})
        } )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    getUsuarios = async ( req:Request, res:Response ) => {
        // const usuarios = await UsuarioModelo.findAll()
        const usuarios = await db.query('SELECT * FROM Usuario') ;
        const data = usuarios[0]
        res.json(data)

    }

    GetModuloPerfil = async ( req:Request, res:Response ) => {
        const { id } = req.body

        this.autentucacionServicio.GetModuloPerfil( id )
        .then( ( result ) => {res.json( result )} )
        .catch( error => this.manejadorErrores( error, res ) )
        
    }
    
    GetModuloId = async ( req:Request, res:Response ) => {
        const { id_user } = req.body

        this.autentucacionServicio.GetModuloId( id_user )
        .then( ( result ) => { res.json( result.Data.id_Perfil )} )
        .catch( error => this.manejadorErrores( error, res ) )

    }

    GetCredenciales = async ( req:Request, res:Response ) => {
        const { id } = req.body;

        this.autentucacionServicio.GetCredenciales( id )
        .then( ( result ) => {res.json( result )} )
        .catch( error => this.manejadorErrores( error, res ) )
    }


    parseCriptoID (id:string){
        try {
                
            const data = JSON.parse(cryptoAdapter.muestraSecreto(id))
            console.log(data)
            console.log(data.id_Perfil)
            return data

        } catch (error) {
            return []
        }
    }

}