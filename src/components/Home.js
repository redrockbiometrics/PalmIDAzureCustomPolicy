'use strict';
export default {
  template: `
    <div class="row flex-column flex-sm-row h-100 home" :class="{logged: $login.isAuthenticated}">

      <div class="home-text col-sm-6 d-flex flex-column">
        <h1>Hello!</h1>
        <template v-if="!$login.isAuthenticated">
          <p class="flex-grow-1">
            This is a demo website<br>
            for PalmID IDP integrated<br>
            with Azure AD B2C sign-in
          </p>
          <a  href="#" @click.prevent="$login.signIn()" class="btn btn-dark d-none d-sm-block">Start</a>
        </template>
        <template v-else>
          <h3 class="flex-grow-1">{{$login.userProfile.name}}</h3>
          <h3 class="d-xs-block d-sm-none">YOUR ARE LOGGED IN</h3>
          <a href="#" @click.prevent="$login.signOut()" class="btn btn-dark d-none d-sm-block">Sign Off</a>
        </template>
      </div>

      <div class="home-yellow col-sm-6 flex-grow-1 d-flex flex-column">
        <div class="home-image flex-grow-1">
        </div>
        <div v-if="$login.isAuthenticated" class="home-transaction d-none d-sm-block">
          <h3 class="d-none d-sm-block">YOUR ARE LOGGED IN</h3>
          <router-link v-if="$login.isAuthenticated" :to="{name: 'transaction', params: {id: ''+Date.now() }}" class="btn btn-success d-block">Make transaction</router-link>
        </div>
      </div>

      <div class="home-btn col-sm d-xs-block d-sm-none">
        <router-link v-if="$login.isAuthenticated" :to="{name: 'transaction', params: {id: ''+Date.now() }}" class="btn btn-success d-block">Make transaction</router-link>
        <a v-if="!$login.isAuthenticated" href="#" @click.prevent="$login.signIn()" class="btn btn-dark d-block">Start</a>
        <a v-else href="#" @click.prevent="$login.signOut()" class="btn btn-dark d-block">Sign Off</a>
      </div>

    </div>
  `,
};
