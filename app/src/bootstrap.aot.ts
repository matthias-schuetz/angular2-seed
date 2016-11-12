import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../../app-aot/app/src/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
