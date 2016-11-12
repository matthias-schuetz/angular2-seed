import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AUTH_PROVIDERS } from './common/auth.guard';
import { routing } from './routes';
import { SharedModule } from './components/_shared/shared.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ErrorModule } from './components/error/error.module';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        DashboardModule,
        ErrorModule,
        HomeModule,
        LoginModule,
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
