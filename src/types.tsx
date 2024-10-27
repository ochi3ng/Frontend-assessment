export interface TUser {
    id: number;
    name: string;
    username:string;
    email:string;
}

export interface TAlbum {
    album:TAlbum;
    id: string | number ;
    userId: number;
    title: string;
}

export interface Photo {
    id: number;
    userId: number;
    thumbnailUrl:string;
    title: string;
}
export interface Tdata {
email:string;
password:string;
confirmPassword:string
}

