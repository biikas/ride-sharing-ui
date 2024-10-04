import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { XPA_FORM_ERROR_MESSAGES } from './form-error-messages.config';
import { AppRoutes } from './router/app-routes.config';
import { AuthorizationInterceptor, ErrorHandlerInterceptor } from './interceptor/interceptor.config';
import { NbMenuModule, NbThemeModule } from '@nebular/theme';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(NbThemeModule.forRoot(), NbMenuModule.forRoot()),
        provideHttpClient(withInterceptors([AuthorizationInterceptor, ErrorHandlerInterceptor])),
        // provideHttpClient(),

        provideAnimations(),
        provideRouter(AppRoutes),
        // provideFormErrorMessages(XPA_FORM_ERROR_MESSAGES),
        // { provide: SclUploaderService, useClass: XpaFileUploaderService },
    ],
};

export const USER_INFO_KEY = 'Authorization';
