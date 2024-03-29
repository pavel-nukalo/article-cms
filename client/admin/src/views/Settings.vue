<template>
  <v-container>
    <v-layout column>    
      <h3 class="headline mt-3">Project Properties</h3>
      
      <v-text-field
        label="Project Name"
        v-model="doc.projectName"
        class="mt-5"
      ></v-text-field>

      <v-row>
        <v-col
          cols="12"
          md="3"
        >
          <v-select
            :items="protocols"
            label="Protocol"
            outlined
            v-model="doc.protocol"
          ></v-select>
        </v-col>
        
        <v-col
          cols="12"
          md="9"
        >
          <v-text-field
            label="Domain"
            v-model="doc.domain"
          ></v-text-field>
        </v-col>
      </v-row>
      
      <h3 class="headline mt-3 mb-3">Project Logo</h3>
      
      <image-loader
        :image="doc.logo ? doc.logo.image : null"
        @change="logoChange"
        preview-max-width="256"
      />
      
      <h3 class="headline mt-3 mb-3">Project Favicon</h3>
      
      <image-loader
        :image="doc.icon.favicon ? doc.icon.favicon.image : null"
        @change="faviconChange"
        preview-max-width="48"
      />
      
      <h3 class="headline mt-3">Navbar Links</h3>
      
      <v-data-table
        :headers="navbarLinksTableHeaders"
        :items="doc.components.navbar.links"
        :items-per-page="5"
        class="elevation-1 mt-3"
      >        
        <template v-slot:item.actions="{ item }">          
          <v-btn
            icon
            @click="deleteNavbarLink(item.url)"
            small
            class="mr-3"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="pb-0"
        >
          <v-text-field
            label="Url"
            outlined
            v-model="newNavbarLink.url"
          ></v-text-field>
        </v-col>
        
        <v-col
          cols="12"
          md="6"
          class="pb-0"
        >
          <v-text-field
            label="Anchor"
            outlined
            v-model="newNavbarLink.anchor"
          ></v-text-field>
        </v-col>
        
        <v-col 
          class="pt-0"
        >
          <v-btn
            @click="addNavbarLink"
            color="blue"
            :dark = "!processing"
            :disabled = "processing"
          >
            Add
          </v-btn>
        </v-col>
      </v-row>
      
      <h3 class="headline mt-3">Contents of Page Components</h3>
      
      <v-textarea
        label="Additional in <head> Tag"
        v-model="doc.components.head.html"
        outlined
        class="mt-5"
      ></v-textarea>
      
      <v-textarea
        label="Additional Scripts"
        v-model="doc.components.scripts.html"
        outlined
      ></v-textarea>
      
      <v-textarea
        label="Comment Block"
        v-model="doc.components.comments.html"
        outlined
      ></v-textarea>

      <v-textarea
        label="Social Network Block"
        v-model="doc.components.shareLinks.html"
        outlined
      ></v-textarea>

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
import ImageLoader from '@/components/ImageLoader.vue';

export default {
  data() {
    return {
      doc: {
        name: '',
        projectName: '',
        domain: '',
        protocol: '',
        components: {
          navbar: {
            links: []
          },
          head: {
            html: ''
          },
          scripts: {
            html: ''
          },
          comments: {
            html: ''
          },
          shareLinks: {
            html: ''
          }
        },
        logo: null,
        icon: {
          favicon: null
        }
      },
      
      protocols: [
        'http://',
        'https://'
      ],
      
      navbarLinksTableHeaders: [
        {
          text: 'Url',
          align: 'left',
          value: 'url',
        },
        {
          text: 'Anchor',
          value: 'anchor'
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'right'
        }
      ],
      
      newNavbarLink: {
        url: '',
        anchor: ''
      }
    };
  },
  components: {
    ImageLoader
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
        name: 'common'
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
      this.$store.dispatch('UPDATE_DOCUMENT', {
        collection: 'service',
        query: { 
          name: 'common'
        },
        doc: this.doc
      });
    },
    
    logoChange(image) {
      if (image) this.doc.logo = { image };
      else this.doc.logo = null
    },
    
    faviconChange(image) {
      if (image) this.doc.icon.favicon = { image };
      else this.doc.icon.favicon = null
    },
    
    deleteNavbarLink(url) {
      const index = this.doc.components.navbar.links.findIndex(l => l.url === url);
      
      this.doc.components.navbar.links.splice(index, 1);
    },
    
    addNavbarLink() {
      this.doc.components.navbar.links.push(Object.assign({}, this.newNavbarLink));
      this.newNavbarLink.url = '';
      this.newNavbarLink.anchor = '';
    }
  }
}
</script>