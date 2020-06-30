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
            @click="deleteChild(item.name)"
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
        @keydown.space="(event) => event.preventDefault()"
      ></v-text-field>

      <v-col
        class="text-left"
      >
      <v-btn
        color="success"
        :to="`/articles/${newDocument}?create=true&order=${this.children.length ? this.children[this.children.length - 1].order + 1 : 0}`"
      >
          Создать
        </v-btn>
      </v-col>     
    </v-layout>
  </v-container>
</template>

<script>
import { orderUp, orderDown } from '@/assets/js/orderActions';

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
      
      newDocument: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$store.dispatch('GET_MANY', {
        collection: 'articles',
        query: {
          parent: ''
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
    
    deleteChild(name) {
      this.$store.dispatch('DELETE_DOCUMENT', {
        collection: 'articles',
        query: { 
          name,
          parent: ''
        }
      })
        .then(() => this.fetchData());
    }   
  }
}
</script>