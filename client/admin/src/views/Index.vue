<template>
  <v-container>
    <v-layout column>
      <h3 class="headline mt-3">Meta Tags</h3>

      <v-text-field
        label="Last Modified"
        v-model="lastModified"
        disabled
      ></v-text-field>

      <v-text-field
        label="Title"
        v-model="doc.metadata.title"
      ></v-text-field>

      <v-text-field
        label="Keywords"
        v-model="doc.metadata.keywords"
      ></v-text-field>

      <v-textarea
        label="Description"
        v-model="doc.metadata.description"
      ></v-textarea>
      
      <v-col
        v-if="doc.content"
        class="pa-0"
      >
        <h3 class="headline mt-3">Content</h3>

        <editor
          :image="imageToolConfig"

          header
          list
          paragraph
          raw
          delimiter
          code
          warning
          quote
          marker
          linkTool
          inlineCode
          table

          :autofocus="false"
          :init-data="doc.content"
          ref="editor"
          @change="editorOnChange"
          @save="editorOnSave"
        />
      </v-col>

      <v-col
        class="text-left pl-0"
      >
        <v-btn
          @click="updateDocument"
          color="blue"
          :dark = "!processing"
          :disabled = "processing"
        >
          Save
        </v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
import { Editor } from 'vue-editor-js';
import { imageToolConfig } from '@/assets/js/imageToolConfig';
import { lastModified } from '@/assets/js/lastModified';

export default {
  data() {
    return {
      doc: {
        name: '',
        metadata: {
          type: 'basic-article',
          title: '',
          keywords: '',
          description: '',
          created: '',
          lastModified: '',
          author: null
        },
        content: null
      }
    };
  },
  components: {
    Editor
  },
  computed: {
    lastModified,
    imageToolConfig,
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  mounted() {
    this.$store.dispatch('GET_DOCUMENT', {
      collection: 'service',
      query: { 
        name: 'index'
      }
    })
      .then((doc) => {
        if (doc) {
          delete doc._id;
          this.doc = doc;
        }
      });
  },
  methods: {
    async updateDocument() {
      if (this.$refs.editor) await this.$refs.editor.save();
      this.doc.metadata.lastModified = new Date().toISOString();
      this.doc.metadata.author = { user_id: this.$store.getters.getUser_id };
      
      this.$store.dispatch('UPDATE_DOCUMENT', {
        collection: 'service',
        query: { 
          name: 'index'
        },
        doc: this.doc
      });
    },
    
    editorOnSave(response) {
      this.doc.content = response;
    },
    editorOnChange() {
      return Promise.resolve();
    }
  }
}
</script>