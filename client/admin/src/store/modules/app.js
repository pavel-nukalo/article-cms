import { set, toggle } from '@/utils/vuex';

const state = {
  processing: false,
  error: null,
  drawer: null
};

const getters = {
  getProcessing: state => state.processing,
  getError: state => state.error,
  getDrawer: state => state.drawer
};

const mutations = {
  SET_PROCESSING: set('processing'),
  SET_ERROR: set('error'),
  CLEAN_ERROR: state => { state.error = null; },
  setDrawer: set('drawer'),
  toggleDrawer: toggle('drawer')
};

export default {
  state,
  getters,
  mutations
};