import { User } from './user.model';
import { Klinika } from './klinika.model';

export class Lekar{
    id?:number;
    specijalizacija:string;
    opis:string;
    user:User;
    klinika: Klinika;
    radnovreme:string;
    firstLogin: boolean;
    prosecnaocena: number;
}
