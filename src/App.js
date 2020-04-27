'use strict';

import Account from './components/Account.js';
import Login from './components/Login.js';

const routes = {
  'login': [Login],
  'account': [Account, function(url) {
    return {id: url.split('/')[1]};
  }],
};

const queryVars = (function() {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const res = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return res;
}());

for (const s of ['projectId', 'entrypoint', 'saasPartnerId', 'saasEntrypoint']) {
  if (queryVars[s]) {
    window.localStorage.setItem(s, queryVars[s]);
  }
}


export default {
  data() {
    return {
      configStorage: window.localStorage,
      config: {},
      currentRoute: window.location.hash,
      store, // will watch store changes
      page: 1,
      users: [{id: '123'}],
      totalUsers: 0,
      filters: {},
    };
  },

  beforeCreate() {
    if (!store.isConfigReady()) {
      window.location = '#settings';
    }
    const popstate = () => {
      this.currentRoute = window.location.hash;
    };
    window.addEventListener('popstate', popstate);
  },

  methods: {
    parseUrl(url) {
      const action = url.substring(1).split('/')[0];
      const r = routes[action] ? routes[action] : [List];

      return {
        component: r[0],
        props: r[1] ? r[1](url) : {},
      };
    },

    onSettings(settings) {
      store = new Store(window.localStorage);
      this.store = store;
    },
  },

  render(h) {
    const c = this.parseUrl(this.currentRoute);
    const opts = {
      props: {...c.props, store: this.store},
    };

    if (c.component === Settings) {
      opts.on = {
        settings: this.onSettings,
      };
    }

    return h(c.component, opts);
  },
};

