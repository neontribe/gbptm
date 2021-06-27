import React from 'react';
import auth0 from 'auth0-js';

const CLIENT_ID = 'sUts4RKy04JcyZ2IVFgMAC0rhPARCQYg';
const permissionsKey = 'https://toiletmap.org.uk/permissions';

export const AuthContext = React.createContext<{
  isAuthenticated: () => boolean,
  getAccessToken: () => string | null,
  redirectOnNextLogin: (location: any) => any,
  redirectOnLogin: () => void,
  login: () => void,
  logout: () => void,
  checkPermission: (perm: string) => boolean,
  handleAuthentication: () => void,
}>(null);
export const useAuth = () => React.useContext(AuthContext);

export const isAuthenticated = () => {
  // Check whether the current time is past the
  // Access Token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};

export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

const redirectOnNextLogin = (location) => {
  localStorage.setItem('redirectOnLogin', JSON.stringify(location));
};

const redirectOnLogin = () => {
  return JSON.parse(localStorage.getItem('redirectOnLogin'));
};

const logout = () => {
  // Clear Access Token and ID Token from local storage also the cached email
  localStorage.removeItem('name');
  localStorage.removeItem('nickname');
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('permissions');
};

const checkPermission = (perm) => {
  const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
  return permissions.includes(perm);
};

const AuthProvider = ({ children }) => {
  const auth0Ref = React.useRef(
    new auth0.WebAuth({
      domain: 'gbptm.eu.auth0.com',
      responseType: 'token id_token',
      audience: 'https://www.toiletmap.org.uk/graphql',
      scope: 'openid profile report:loo',
      clientID: CLIENT_ID,
      redirectUri: `${window.location.origin}/callback`,
    })
  );

  const handleAuthentication = () =>
    new Promise((resolve, reject) => {
      auth0Ref.current.parseHash((err, authResult) => {
        if (err) {
          reject(err);
          return;
        }

        if (!authResult) {
          reject('No auth result');
          return;
        }

        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        localStorage.setItem('nickname', authResult.idTokenPayload.nickname);
        localStorage.setItem(
          'permissions',
          JSON.stringify(authResult.idTokenPayload[permissionsKey])
        );

        resolve(true);
      });
    });

  const login = () => {
    auth0Ref.current.authorize();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        redirectOnNextLogin,
        redirectOnLogin,
        login,
        logout,
        checkPermission,
        handleAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
