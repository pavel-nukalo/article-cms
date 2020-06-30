<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-item
            :key="item.text"
            :to="item.path"
            @click="item.click"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
      color="blue"
    >
      <v-btn
        icon
        class="ml-0"
        @click.stop="toggleDrawer"
      >
        <v-icon>fa-bars</v-icon>
      </v-btn>
      <v-toolbar-title
        class="ml-3"
      >
        <span class="hidden-sm-and-down ml-2">Article CMS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title
        class="ml-3"
        v-if="this.$store.getters.isUserAuthenticated"
      >
        <span>{{ email }}</span>

        <v-btn
          icon
          class="mr-3"
        >
          <v-icon>far fa-user</v-icon>
        </v-btn>
      </v-toolbar-title> -->

      <v-btn
        icon
        class="mr-3"
      >
        <v-avatar
          size="30"
          tile
        >
          <v-img :src="require('@/assets/img/logo_white.png')" />
        </v-avatar>
      </v-btn>

      <v-progress-linear
        :indeterminate="true"
        class="mt-0"
        color="blue"
        absolute
        style="bottom: -4px;"
        v-if="processing"
      >
      </v-progress-linear>
    </v-app-bar>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data() {
      return {

      };
    },
    computed: {
      isUserAuthenticated() {
        return this.$store.getters.isUserAuthenticated;
      },
      processing() {
        return this.$store.getters.getProcessing;
      },
      email() {
        return this.$store.getters.getUserEmail;
      },
      drawer: {
        get() {
          return this.$store.getters.getDrawer;
        },
        set(val) {
          this.setDrawer(val);
        }
      },      
      items() {
        return this.isUserAuthenticated
        ? [
          {
            icon: 'fa-home',
            text: 'Главная страница',
            path: {
              path: '/index'
            },
            click: () => {}
          },
          {
            icon: 'fa-search',
            text: 'Страница поиска',
            path: {
              path: '/search'
            },
            click: () => {}
          },
          {
            icon: 'fa-book',
            text: 'О проекте',
            path: {
              path: '/about'
            },
            click: () => {}
          },
          {
            icon: 'fa-map-marker-alt',
            text: 'Контакты',
            path: {
              path: '/contact'
            },
            click: () => {}
          },
          {
            icon: 'fa-university',
            text: 'Условия использования',
            path: {
              path: '/terms'
            },
            click: () => {}
          },
          {
            icon: 'fa-folder-open',
            text: 'Все статьи',
            path: {
              path: '/all_articles'
            },
            click: () => {}
          },
          {
            icon: 'fa-edit',
            text: 'Редактор статей',
            path: {
              path: '/articles'
            },
            click: () => {}
          },
          {
            icon: 'fa-cog',
            text: 'Настройки',
            path: {
              path: '/settings'
            },
            click: () => {}
          },
          {
            icon: 'fa-file',
            text: 'Файл robots.txt',
            path: {
              path: '/robots.txt'
            },
            click: () => {}
          },
          {
            icon: 'fa-money-check-alt',
            text: 'Файл ads.txt',
            path: {
              path: '/ads.txt'
            },
            click: () => {}
          },
          {
            icon: 'fa-sign-out-alt',
            text: 'Выйти',
            click: () => {
              this.$store.dispatch('SIGNOUT')
                .then(() => {
                  this.$router.push('/signin');
                });
            }
          }
        ] : [
          {
            icon: 'fa-sign-in-alt',
            text: 'Войти',
            path: {
              path: '/signin'
            },
            click: () => {}
          }
        ];
      }
    },
    methods: {
      ...mapMutations(['setDrawer', 'toggleDrawer'])
    }    
  }
</script>

<style scoped>
  .v-icon {
    font-size: 1.4em !important;
  }
</style>
