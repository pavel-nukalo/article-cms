<template>
  <v-container>
    <v-layout column>
      <v-col
        class="mt-5 pt-5 pb-0"
      >
        <v-textarea
          v-model="doc.content"
          outlined
          label="Content"
          placeholder="User-agent: *"
        >
        </v-textarea>
      </v-col>

      <v-col
        class="text-left"
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
export default {
  data() {
    return {
      doc: {
        name: '',
        content: ''
      }
    };
  },
  computed: {
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  mounted() {
    this.$store.dispatch('GET_DOCUMENT', {
      collection: 'service',
      query: { 
        name: 'robots'
      }
    })
      .then(doc => {
        if (doc) {
          delete doc._id;
          this.doc = doc;
        }
      });
  },
  methods: {
    updateDocument() {
      this.$store.dispatch('UPDATE_DOCUMENT', {
        collection: 'service',
        query: { 
          name: 'robots'
        },
        doc: this.doc
      });
    }
  }
}
</script>