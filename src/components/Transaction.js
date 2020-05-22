'use strict';

export default {
  template: `
    <div class="row flex-column flex-sm-row h-100 home" :class="{logged: $login.isAuthenticated}">

      <div class="home-text col-sm-6 d-flex flex-column">
        <h3 class="">{{$login.userProfile.name}}</h3>
        <h3 class="flex-grow-1 d-xs-block d-sm-none">TRANSACTION IS APPROVED</h3>
      </div>

      <div class="home-yellow col-sm-6 flex-grow-1 d-flex flex-column">
        <div class="home-image flex-grow-1">
        </div>
        <div v-if="$login.isAuthenticated" class="home-transaction d-none d-sm-block">
          <h3 class="d-none d-sm-block">TRANSACTION IS APPROVED</h3>
          <router-link :to="{name: 'home'}" @click="$approveOidc.signOut()" class="btn btn-dark d-block">Back</router-link>
        </div>
      </div>

      <div class="home-btn col-sm d-xs-block d-sm-none">
        <router-link :to="{name: 'home'}" @click="$approveOidc.signOut()" class="btn btn-dark d-block">Back</router-link>
      </div>

    </div>
  `,
};
