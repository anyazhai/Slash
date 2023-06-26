import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(() => {
    if (window.localStorage.getItem('access')) {
      const access = JSON.parse(window.localStorage.getItem('access'));
      const username = JSON.parse(window.localStorage.getItem('username'));
      return {
        access,
        username,
      };
    }
    return {
      access: '',
      username: '',
    };
  });

  useEffect(() => {
    if (user.access) {
      const access = JSON.parse(window.localStorage.getItem('access'));
      const username = JSON.parse(window.localStorage.getItem('username'));
      setUser({
        access,
        username,
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
