import { LoginPayLoad } from "src/auth/dtos/loginpayLoad.dto"

export const authorizationToLoginPayLoad = (authorization: string):
    LoginPayLoad | undefined => {
    const authorizationSplited = authorization.split('.')

    if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
        return undefined
    }

    return JSON.parse(Buffer.from(authorizationSplited[1], 'base64')
        .toString('ascii'))
}