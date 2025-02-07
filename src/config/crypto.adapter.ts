import CryptoJS from 'crypto-js';
import { envs } from './envs';

// const SEED = 'padroPantera'
const SEED = envs.JWT_SEED

export const cryptoAdapter = {

    secreto: ( llave:string ) => {

        const oculto = CryptoJS.AES.encrypt( llave, SEED ).toString();
        return oculto;

    },

    muestraSecreto: ( secreto:string ) => {
        try {
            const bytes = CryptoJS.AES.decrypt(secreto, SEED);
            const secretoDesbloqueado = bytes.toString(CryptoJS.enc.Utf8);
            return secretoDesbloqueado;
        } catch (error) {
            throw new Error ('error')
        }

    }


}

