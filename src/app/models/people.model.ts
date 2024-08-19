export interface RandomUserApiResponse {
    results: RandomUser[];
}

export interface RandomUser {
    name: {
        title: string,
        first: string,
        last: string
    },
    email: string,
    phone: string,
    picture: {
        large: string,
        thumbnail: string
    }
}   

export interface People {
    name: string,
    email: string,
    phone: string,
    avatar: string
}