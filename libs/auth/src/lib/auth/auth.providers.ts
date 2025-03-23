import { EnvironmentProviders, Provider } from '@angular/core';
import { OAuthModule, provideOAuthClient, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { AUTH_CONFIG } from './auth.config';

/**
 * Provides a custom auth configuration
 * @param config The custom auth configuration
 */
export function provideAuthConfig(
    config: AuthConfig,
    oauthModuleConfig?: OAuthModuleConfig,
): (Provider | EnvironmentProviders)[] {
    return [
        {
            provide: AUTH_CONFIG,
            useValue: config,
        },
        provideOAuthClient(oauthModuleConfig),
    ];
}

/**
 * Provides a factory function for the auth configuration
 * @param factory A factory function that returns an AuthConfig
 * @param deps Dependencies for the factory function
 */
export function provideAuthConfigFactory(factory: (...deps: any[]) => AuthConfig, deps: any[] = []): Provider[] {
    return [
        {
            provide: AUTH_CONFIG,
            useFactory: factory,
            deps,
        },
        OAuthModule,
    ];
}
