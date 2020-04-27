'use strict';

export default {
  methods: {
    signout() {
      this.$login.signOut();
    },
    signin() {
      this.$login.signIn();
    },
  },

  template: `
    <div class="w-100">
      <div class="text-right">
        <a v-if="$login.isAuthenticated" href="#" @click.prevent="signout" class="btn btn-link">Sign Out</a>
        <a v-else href="#" @click.prevent="signin" class="btn btn-link">Sign In</a>
      </div>
      <div v-if="$login.isAuthenticated" class="text-center">You are logged as {{$login.userProfile.name}}</div>
    </div>
  `,
};
