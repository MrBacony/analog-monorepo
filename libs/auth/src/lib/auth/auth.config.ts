import { AuthConfig } from 'angular-oauth2-oidc';
import { InjectionToken } from '@angular/core';

/**
 * Injection token for OAuth configuration
 */
export const AUTH_CONFIG = new InjectionToken<AuthConfig>('auth.config');
