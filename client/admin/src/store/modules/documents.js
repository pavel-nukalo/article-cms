import api from '@/api';

const actions = {
  GET_MANY({ commit }, { collection, query, limit, skip, projection }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return api.post('/api/documents/get_many', { collection, query, limit, skip, projection })
      .then(response => response.data)
      .catch(() => commit('SET_ERROR', 'Failed to load list of documents.'))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  GET_DOCUMENT({ commit }, { collection, query }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return api.post('/api/documents/get', { collection, query })
      .then(response => response.data)
      .catch(() => commit('SET_ERROR', 'Failed to load document.'))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  CREATE_DOCUMENT({ commit }, { collection, doc }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return api.post('/api/documents/create', { collection, doc })
      .then(response => response.data)
      .catch(() => commit('SET_ERROR', 'Failed to create document.'))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  UPDATE_DOCUMENT({ commit }, { collection, query, doc }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return api.post('/api/documents/update', { collection, query, doc })
      .catch(() => commit('SET_ERROR', 'Failed to save document.'))
      .finally(() => commit('SET_PROCESSING', false));
  },
  
  DELETE_DOCUMENT({ commit }, { collection, query }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    return api.post('/api/documents/delete', { collection, query })
      .catch(() => commit('SET_ERROR', 'Failed to delete document.'))
      .finally(() => commit('SET_PROCESSING', false));
  },
};

export default {
  actions
};