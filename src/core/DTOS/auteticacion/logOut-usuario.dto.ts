

export class LogOutUsusarioDto {

    private constructor(
        public id_user:string | number,
    ){}

    static crear( objeto: { [key:string]:any } ):[string?, LogOutUsusarioDto?]{
        const {  id_user } = objeto;
console.log(id_user)
        if( !id_user ) return ['Falta el id para terminar la sesion']

        return [undefined, new LogOutUsusarioDto( 
            id_user,
         )];
    }
}