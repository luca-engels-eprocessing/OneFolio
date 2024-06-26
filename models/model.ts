export type user = {
    name: {
        firstname: string,
        lastname: string
    }
    email: string,
    password:string,
    address: {
        street?: string, // optional
        streetnumber?: string, // optional
        city?: string,
        zip?: string,
        country?: string,
        phone?: string
    }
    accessToken?:string
}

export type investment = {
    _id?: string,
    userId: string,
    data:{
        title:string,
        date:string,
        Summe:string,
        [key:string]:string
    }
}