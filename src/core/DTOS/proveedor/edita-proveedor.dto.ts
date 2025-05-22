import { regularExpsEmail } from "../../../config";


export class EditaProveedorDto {

    private constructor(



        
        
        
        
        public nombre: string,
        public fisica_moral: string,
        public correo: string,
        public telefono: string,
        public actividad: string,
        public Id_ICPC: string,
        public usuario: string,
        public RFC: string,
        public Banco_cuenta: string,
        public CLABE: string,
        public Banco_tarjeta: string,
        public tarjeta: string,
        public Estatus: string,

    ) { }

    static crear(objeto: { [key: string]: any }): [string?, EditaProveedorDto?] {
    // static crear(objeto: { [key: string]: any }, uso:string): [string?, AgregarComisionistaDto?] {
        const { 

            nombre,
            fisica_moral,
            correo,
            telefono,
            actividad,
            Id_ICPC,
            usuario,
            RFC,
            Banco_cuenta,
            CLABE,
            Banco_tarjeta,
            tarjeta,
            Estatus,

        } = objeto;

            if(!nombre) return ['Falta  Nombre o Razón social']
            if(!regularExpsEmail.email.test( correo )) return ['El e-mail no es valido']

        return [ undefined, new EditaProveedorDto (
            nombre,
            fisica_moral,
            correo,
            telefono,
            actividad,
            Id_ICPC,
            usuario,
            RFC,
            Banco_cuenta,
            CLABE,
            Banco_tarjeta,
            tarjeta,
            Estatus,
        )]
    }
}