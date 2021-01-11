import { Termin } from './termin.model';
import { Lekar } from 'src/app/models/lekar.model';
import { Sala } from './Sala.model';
import { User } from './user.model';
import { Klinika } from './klinika.model';
import { TipPregleda } from './tipPregleda.model';

export class Pacijent {
    id:number;
    zdravstveniKarton:ZdravstveniKarton;
    user:User;
    krvnaGrupa: string;
}

export class ZdravstveniKarton {
    id: number;
    izvestaj: Izvestaj[];
    dioptrija: string;
    alergija: string;
    visina: string;
    tezina: string;
    krvna_grupa: string;
}

export class Pregled {
    id: number;
    trajanje: string;
    sala: Sala;
    cena: number;
    lekar: Lekar;
    pacijent: Pacijent;
    termin: Termin;
    klinika: Klinika;
    tippregleda: TipPregleda;
}

export class PregledanPacijent {
    pregledaniPacijent:Pacijent
}

export class Dijagnoza {

    id: number;
    sifra: string;
    naziv: string;
    opisDijagnoze: string;
}

export class Lek {
    
    id: number;
    sifra: string;
    naziv: string;
    opis: string;
}

export class Izvestaj {

    id: number;
    pregled: Pregled;
    dijagnoza: Dijagnoza;
    lek: Lek[];
    terapija: string;
}
