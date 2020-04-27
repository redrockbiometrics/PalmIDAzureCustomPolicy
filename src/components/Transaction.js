'use strict';

export default {
  template: `
    <div>
      <user-login />
      <div v-if="$approveOidc.isAuthenticated" class="text-center">
        <h3 class="text-success">Transaction is approved</h3>
        <router-link :to="{name: 'home'}" @click="$approveOidc.signOut()" class="btn btn-secondary">Back</router-link>
      </div>
    </div>
  `,
};
