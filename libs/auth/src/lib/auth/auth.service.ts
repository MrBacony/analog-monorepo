import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
import { AUTH_CONFIG } from './auth.config';
import { isPlatformBrowser } from '@angular/common';

export interface User {
    sub: string;
    email: string;
    name: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    roles?: string[];
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private oauthService = inject(OAuthService);
    private router = inject(Router);
    private config = inject(AUTH_CONFIG);
    private platformId = inject(PLATFORM_ID);
    readonly user = signal<User | null>(null);
    readonly isAuthenticated = computed(() => this.user() !== null);

    constructor() {
        this.oauthService.events
            .pipe(filter((e) => e.type === 'token_received'))
            .subscribe(() => this.handleNewToken());

        // Load user profile if already authenticated
        if (this.oauthService.hasValidAccessToken()) {
            this.handleNewToken();
        }
        // Initialize auth with injected config
        this.initAuth(this.config);
    }

    /**
     * Initialize the OAuth service with the provided configuration
     */
    async initAuth(config: AuthConfig): Promise<void> {
        this.oauthService.configure(config);

        if (isPlatformBrowser(this.platformId)) {
            await this.oauthService.loadDiscoveryDocumentAndTryLogin();
        } else {
            await this.oauthService.loadDiscoveryDocument();
        }
        // Setup silent refresh if enabled in config
        if (config.silentRefreshRedirectUri) {
            this.oauthService.setupAutomaticSilentRefresh();
        }
    }

    /**
     * Handle user profile update when a new token is received
     */
    private handleNewToken(): void {
        const claims = this.oauthService.getIdentityClaims();
        if (claims) {
            this.user.set(claims as User);
        }
    }

    /**
     * Login the user
     */
    login(targetUrl?: string): void {
        if (isPlatformBrowser(this.platformId)) {
            this.oauthService.initCodeFlow(targetUrl || this.router.url);
        }
    }

    /**
     * Logout the user
     */
    logout(): void {
        this.oauthService.logOut();
        this.user.set(null);
        this.router.navigate(['/']);
    }

    /**
     * Check if user has the required roles
     */
    hasRoles(roles: string[]): boolean {
        const user = this.user();
        if (!user || !user.roles) return false;

        return roles.some((role) => user.roles?.includes(role));
    }

    getAccessToken(): string {
        return this.oauthService.getAccessToken();
    }
}
