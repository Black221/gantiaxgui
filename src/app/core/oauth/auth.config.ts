import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:9000', // Ton Spring Authorization Server
  redirectUri: window.location.origin + '/callback', // Page Angular
  clientId: 'angular-client-id', // Client enregistré via /clients/register
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false
};
