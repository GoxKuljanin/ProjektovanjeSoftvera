import { Lekar } from './lekar.model';
import { Pacijent } from './pacijent';
import { Termin } from './termin.model';
import { Klinika } from './klinika.model';
import { TipPregleda } from './tipPregleda.model';

export class ZahtevZaZakazivanje {
    id: number;
    trajanje: string;
    cena: number;
    //lekar: Lekar;
    datum:string;
    vreme:string;
    //pacijent: Pacijent;
    //tippregleda: TipPregleda;
}