import React from 'react';
import { Route, Redirect } from 'next/link';

import { useAuth } from '../Auth';

const ProtectedRoute = ({ component: Component, injectProps, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} {...injectProps} />;
        } else {
          auth.redirectOnNextLogin(props.location);
          return <Redirect to="/contribute" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
