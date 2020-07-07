import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
      SignIn: 'signin',
      SignUp: 'signup'
    }
};
