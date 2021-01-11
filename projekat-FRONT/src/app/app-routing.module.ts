import { OceneLekariKlinikeComponent } from './components/pacijent-home-page/ocene-lekari-klinike/ocene-lekari-klinike.component';
import { ActivacionPageComponent } from './activacion-page/activacion-page.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PacijentGuard } from './guards/pacijent.guard';
import { ListaSalaComponent } from './components/admin-klinike/components/lista-sala/lista-sala.component';
import { AdminKlinikeComponent } from './components/admin-klinike/admin-klinike.component';
import { ListaRegistrovanihZahtevaComponent } from './components/admin-klinickog-centra-home-page/adminComponents/lista-registrovanih-zahteva/lista-registrovanih-zahteva.component';
import { AdminKlinickogCentraHomePageComponent } from './components/admin-klinickog-centra-home-page/admin-klinickog-centra-home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ListaPacijenataComponent } from './components/admin-klinickog-centra-home-page/adminComponents/lista-pacijenata/lista-pacijenata.component';
import { ListaKlinikaComponent } from './components/lista-klinika/lista-klinika.component';
import { PrikazKlinikeComponent } from './components/lista-klinika/prikaz-klinike/prikaz-klinike.component';
import { ZakazaniPreglediComponent } from './components/pacijent-home-page/zakazani-pregledi/zakazani-pregledi.component';
import { PodaciPacijentaComponent } from './components/pacijent-home-page/podaci-pacijenta/podaci-pacijenta.component';
import { PacijentHomePageComponent } from './components/pacijent-home-page/pacijent-home-page.component';
import { LekarComponent } from './components/lekar/lekar.component';
import { ZapocniPregledComponent } from './components/lekar/components/zapocni-pregled/zapocni-pregled.component';
import { RadniKalendarComponent } from './components/lekar/components/radni-kalendar/radni-kalendar.component';
import { ZahtevZaGodisnjiComponent } from './components/lekar/components/zahtev-za-godisnji/zahtev-za-godisnji.component';
import { ProfilComponent } from './components/lekar/components/profil/profil.component';
import { PacijentiComponent } from './components/lekar/components/pacijenti/pacijenti.component';
import { PrikazPacijentaComponent } from './components/lekar/components/prikaz-pacijenta/prikaz-pacijenta.component';
import { ZdravstveniKartonComponent } from './components/pacijent-home-page/zdravstveni-karton/zdravstveni-karton.component';
import { ListaPregledaComponent } from './components/pacijent-home-page/lista-pregleda/lista-pregleda.component';
import { OsnovniPodaciComponent } from './components/admin-klinike/components/osnovni-podaci/osnovni-podaci.component';
import { SlobodniTerminiPregledaComponent } from './components/admin-klinike/components/slobodni-termini-pregleda/slobodni-termini-pregleda.component';
import { CenovnikComponent } from './components/admin-klinike/components/cenovnik/cenovnik.component';
import { TipoviPregledaComponent } from './components/admin-klinike/components/tipovi-pregleda/tipovi-pregleda.component';
import { IzvestajPoslovanjaComponent } from './components/admin-klinike/components/izvestaj-poslovanja/izvestaj-poslovanja.component';
import { LekariComponent } from './components/admin-klinike/components/lekari/lekari.component';
import { ProfilAdminaKlinikeComponent } from './components/admin-klinike/components/profil-admina-klinike/profil-admina-klinike.component';
import { ZahteviZakazivanjaPregledaComponent } from './components/admin-klinike/components/zahtevi-zakazivanja-pregleda/zahtevi-zakazivanja-pregleda.component';
import { AdminKlinikeGuard } from './guards/adminKlinike.guard';
import { LekarGuard } from './guards/lekar.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'adminKcHomePage', component: AdminKlinickogCentraHomePageComponent,
        children: [
         { path: 'listaRegistrovanihZahteva', component: ListaRegistrovanihZahtevaComponent },
         { path: 'listaPacijenata', component: ListaPacijenataComponent }
        ]
  },
  { path: 'adminKHomePage', component: AdminKlinikeComponent, canActivate: [AdminKlinikeGuard],
        children: [
         { path: 'zakazivanjePregleda', component: ZahteviZakazivanjaPregledaComponent, canActivate: [AdminKlinikeGuard] },
         { path: 'sale', component: ListaSalaComponent, canActivate: [AdminKlinikeGuard] },
         { path: 'lekari', component: LekariComponent , canActivate: [AdminKlinikeGuard]},
         { path: 'osnovniPodaciKlinike', component: OsnovniPodaciComponent, canActivate: [AdminKlinikeGuard] },
         { path: 'slobodniTerminiPregleda', component: SlobodniTerminiPregledaComponent, canActivate: [AdminKlinikeGuard] },
         { path: 'cenovnik', component: CenovnikComponent , canActivate: [AdminKlinikeGuard]},
         { path: 'tipoviPregleda', component: TipoviPregledaComponent , canActivate: [AdminKlinikeGuard]},
         { path: 'profil', component: ProfilAdminaKlinikeComponent, canActivate: [AdminKlinikeGuard] },
         { path: 'izvestajPoslovanja', component: IzvestajPoslovanjaComponent, canActivate: [AdminKlinikeGuard] }
        ]
  },

  { path: 'pacijentHomePage', 
    component: PacijentHomePageComponent, canActivate: [PacijentGuard] ,
        children: [
          { path: 'podaciPacijenta', component: PodaciPacijentaComponent, canActivate: [PacijentGuard] },
          { path: 'zakazaniPregledi', component: ZakazaniPreglediComponent, canActivate: [PacijentGuard] },
          { path: 'zdravstveniKarton', component: ZdravstveniKartonComponent, canActivate: [PacijentGuard] },
          { path: 'istorijaPregleda', component: ListaPregledaComponent, canActivate: [PacijentGuard] },
          { path: 'clinics', component: ListaKlinikaComponent, canActivate: [PacijentGuard] },
          { path: 'clinic/:id', component: PrikazKlinikeComponent, canActivate: [PacijentGuard] },
          { path: 'mojeOcene', component: OceneLekariKlinikeComponent, canActivate: [PacijentGuard]}
        ]
  },
  { path: 'lekarHomePage', component: LekarComponent, canActivate: [LekarGuard] ,
  children: [
    { path: 'pacijenti', component: PacijentiComponent , canActivate: [LekarGuard] },
    { path: 'zapocniPregled/:id', component: ZapocniPregledComponent , canActivate: [LekarGuard] },
    { path: 'radniKalendar', component: RadniKalendarComponent, canActivate: [LekarGuard]  },
    { path: 'noviZahtev', component: ZahtevZaGodisnjiComponent, canActivate: [LekarGuard]  },
    { path: 'profil', component: ProfilComponent, canActivate: [LekarGuard]  },
    { path: 'pacijent/:id', component: PrikazPacijentaComponent, canActivate: [LekarGuard] }
  ] 
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
  {
    path: 'activateAccount/:id',
    component: ActivacionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
