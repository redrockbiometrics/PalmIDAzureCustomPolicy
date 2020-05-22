import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.js';
import Transaction from './components/Transaction.js';
import UserLogin from './components/UserLogin.js';

import {createOidcAuth, SignInType, LogLevel} from 'vue-oidc-client';

import './css/site.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(Router);

const appBaseUrl = location.pathname.replace(/\/[^/]*$/, '/');
const appUrl = location.protocol + '//' + location.host + appBaseUrl;

const loginOidc = createOidcAuth(
  'login',
  SignInType.Window,
  appUrl,
  {
    authority: 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signup_signin_palmid/v2.0/',
    metadata: {
      'authorization_endpoint': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signup_signin_palmid/oauth2/v2.0/authorize',
      'token_endpoint': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signup_signin_palmid/oauth2/v2.0/token',
      'end_session_endpoint': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signup_signin_palmid/oauth2/v2.0/logout',
      'jwks_uri': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signup_signin_palmid/discovery/v2.0/keys',
      'issuer': 'https://redrockbiometricsdemo.b2clogin.com/9e0c300f-8b0a-49bb-908c-e837280665f4/v2.0/',
    },
    signingKeys: [
      {'kid': 'IlFgFJGKf-Xion0j4w5l8e2TR5S6meKYX7rY6nVOH2s', 'use': 'sig', 'kty': 'RSA', 'e': 'AQAB', 'n': 'wSS4lSTQpK_w9meYvAoxzdFa-zcTurt2DP93jQplSg5whkzVNUUKGah6mDiftHALf-hcBZbihcTYCStZuRbJiagClBnnpR6crXpK7qx4iy0jwr8zpnZGPe3jn7GHT4_tpAcutLAfidYMT6c2TguHDm4CSd3LdxWOhHxAaQZ18lH6m3sMuiBJ63my9RDqUjwoctXT0ERD44ZVjr5fDh-ymR0dWRZ9G66PhjCv-ImdmFsvfwUP5S4ZyuflXIdjqT9rZgYmRQJKLMiq6fcNwV-cXX-ZXkc0SQ0ab8z-on3lGWgmFTk3f5zP9hnlo6KAqxC_z3BpnycuOzRl3gCK557dsQ'},
    ],
    client_id: 'e42bcb73-9364-4a4a-9b8f-50d63f73c946',
    response_type: 'id_token',
    scope: 'openid',
    prompt: 'login',
    redirect_uri: `${appUrl}signin-oidc`,
  },
  console,
);

const approveOidc = createOidcAuth(
  'approve',
  SignInType.Window,
  appUrl,
  {
    authority: 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signinwithidtoken_and_palmidverify/v2.0/',
    metadata: {
      'authorization_endpoint': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signinwithidtoken_and_palmidverify/oauth2/v2.0/authorize',
      'token_endpoint': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signinwithidtoken_and_palmidverify/oauth2/v2.0/token',
      'end_session_endpoint': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signinwithidtoken_and_palmidverify/oauth2/v2.0/logout',
      'jwks_uri': 'https://redrockbiometricsdemo.b2clogin.com/redrockbiometricsdemo.onmicrosoft.com/b2c_1a_signinwithidtoken_and_palmidverify/discovery/v2.0/keys',
      'issuer': 'https://redrockbiometricsdemo.b2clogin.com/9e0c300f-8b0a-49bb-908c-e837280665f4/v2.0/',
    },
    signingKeys: [
      {'kid': 'IlFgFJGKf-Xion0j4w5l8e2TR5S6meKYX7rY6nVOH2s', 'use': 'sig', 'kty': 'RSA', 'e': 'AQAB', 'n': 'wSS4lSTQpK_w9meYvAoxzdFa-zcTurt2DP93jQplSg5whkzVNUUKGah6mDiftHALf-hcBZbihcTYCStZuRbJiagClBnnpR6crXpK7qx4iy0jwr8zpnZGPe3jn7GHT4_tpAcutLAfidYMT6c2TguHDm4CSd3LdxWOhHxAaQZ18lH6m3sMuiBJ63my9RDqUjwoctXT0ERD44ZVjr5fDh-ymR0dWRZ9G66PhjCv-ImdmFsvfwUP5S4ZyuflXIdjqT9rZgYmRQJKLMiq6fcNwV-cXX-ZXkc0SQ0ab8z-on3lGWgmFTk3f5zP9hnlo6KAqxC_z3BpnycuOzRl3gCK557dsQ'},
    ],
    client_id: 'e42bcb73-9364-4a4a-9b8f-50d63f73c946',
    response_type: 'id_token',
    scope: 'openid',
    prompt: 'login',
    redirect_uri: `${appUrl}approve-oidc`,
  },
  console,
);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/transaction-:id',
    component: Transaction,
    name: 'transaction',
    meta: {
      authName: loginOidc.authName,
    },

    beforeEnter: (to, from, next) => {
      if (
        approveOidc.isAuthenticated
        && to.params.id === approveOidc.userProfile.trx_id
        && loginOidc.userProfile.sub === approveOidc.userProfile.sub
      ) {
        next();
        return;
      }

      approveOidc.signIn({
        state: {to},
        extraQueryParams: {
          trx_id: to.params.id,
          id_token_hint: loginOidc.user.id_token,
        },
      });

      next(false);
    },
  },
];

const router = new Router({
  mode: 'history',
  base: appBaseUrl,
  routes,
});


loginOidc.useRouter(router);
approveOidc.useRouter(router);

Vue.prototype.$login = loginOidc;
Vue.prototype.$approveOidc = approveOidc;

Vue.component('user-login', UserLogin);

loginOidc.startup().then(ok => {
  if (ok) {
    new Vue({
      router,
      template: `
        <div id="app" class="container-fluid h-100">
          <router-view class="view"></router-view>
        </div>
      `,
    }).$mount('#app');
  }
});
