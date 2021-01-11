import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PacijentGuard } from './guards/pacijent.guard';
import { ApiService } from './services/api/api.services';
import { AuthService } from './services/authService/auth.service';
import { PutanjaService } from './putanje/putanje.service';
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { ListaSalaComponent } from './components/admin-klinike/components/lista-sala/lista-sala.component';
import { AdminKlinikeComponent } from './components/admin-klinike/admin-klinike.component';
import { PregledService } from './services/pregled.service';
import { PacijentService } from './services/pacijentServices/pacijent.service';
import { AdminKlinickogCentraService } from './services/adminKCServices/admin-klinickog-centra.service';
import { LoginService } from './services/login.service';
import { RegisterServiceService } from './services/register-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KorisnikService } from './services/korisnik.service';
import { AdminKlinickogCentraHomePageComponent } from './components/admin-klinickog-centra-home-page/admin-klinickog-centra-home-page.component';
import { ListaRegistrovanihZahtevaComponent } from './components/admin-klinickog-centra-home-page/adminComponents/lista-registrovanih-zahteva/lista-registrovanih-zahteva.component';
import { ListaPacijenataComponent } from './components/admin-klinickog-centra-home-page/adminComponents/lista-pacijenata/lista-pacijenata.component';
import { ListaKlinikaComponent } from './components/lista-klinika/lista-klinika.component';
import { PrikazKlinikeComponent } from './components/lista-klinika/prikaz-klinike/prikaz-klinike.component';
import { PacijentHomePageComponent } from './components/pacijent-home-page/pacijent-home-page.component';
import { PodaciPacijentaComponent } from './components/pacijent-home-page/podaci-pacijenta/podaci-pacijenta.component';
import { ZakazaniPreglediComponent } from './components/pacijent-home-page/zakazani-pregledi/zakazani-pregledi.component';
import { EditProfilDialogComponent } from './components/pacijent-home-page/podaci-pacijenta/edit-profil-dialog/edit-profil-dialog.component';
import { LekarComponent } from './components/lekar/lekar.component';
import { ZapocniPregledComponent } from './components/lekar/components/zapocni-pregled/zapocni-pregled.component';
import { RadniKalendarComponent } from './components/lekar/components/radni-kalendar/radni-kalendar.component';
import { ZakaziPregledComponent } from './components/lekar/components/zakazi-pregled/zakazi-pregled.component';
import { ZahtevZaGodisnjiComponent } from './components/lekar/components/zahtev-za-godisnji/zahtev-za-godisnji.component';
import { ProfilComponent } from './components/lekar/components/profil/profil.component';
import { PacijentiComponent } from './components/lekar/components/pacijenti/pacijenti.component';
import { PrikazPacijentaComponent } from './components/lekar/components/prikaz-pacijenta/prikaz-pacijenta.component';
import { ListaPregledaComponent } from './components/pacijent-home-page/lista-pregleda/lista-pregleda.component';
import { ZdravstveniKartonComponent } from './components/pacijent-home-page/zdravstveni-karton/zdravstveni-karton.component';
import { PregledaniPacijentComponent } from './components/lekar/components/prikaz-pacijenta/pregledani-pacijent/pregledani-pacijent.component';
import { OsnovniPodaciComponent } from './components/admin-klinike/components/osnovni-podaci/osnovni-podaci.component';
import { SlobodniTerminiPregledaComponent } from './components/admin-klinike/components/slobodni-termini-pregleda/slobodni-termini-pregleda.component';
import { LekariComponent } from './components/admin-klinike/components/lekari/lekari.component';
import { CenovnikComponent } from './components/admin-klinike/components/cenovnik/cenovnik.component';
import { TipoviPregledaComponent } from './components/admin-klinike/components/tipovi-pregleda/tipovi-pregleda.component';
import { ProfilAdminaKlinikeComponent } from './components/admin-klinike/components/profil-admina-klinike/profil-admina-klinike.component';
import { IzvestajPoslovanjaComponent } from './components/admin-klinike/components/izvestaj-poslovanja/izvestaj-poslovanja.component';
import { OsnovniPodaciDialogComponent } from './components/admin-klinike/components/osnovni-podaci/osnovni-podaci-dialog/osnovni-podaci-dialog.component';
import { ZakaziPregledDialogComponent } from './components/lekar/components/zapocni-pregled/zakazi-pregled-dialog/zakazi-pregled-dialog.component';
import { ZahteviZakazivanjaPregledaComponent } from './components/admin-klinike/components/zahtevi-zakazivanja-pregleda/zahtevi-zakazivanja-pregleda.component';
import { AkEditProfilDialogComponent } from './components/admin-klinike/components/profil-admina-klinike/dialog/profil-admina-klinike/ak-edit-profil-dialog/ak-edit-profil-dialog.component';
import { AkEditPasswordDialogComponent } from './components/admin-klinike/components/profil-admina-klinike/dialog/ak-edit-password-dialog/ak-edit-password-dialog.component';
import { LekariDialogComponent } from './components/admin-klinike/components/lekari/lekari-dialog/lekari-dialog.component';
import { SaleDialogComponent } from './components/admin-klinike/components/lista-sala/sale-dialog/sale-dialog.component';
import { TipoviPregledaDialogComponent } from './components/admin-klinike/components/tipovi-pregleda/tipovi-pregleda-dialog/tipovi-pregleda-dialog.component';
import { ProfilDialogComponent } from './components/lekar/components/profil/profil-dialog/profil-dialog.component';
import { ActivacionPageComponent } from './activacion-page/activacion-page.component';
import { AdminKlinikeGuard } from './guards/adminKlinike.guard';
import { LekarGuard } from './guards/lekar.guard';
import { SlobodniTerminiDialogComponent } from './components/admin-klinike/components/slobodni-termini-pregleda/slobodni-termini-dialog/slobodni-termini-dialog.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { LekarRatingComponent } from './components/pacijent-home-page/lista-pregleda/lekar-rating/lekar-rating.component';
import { EditLozinkaComponent } from './components/pacijent-home-page/podaci-pacijenta/edit-lozinka/edit-lozinka.component';
import { ZahteviZakazivanjaDialogComponent } from './components/admin-klinike/components/zahtevi-zakazivanja-pregleda/zahtevi-zakazivanja-dialog/zahtevi-zakazivanja-dialog.component';
import { KlinikaRatingComponent } from './components/pacijent-home-page/lista-pregleda/klinika-rating/klinika-rating.component';
import { OdbijZahtevDialogComponent } from './components/admin-klinickog-centra-home-page/odbij-zahtev-dialog/odbij-zahtev-dialog.component';
import { OceneLekariKlinikeComponent } from './components/pacijent-home-page/ocene-lekari-klinike/ocene-lekari-klinike.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminKlinickogCentraHomePageComponent,
    ListaRegistrovanihZahtevaComponent,
    ListaPacijenataComponent,
    ListaKlinikaComponent,
    PrikazKlinikeComponent,
    PacijentHomePageComponent,
    PodaciPacijentaComponent,
    ZakazaniPreglediComponent,
    EditProfilDialogComponent,
    LekarComponent,
    ZapocniPregledComponent,
    RadniKalendarComponent,
    ZakaziPregledComponent,
    ZahtevZaGodisnjiComponent,
    ProfilComponent,
    PacijentiComponent,
    PrikazPacijentaComponent,
    ListaPregledaComponent,
    ZdravstveniKartonComponent,
    PregledaniPacijentComponent,
    AdminKlinikeComponent,
    ListaSalaComponent,
    OsnovniPodaciComponent,
    SlobodniTerminiPregledaComponent,
    LekariComponent,
    CenovnikComponent,
    TipoviPregledaComponent,
    ProfilAdminaKlinikeComponent,
    IzvestajPoslovanjaComponent,
    OsnovniPodaciDialogComponent,
    ZakaziPregledDialogComponent,
    ZahteviZakazivanjaPregledaComponent,
    AkEditProfilDialogComponent,
    AkEditPasswordDialogComponent,
    LekariDialogComponent,
    SaleDialogComponent,
    TipoviPregledaDialogComponent,
    ProfilDialogComponent,
    ForbiddenComponent,
    ActivacionPageComponent,
    SlobodniTerminiDialogComponent,
    LekarRatingComponent,
    EditLozinkaComponent,
    ZahteviZakazivanjaDialogComponent,
    KlinikaRatingComponent,
    OdbijZahtevDialogComponent,
    OceneLekariKlinikeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgxMaterialTimepickerModule,
  ],
  entryComponents: [ZahteviZakazivanjaDialogComponent,SlobodniTerminiDialogComponent, ProfilDialogComponent, TipoviPregledaDialogComponent, SaleDialogComponent, LekariDialogComponent,EditProfilDialogComponent,OsnovniPodaciDialogComponent,ZakaziPregledDialogComponent,AkEditProfilDialogComponent,AkEditPasswordDialogComponent, EditLozinkaComponent, OdbijZahtevDialogComponent],


  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  KorisnikService, 
  RegisterServiceService, 
  LoginService, 
  AdminKlinickogCentraService, 
  PacijentService, 
  PregledService,
  PutanjaService,
  AuthService,
  ApiService,
  PacijentGuard,
  AdminKlinikeGuard,
  LekarGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
