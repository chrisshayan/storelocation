import { ComponentsModule } from './components.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainComponent } from './main/main.component';
import { PlacesCardComponent } from './places-card/places-card.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchContentComponent } from './search-content/search-content.component';
import { SearchSummaryComponent } from './search-summary/search-summary.component';
import { ChartsLineComponent } from './charts-line/charts-line.component';
import { ChartsScatterComponent } from './charts-scatter/charts-scatter.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { SearchNoresultComponent } from './search-noresult/search-noresult.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { SearchResultsJsonComponent } from './search-results-json/search-results-json.component';
import { CollectPlacesComponent } from './collect-places/collect-places.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    PlacesCardComponent,
    SearchBoxComponent,
    SearchContentComponent,
    SearchSummaryComponent,
    ChartsLineComponent,
    ChartsScatterComponent,
    SearchResultsComponent,
    PlaceDetailComponent,
    SearchNoresultComponent,
    JsonViewerComponent,
    SearchResultsJsonComponent,
    CollectPlacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    ComponentsModule,
    AngularFireFunctionsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
