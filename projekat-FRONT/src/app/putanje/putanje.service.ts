import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PutanjaService {

    private _app_url = 'http://localhost:8088/'
    private _application_pacijent_url = 'http://localhost:8088/pacijent';
    private _authentication_url = 'http://localhost:8088/auth';
    private _application_pregledi_url = 'http://localhost:8088/pregledi'

    get pacijentURL(): string{
        return this._application_pacijent_url;
    }

    private _azurirajPacijenta_url = this._application_pacijent_url + '/updatePacijent';

    get azurirajPacijenta(): string{
        return this._azurirajPacijenta_url;
    }
    private _azurirajSifraPacijent_url = this._application_pacijent_url + '/updateSifraPacijent';
    get azurirajSifraPacijent(): string{
        return this._azurirajSifraPacijent_url;
    }

    private _login_url = this._authentication_url + '/login';

    get login_url(): string {
        return this._login_url;
    }

    private _user_info_url = this._app_url + 'user/getUserInfo'

    get userInfo(): string{
        return this._user_info_url;
    }

    private _pacijent_info_url = this._application_pacijent_url + '/getPacijentInfo'

    get pacijentInfo(): string{
        return this._pacijent_info_url;
    }

    private _pacijent_ocena_url = this._application_pacijent_url + '/unesiOcenuLekara/';
    get oceniPacijenta(): string{
        return this._pacijent_ocena_url;
    }
    private _klinika_ocena_url = this._application_pacijent_url + '/unesiOcenuKlinike/';
    get oceniKliniku(): string{
        return this._klinika_ocena_url;
    }

    private _zakazani_pregledi = this._application_pregledi_url + '/zakazaniPregledi'

    get zakazaniPregledi(): string{
        return this._zakazani_pregledi;
    }

    private _odjavi_pregled = this._application_pregledi_url + '/odjaviPregled'

    get odjaviPregled(): string{
        return this._odjavi_pregled;
    }

    private _zdravstveni_karton = this._app_url + 'getZdravstveniKarton'

    get zdravstveniKarton(): string {
        return this._zdravstveni_karton;
    }
}