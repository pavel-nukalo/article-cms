import axios from 'axios';

const state = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated'))
};

const getters = {
  isUserAuthenticated: state => state.isAuthenticated
};

const mutations = {
  SET_USER_AUTHENTICATED(state, payload) {
    state.isAuthenticated = payload;
    localStorage.setItem('isAuthenticated', payload);
  }
};

const actions = {
  SIGNIN({ commit }, payload) {
    commit('SET_PROCESSING', true);
    commit('CLEAN_ERROR');

    return axios.post('/api/authentication/signin', payload)
      .then(response => response.data)
      .then(user => {
        commit('SET_USER_AUTHENTICATED', true);
        commit('SET_USER_EMAIL', user.email);
        commit('SET_USER_ID', user._id);
      })
      .catch(() => commit('SET_ERROR', "Ошибка! Адрес электронной почты или пароль введены неверно."))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  SIGNOUT({ commit }) {
    commit('SET_PROCESSING', true);
    commit('CLEAN_ERROR');
    
    return axios.post('/api/authentication/signout')
      .then(() => {
        commit('SET_USER_AUTHENTICATED', false);
        commit('SET_USER_EMAIL', '');
        commit('SET_USER_ID', '');
      })
      .catch(() => commit('SET_ERROR', "Ошибка! Выход из системы не выполнен."))
      .finally(() => commit('SET_PROCESSING', false));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};