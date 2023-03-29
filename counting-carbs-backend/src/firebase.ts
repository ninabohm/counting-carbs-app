import * as admin from 'firebase-admin';
import * as firebaseConfig from './firebase/firebase.config.json';

export const firebase_params = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key,
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};

//the lines below need to be commented out for the tests to work since we are not using the firebase config file anymore
// export const defaultApp = admin.initializeApp({
//   credential: admin.credential.cert(firebase_params),
// });
export const defaultApp = admin.initializeApp();
