export interface UserStore{
    userId: string,
    userName: string,
    userRole: string,
    userUser: string
}

export interface Payload{
    userId: string,
    userName: string,
    userRole: string,
    userUser: string
}

export interface IError{
    service: string,
    price: string,
    request: string,
    verify: string
}