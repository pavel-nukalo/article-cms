import { generate } from 'randomstring';

export const imageToolConfig = function () {
  return {
    config: {
      uploader: {
        uploadByFile: file => {
          const name = `${generate(16)}.${ file.type.split('/')[1] }`;
          
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