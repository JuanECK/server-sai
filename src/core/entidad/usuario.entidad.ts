
export class UsuarioEntidad{

    constructor(
        public nombre: string,
        public emaii: string,
        public password: string,
        public claveUnica: string,
      ) { }

      static formularioObjeto( objeto: { [ key:string ]: any } ) {

        const { _id, nombre, email, password, claveUnica } = objeto;

        

      }
}