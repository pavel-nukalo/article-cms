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
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title
        class="ml-3"
      >
        <span class="hidden-sm-and-down ml-2">Article CMS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

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
            icon: 'mdi-home',
            text: 'Main Page',
            path: {
              path: '/index'
            },
            click: () => {}
          },
          {
            icon: 'mdi-magnify',
            text: 'Search',
            path: {
              path: '/search'
            },
            click: () => {}
          },
          {
            icon: 'mdi-book',
            text: 'About',
            path: {
              path: '/about'
            },
            click: () => {}
          },
          {
            icon: 'mdi-account-box',
            text: 'Contact',
            path: {
              path: '/contact'
            },
            click: () => {}
          },
          {
            icon: 'mdi-file-certificate',
            text: 'Terms',
            path: {
              path: '/terms'
            },
            click: () => {}
          },
          {
            icon: 'mdi-folder-open',
            text: 'All Articles',
            path: {
              path: '/all_articles'
            },
            click: () => {}
          },
          {
            icon: 'mdi-file-edit',
            text: 'Article Editor',
            path: {
              path: '/articles'
            },
            click: () => {}
          },
          {
            icon: 'mdi-cog',
            text: 'Settings',
            path: {
              path: '/settings'
            },
            click: () => {}
          },
          {
            icon: 'mdi-web-check',
            text: 'Robots.txt File',
            path: {
              path: '/robots.txt'
            },
            click: () => {}
          },
          {
            icon: 'mdi-credit-card-check-outline',
            text: 'Ads.txt File',
            path: {
              path: '/ads.txt'
            },
            click: () => {}
          },
          {
            icon: 'mdi-logout',
            text: 'Signout',
            click: () => {
              this.$store.dispatch('SIGNOUT')
                .then(() => {
                  this.$router.push('/signin');
                });
            }
          }
        ] : [
          {
            icon: 'mdi-login',
            text: 'Signin',
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
