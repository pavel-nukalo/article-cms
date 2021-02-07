<template>
  <v-container>
    <v-btn
      @click="$router.go(-1)"
      color="blue"
      dark
      class="mb-3 mt-3"
    >
      <v-icon left>fa-chevron-left</v-icon>
      Назад
    </v-btn>
    
    <v-layout column>
      <h3 class="headline mt-3">Список вложенных страниц:</h3>
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
            class="ml-3"
          >
            <v-icon small>fa-arrow-up</v-icon>
          </v-btn>
          
          <v-btn
            :disabled="item.order == children[children.length - 1].order"
            icon
            @click="orderDown(item)"
            small
            class="ml-3"
          >
            <v-icon small >fa-arrow-down</v-icon>
          </v-btn>
          
          <v-btn
            icon
            :to="'/articles/' + item.name"
            small
            class="ml-3"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          
          <v-btn
            icon
            @click="deleteChild(item)"
            small
            class="ml-3 mr-3"
          >
            <v-icon>delete_outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <h3 class="headline mt-3">Создать вложенную страницу:</h3>

      <v-alert
        class="mt-3"
        outlined
        type="warning"
        prominent
        border="left"
      >
        После создания статьи данное поле изменить будет нельзя.
      </v-alert>

      <v-text-field
        label="Name"
        v-model="newDocument"
        @keypress="filterNewDocument($event)"
      ></v-text-field>

      <v-col
        class="text-left pl-0"
      >
        <v-btn
          color="success"
          @click="handleCreateNewDocument"
        >
            Создать
        </v-btn>
      </v-col>
    </v-layout>

    <custom-dialog
      v-if="showDeleteDialog"
      :show="showDeleteDialog"
      card-title="Удалить страницу"
      :card-text="`Вы действительно хотите удалить страницу '${selectedChild.articleName}'? Отменить это действие будет нельзя.`"
      button-title="Удалить"
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
      children: [],
      
      childrenTableHeaders:[
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
        {
          text: 'Название статьи',
          value: 'articleName'
        },
        {
          text: 'Действия',
          value: 'actions',
          align: 'right'
        }
      ],
      
      newDocument: '',
      showDeleteDialog: false,
      selectedChild: null
    };
  },
  mounted() {
    this.fetchData();
  },
  components: {
    CustomDialog
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
            this.$store.commit('SET_ERROR', 'Ошибка удаления! Данная страница содержит вложенные страницы.');
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
        this.$store.commit('SET_ERROR', 'Поле Name не может быть пустым.');
        return;
      }

      this.$store.commit('CLEAN_ERROR');
      this.$router.push(`/articles/${this.newDocument}?create=true&order=${this.children.length ? this.children[this.children.length - 1].order + 1 : 0}`);
    }
  }
}
</script>