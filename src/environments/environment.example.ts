export const environment = {
  version: '2025-01-01',
  production: true,
  auth0: {
    domain: 'dev-aaa.eu.auth0.com',
    clientId: 'bbb',
    authorizationParams: {
      audience: 'https://zzz',
      redirect_uri: 'https://yyy',
    },
  },
  api: {
    serverUrl: 'https://xxx:8087',
  },
};
