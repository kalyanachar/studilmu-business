import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


// import { File } from '@ionic-native/File/ngx';
//import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { FileTransfer } from '@ionic-native/file-transfer/ngx';
//import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
// Videogular2



// Material
// import {
//   MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
//   MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
//   MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
//   MatProgressBarModule, MatProgressSpinnerModule, MatStepperIntl, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule,
//   MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
//   MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
// } from '@angular/material';

//Services
import { MainService } from '../app/core/services/main.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath,
    FileTransfer,
    MainService,
    InAppBrowser,
    // FileOpener,
    // DocumentViewer,
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
