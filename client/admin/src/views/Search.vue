<template>
  <v-container>
    <v-layout column>
      <h3 class="headline mt-3">Мета-теги страницы</h3>

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
        class="text-left pl-0"
      >
        <v-btn
          @click="updateDocument"
          color="blue"
          dark
        >
          Сохранить
        </v-btn>
      </v-col>
    </v-layout>
  </v-container>
</template>


<script>
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
        }
      }
    };
  },
  computed: {
    lastModified
  },
  mounted() {
    this.$store.dispatch('GET_DOCUMENT', {
      collection: 'service',
      query: { 
        name: 'search'
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
          name: 'search'
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