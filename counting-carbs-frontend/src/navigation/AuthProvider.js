import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { postRegisterUser } from '../backend/Backend';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await auth().signInWithEmailAndPassword(email, password);
        },
        register: async (email, password) => {
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async () => {
              await postRegisterUser('/user', auth().currentUser.uid, email);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
