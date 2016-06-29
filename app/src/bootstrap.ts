import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { APP_ROUTER_PROVIDERS } from './routes';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS
])
.catch(err => console.error(err));
