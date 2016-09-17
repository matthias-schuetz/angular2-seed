import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AUTH_PROVIDERS } from './common/auth.guard';
import { routing } from './routes';
import { SharedModule } from './components/_shared/shared.module';

import { AppComponent } from './app.component';
import { ErrorModule } from './components/error/error.module';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        ErrorModule,
        routing
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AUTH_PROVIDERS
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
