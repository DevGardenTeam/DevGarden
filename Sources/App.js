import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const express = require('express');

const router = express.Router();

passport.use(new GitHubStrategy({
    clientID: "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",
    clientSecret: "85fa33682f94f8f98fea2c03b499f403c6ed90b4",
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },

  function(accessToken, refreshToken, profile, done) {
   
    const user = new User({
      accountId: profile.id,
      name: profile.username,
      provider: profile.provider,
    });
    return done(null, profile);
  }
));

// redirect user to github authentication
router.get('/', passport.authenticate('github', { scope: ['user:email'] }));

// Once the user has successfully singed up i can redirecr 
router.get(
  'callback',
  passport.authenticate('github', {failureRedirect: '/auth/github/error'}),
  function(req, res){
    res.redirect('auth/github/success');
  }
);

router.get('/sucess',async (req, res) => {
    const userInfo = {
      id: res.session.passport.user.id,
      displayName: req.session.passport.user.username,
      provider: req.session.passport.user.provider, 
    };
    res-render('fb-github-success', { user: userInfo });
});

export default function App() {
  return (
    <View style={styles.container}>
      <button onClick={() => print("")} >Click me</button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
