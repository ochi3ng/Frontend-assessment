export interface User {
    id: number;
    name: string;
    username:string;
    email:string;
}

export interface Album {
    id: number;
    userId: number;
    title: string;
}

export interface Photo {
    id: number;
    userId: number;
    thumbnailUrl:string;
    title: string;
}