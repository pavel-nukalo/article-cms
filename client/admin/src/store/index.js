import Vue from 'vue'
import Vuex from 'vuex'

import app from '@/store/modules/app.js'
import authentication from '@/store/modules/authentication.js'
import documents from '@/store/modules/documents.js'
import files from '@/store/modules/files.js'
import user from '@/store/modules/user.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    authentication,
    documents,
    files,
    user
  }
});

export default store