import { generate } from 'randomstring';
import mimeDb from 'mime-db';

export const imageToolConfig = function () {
  return {
    config: {
      uploader: {
        uploadByFile: file => {
          const mimeDbData = mimeDb[file.type];

          if (!(mimeDbData && mimeDbData.extensions[0])) return Promise.reject();

          const name = `${generate(16)}.${mimeDbData.extensions[0]}`;

          return this.$store.dispatch('UPLOAD_FILE', {
            directory: '/images/',
            file,
            name
          })
            .then(result => {
              if (result) {
                return {
                  success: 1,
                  file: {
                    url: `/static_files/images/${name}`
                  }
                };
              } else return Promise.reject();
            });
        }
      }
    }
  };
};