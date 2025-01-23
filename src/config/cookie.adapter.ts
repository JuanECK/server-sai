
import cookie from "cookie";


export class CookieAdapter {
    
    public static setCookie( res: any, name: string, value: string, options: any ) {
        
        console.log( value )
        res.setHeader('Set-Cookie', cookie.serialize( name, value, options ));
    }

    public static getCookie( req: any, name: string ) {
        return cookie.parse( req.headers.cookie )[name];
    }

    public static deleteCookie( res: any, name: string ) {
        res.setHeader('Set-Cookie', cookie.serialize( name, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
        }))
    }
}