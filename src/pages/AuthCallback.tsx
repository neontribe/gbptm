import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'next/link';

import { useAuth } from '../Auth';
import PageLayout from '../components/PageLayout';

const Callback = () => {
  const auth = useAuth();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const checkAuth = async () => {
      if (/access_token|id_token|error/.test(location.hash)) {
        await auth.handleAuthentication();
      }

      if (auth.isAuthenticated()) {
        history.push(auth.redirectOnLogin() || '/');
      } else {
        history.push('/contribute');
      }
    };

    checkAuth();
  }, [auth, history, location.hash]);

  return (
    <PageLayout>
      <p>Updating credentials</p>
    </PageLayout>
  );
};

export default Callback;
