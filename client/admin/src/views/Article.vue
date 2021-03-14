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
      <h3 class="headline mt-3">Мета-теги страницы</h3>

      <v-text-field
        label="Last Modified"
        v-model="lastModified"
        disabled
      ></v-text-field>

      <v-text-field
        label="Name"
        v-model="doc.name"
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
      
      <h3 class="headline mt-3 mb-5">Заголовки страницы</h3>
      
      <v-select
        :items="articleTypes"
        label="Тип статьи"
        outlined
        v-model="doc.metadata.type"
      ></v-select>
      
      <v-text-field
        label="Название статьи"
        v-model="doc.articleName"
      ></v-text-field>

      <v-textarea
        label="Описание статьи"
        v-model="doc.description"
      ></v-textarea>
      
      <h3 class="headline mt-3 mb-3">Превью изображение страницы</h3>
      
      <image-loader
        :image="doc.preview ? doc.preview.image : null"
        @change="previewChange"
      />

      <v-col
        v-if="doc.content && doc.metadata.type == 'basic-article'"
        class="pa-0"
      >
        <h3 class="headline mt-3">Контент страницы</h3>

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
          v-if="create"
          @click="createDocument"
          color="blue"
          dark
        >
          Создать
        </v-btn>
      
        <v-btn
          v-else
          @click="updateDocument"
          color="blue"
          dark
        >
          Сохранить
        </v-btn>
      </v-col>
      
      <div v-if="!create">
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
              :to="'/articles' + doc.parent + '/' + doc.name + '/' + item.name"
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
          После создания страницы данное поле изменить будет нельзя.
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
      </div>      
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
import { Editor } from 'vue-editor-js';
import ImageLoader from '@/components/ImageLoader.vue';
import { imageToolConfig } from '@/assets/js/imageToolConfig';
import { lastModified } from '@/assets/js/lastModified';
import { orderUp, orderDown } from '@/assets/js/orderActions';
import CustomDialog from '@/components/CustomDialog';

export default {
  data() {
    return {
      doc: {
        name: this.$route.path.replace('articles', '').replace(/^.*[\\\/]/, ''),
        parent: this.$route.path.replace('/articles', '').replace(/[^\/]*$/, '').replace(/\/$/, ''),
        order: parseInt(this.$route.query.order),
        metadata: {
          type: 'basic-article',
          title: '',
          keywords: '',
          description: '',
          created: '',
          lastModified: '',
          author: {
            user_id: ''
          }
        },
        preview: null,
        content: null,
        statistics: {
          impressions: 0
        },
        articleName: '',
        description: ''
      },
      
      create: this.$route.query.create == 'true',
      
      articleTypes: [
        {
          text: 'Статья',
          value: 'basic-article'
        },
        {
          text: 'Категория',
          value: 'category'
        }
      ],
      
      children: [],
      
      childrenTableHeaders: [
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
  components: {
    CustomDialog,
    Editor,
    ImageLoader
  },
  computed: {
    lastModified,
    imageToolConfig
  },
  mounted() {
    if (this.create) this.doc.content = {};
    else this.fetchData();
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
      this.$store.dispatch('GET_DOCUMENT', {
        collection: 'articles',
        query: { 
          name: this.doc.name,
          parent: this.doc.parent
        }
      })
        .then((doc) => {
          if (doc) {
            delete doc._id;
            this.doc = doc;
          }
          
          return this.$store.dispatch('GET_MANY', {
            collection: 'articles',
            query: {
              parent: this.doc.parent + '/' + this.doc.name
            },
            projection: { 
              content: 0 
            }
          });
        })
        .then(children => {
          if (children) {
            children.sort((a, b) => a.order > b.order ? 1 : (b.order > a.order ? -1 : 0));
            
            this.children = children;
          }
        });      
    },
    
    async updateDocument() {
      if (this.$refs.editor) await this.$refs.editor.save();
      this.doc.metadata.lastModified = new Date().toISOString();
      this.doc.metadata.author = { user_id: this.$store.getters.getUser_id };
      
      this.$store.dispatch('UPDATE_DOCUMENT', {
        collection: 'articles',
        query: { 
          name: this.doc.name,
          parent: this.doc.parent
        },
        doc: this.doc
      });
    },
    
    async createDocument() {
      if (this.$refs.editor) await this.$refs.editor.save();
      this.doc.metadata.created = new Date().toISOString();
      this.doc.metadata.lastModified = new Date().toISOString();
      this.doc.metadata.author = { user_id: this.$store.getters.getUser_id };
      
      this.$store.dispatch('CREATE_DOCUMENT', {
        collection: 'articles',
        doc: this.doc
      })
        .then(() => {
          this.$router.replace({
            ...this.$router.currentRoute,
            query: {
              create: undefined,
            }
          });

          this.create = false;
        });
    },
    
    previewChange(image) {
      if (image) this.doc.preview = { image };
      else this.doc.preview = null
    },
    
    editorOnSave(response) {
      this.doc.content = response;
    },
    
    editorOnChange() {
      return Promise.resolve();
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
          parent: this.doc.parent + '/' + this.doc.name + '/' + this.selectedChild.name
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
                parent: this.doc.parent + '/' + this.doc.name
              }
            }).then(() => this.fetchData());
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
      this.$router.push(`/articles${this.doc.parent}/${this.doc.name}/${this.newDocument}?create=true&order=${this.children.length ? this.children[this.children.length - 1].order + 1 : 0}`);
    }
  },
}
</script>