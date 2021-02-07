import axios from 'axios';

const actions = {
  GET_MANY({ commit }, { collection, query, limit, skip, projection }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return axios.post('/api/documents/get_many', { collection, query, limit, skip, projection })
      .then(response => response.data)
      .catch(() => commit('SET_ERROR', "Ошибка при загрузке списка документов."))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  GET_DOCUMENT({ commit }, { collection, query }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return axios.post('/api/documents/get', { collection, query })
      .then(response => response.data)
      .catch(() => commit('SET_ERROR', "Ошибка при загрузке документа."))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  CREATE_DOCUMENT({ commit }, { collection, doc }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return axios.post('/api/documents/create', { collection, doc })
      .catch(() => commit('SET_ERROR', "Ошибка при создании документа."))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  UPDATE_DOCUMENT({ commit }, { collection, query, doc }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return axios.post('/api/documents/update', { collection, query, doc })
      .catch(() => commit('SET_ERROR', "Ошибка при сохранении документа."))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  DELETE_DOCUMENT({ commit }, { collection, query }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return axios.post('/api/documents/delete', { collection, query })
      .catch(() => commit('SET_ERROR', "Ошибка при удалении документа."))
      .finally(() => commit('SET_PROCESSING', false));
  },
};

export default {
  actions
};