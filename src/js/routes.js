import HomePage from '../pages/chronometer.vue';
import CatalogPage from '../pages/periscope.vue';
import SettingsPage from '../pages/settings.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
    options: {
      transition: 'f7-circle',
    },
  },
  {
    path: '/catalog/',
    component: CatalogPage,
    options: {
      transition: 'f7-circle',
    },
  },
  {
    path: '/settings/',
    component: SettingsPage,
    options: {
      transition: 'f7-circle',
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
    options: {
      transition: 'f7-circle',
    },
  },
];

export default routes;
