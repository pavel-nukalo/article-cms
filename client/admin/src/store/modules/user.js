const state = {
  email: localStorage.getItem('user_email') || '',
  _id: localStorage.getItem('user_id') || ''
};

const getters = {
  getUserEmail: state => state.email,
  getUser_id: state => state._id
};

const mutations = {
  SET_USER_EMAIL(state, payload) { 
    state.email = payload;
    localStorage.setItem('user_email', payload);
  },
  SET_USER_ID(state, payload) { 
    state._id = payload;
    localStorage.setItem('user_id', payload);
  }
};

export default {
  state,
  getters,
  mutations
};