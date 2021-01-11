import { User } from './user.model';
import { Klinika } from './klinika.model';

export class AdminKlinike{
    id:number;
    user:User;
    klinika:Klinika;
    firstLogin:boolean;
}