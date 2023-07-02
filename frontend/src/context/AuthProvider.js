import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(() => {
    if (window.localStorage.getItem('access-token')) {
      const access = JSON.parse(window.localStorage.getItem('access-token'));
      const email = JSON.parse(window.localStorage.getItem('email'));
      return {
        access,
        email
      };
    }
    return {
      access: '',
      email: ''
    };
  });

  useEffect(() => {
    if (user.access) {
      const access = JSON.parse(window.localStorage.getItem('access-token'));
      const email = JSON.parse(window.localStorage.getItem('email'));
      setUser({
        access,
        email,
      });

      console.log(user);
    }
    setloading(false);
  }, [loading]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <div /> : children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
