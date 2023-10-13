<template>
  <v-container>
    <v-btn
      @click="$router.go(-1)"
      color="blue"
      dark
      class="mb-3 mt-3"
    >
      <v-icon left>mdi-arrow-left</v-icon>
      Back
    </v-btn>
    
    <v-layout column>
      <h3 class="headline mt-3">Nested Pages</h3>
      <v-data-table
        :headers="childrenTableHeaders"
        :items="children"
        class="elevation-1 mt-3"
      >      
        <template v-slot:item.actions="{ item }">
          <v-btn
            :disabled="item.order == children[0].order"
            icon
            @click="orderUp(item)"
            small
            class="mr-3"
          >
            <v-icon small>mdi-arrow-up</v-icon>
          </v-btn>
          
          <v-btn
            :disabled="item.order == children[children.length - 1].order"
            icon
            @click="orderDown(item)"
            small
            class="mr-3"
          >
            <v-icon small >mdi-arrow-down</v-icon>
          </v-btn>
          
          <v-btn
            icon
            :to="'/articles/' + item.name"
            small
            class="mr-3"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          
          <v-btn
            icon
            @click="deleteChild(item)"
            small
            class="mr-3"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <h3 class="headline mt-3">Create Nested Page</h3>

      <v-text-field
        label="Pathname"
        v-model="newDocument"
        @keypress="filterNewDocument($event)"
      ></v-text-field>

      <v-col
        class="text-left pl-0"
      >
        <v-btn
          color="success"
          @click="handleCreateNewDocument"
          :dark = "!processing"
          :disabled = "processing"
        >
            Create
        </v-btn>
      </v-col>
    </v-layout>

    <custom-dialog
      v-if="showDeleteDialog"
      :show="showDeleteDialog"
      card-title="Delete Page"
      :card-text="`Are you sure you want to delete page '${selectedChild.articleName}'? This action is not reversible.`"
      button-title="Delete"
      button-color="error"
      @handle="handleDeleteChild"
      @close="handleCloseDeleteChild"
    />
  </v-container>
</template>

<script>
import { orderUp, orderDown } from '@/assets/js/orderActions';
import CustomDialog from '@/components/CustomDialog';

export default {
  data() {
    return {      
      articleStatuses: [
        {
          text: 'Unpublished',
          value: 'unpublished'
        },
        {
          text: 'Published',
          value: 'published'
        }
      ],

      articleTypes: [
        {
          text: 'Basic Article',
          value: 'basic-article'
        },
        {
          text: 'Category',
          value: 'category'
        }
      ],

      children: [],
      
      childrenTableHeaders:[
        {
          text: 'Pathname',
          align: 'left',
          value: 'name',
        },
        {
          text: 'Article Name',
          value: 'articleName'
        },
        {
          text: 'Type',
          value: 'metadata.type'
        },
        {
          text: 'Status',
          value: 'metadata.status'
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'right'
        }
      ],
      
      newDocument: '',
      showDeleteDialog: false,
      selectedChild: null
    };
  },
  components: {
    CustomDialog
  },
  computed: {
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    filterNewDocument(e) {
      const char = String.fromCharCode(e.keyCode);

      let result = false;    
      if (/^[A-Za-z]+$/.test(char)) result = true;
      if (/[0-9]/.test(char)) result = true;
      if (char === '-') result = true;
      if (char === '_') result = true;
      if (char === '.') result = true;

      if (!result) e.preventDefault();
    },

    fetchData() {
      this.$store.dispatch('GET_MANY', {
        collection: 'articles',
        query: {
          parent: ''
        },
        projection: { 
          content: 0 
        }
      })
        .then(children => {
          if (children) {
            children.sort((a, b) => a.order > b.order ? 1 : (b.order > a.order ? -1 : 0));

            children.forEach(item => {
              item.metadata.type = (this.articleTypes.find(type => type.value == item.metadata.type) || { text: '-' }).text;
              item.metadata.status = (this.articleStatuses.find(status => status.value == item.metadata.status) || { text: '-' }).text;
            });
            
            this.children = children;
          }
        });      
    },
    
    orderUp,
    orderDown,
    
    deleteChild(item) {
      this.selectedChild = item;
      this.showDeleteDialog = true;
    },

    handleDeleteChild() {
      this.$store.dispatch('GET_MANY', {
        collection: 'articles',
        query: {
          parent: '/' + this.selectedChild.name,
        },
        projection: { 
          content: 0 
        }
      })
        .then(children => {
          if (children && children.length === 0) {
            return this.$store.dispatch('DELETE_DOCUMENT', {
              collection: 'articles',
              query: { 
                name: this.selectedChild.name,
                parent: ''
              }
            }).finally(() => this.fetchData());
          } else {
            this.$store.commit('SET_ERROR', 'Error! This page contains nested pages.');
          }
        })
        .finally(() => {
          this.handleCloseDeleteChild();
        });
    },

    handleCloseDeleteChild() {
      this.showDeleteDialog = false;
      this.selectedChild = null;
    },

    handleCreateNewDocument() {
      if (!this.newDocument) {
        this.$store.commit('SET_ERROR', 'The field "Pathname" cannot be empty.');
        return;
      }

      this.$store.commit('CLEAN_ERROR');
      this.$router.push(`/articles/${this.newDocument}?create=true&order=${this.children.length ? this.children[this.children.length - 1].order + 1 : 0}`);
    }
  }
}
</script>