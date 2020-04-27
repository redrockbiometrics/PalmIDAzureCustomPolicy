'use strict';

export default {
  template: `
    <div>
      <user-login />
      <div class="text-center">
        <h3 class="text-center">Hello!</h3>
        <router-link v-if="$login.isAuthenticated" :to="{name: 'transaction', params: {id: ''+Date.now() }}" class="btn btn-primary">Transfer money</router-link>
      </div>
    </div>
  `,
};
