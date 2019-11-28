import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectPlacesComponent } from './collect-places/collect-places.component';
import { PlacesCollectionComponent } from './places-collection/places-collection.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'collect', component: CollectPlacesComponent },
  { path: 'collection/:id', component: PlacesCollectionComponent },
  { path: '**', component: PageNotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
