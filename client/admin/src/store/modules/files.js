import api from '@/api';

const actions = {
  async UPLOAD_FILE({ commit }, { directory, file, name }) {
    commit('CLEAN_ERROR');
    commit('SET_PROCESSING', true);

    if (file == undefined || typeof directory != 'string' || typeof name != 'string') {
      commit('SET_ERROR', 'Failed to upload file.');
      commit('SET_PROCESSING', false);
      return false;
    }

    const chunkSize = 1000 * 1024;

    let reader = new FileReader();
    let start = 0;

    try {
      while (start < file.size) {
        let nextChunk = start + chunkSize + 1;
        let blob = file.slice(start, nextChunk);

        let content = await new Promise(resolve => {
          reader.onloadend = function (event) {
            if (event.target.readyState !== FileReader.DONE) return;

            resolve(reader.result);
          };

          reader.readAsDataURL(blob);
        });

        const payload = {
          directory,
          content,
          name,
          append: start == 0 ? false : true
        };

        await api.post('/api/static_files/upload', payload);

        start = nextChunk;
      }
    } catch (err) {
      commit('SET_PROCESSING', false);
      commit('SET_ERROR', 'Failed to upload file.');
      return false;
    }

    commit('SET_PROCESSING', false);
    return true;
  }  
};

export default {
  actions
};