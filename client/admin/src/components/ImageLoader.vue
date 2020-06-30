<template lang="html">
  <v-row
    justify="center"
  >

    <v-col
      cols="10"
      md="7"
    >
      <v-file-input
        outlined
        accept="image/*"
        placeholder="Изображение"
        label="Выбрать файл"
        @change="upload"
        :clearable="false"
        v-model="fileInput"
      ></v-file-input>
    </v-col>
    
    <v-col
      cols="2"
      md="1"
    >
      <v-btn
        icon
        @click="clear"
        large
        class="mt-1 mr-1"
      >
        <v-icon>delete_outline</v-icon>
      </v-btn>
    </v-col>

    <v-col
      cols="8"
      md="6"
    >
      <v-img
        v-if="image"
        :src="image.file.url"
        class="grey lighten-2 ml-auto mr-auto"
        :max-width="previewMaxWidth"
      ></v-img>
    </v-col>
  </v-row>
</template>

<script>
import { imageToolConfig } from '@/assets/js/imageToolConfig';

export default {
  props: {
    image: Object,
    previewMaxWidth: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      fileInput: null
    };
  },
  computed: {
    imageToolConfig
  },
  methods: {
    upload(file) {
      if (!file) {
        this.$emit('change', null);
        return;
      }

      this.imageToolConfig.config.uploader.uploadByFile(file)
        .then(({ file }) => this.$emit('change', { file }))
        .catch(() => this.$emit('change', null))
    },
    
    clear() {
      this.fileInput = null;
      this.$emit('change', null);
    }
  }
}
</script>