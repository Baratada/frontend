import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    // Register providers from HttpClientModule and the configured RouterModule globally
    importProvidersFrom(HttpClientModule, RouterModule.forRoot(routes)), provideAnimationsAsync()
  ]
});
