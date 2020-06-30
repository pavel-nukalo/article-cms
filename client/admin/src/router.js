import Vue from 'vue';
import Router from 'vue-router';

import Signin from './views/Signin.vue';

import Index from './views/Index.vue';

import Search from './views/Search.vue';

import About from './views/About.vue';

import Contact from './views/Contact.vue';

import Terms from './views/Terms.vue';

import AllArticles from './views/AllArticles.vue';

import Articles from './views/Articles.vue';

import Article from './views/Article.vue';

import Settings from './views/Settings.vue';

import Robots from './views/Robots.vue';

import Ads from './views/Ads.vue';

import store from '@/store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isUserAuthenticated) {
    return next();
  }
  
  next({
    name: 'Index'
  });
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isUserAuthenticated) {
    return next();
  }
  
  next({
    name: 'Signin'
  });
};

export default new Router({
  routes: [
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/',
      redirect: '/index',
      beforeEnter: ifAuthenticated
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/all_articles',
      name: 'AllArticles',
      component: AllArticles,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/articles/*',
      name: 'Article',
      component: Article,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/robots.txt',
      name: 'Robots',
      component: Robots,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/ads.txt',
      name: 'Ads',
      component: Ads,
      beforeEnter: ifAuthenticated
    }
  ]
});