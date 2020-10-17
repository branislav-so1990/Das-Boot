<template>
<f7-app :params="f7params" theme-dark>

  <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas">

    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:stopwatch" icon-aurora="f7:stopwatch" icon-md="material:alarm" text="Chronometer"></f7-link>
      <f7-link tab-link="#view-catalog" icon-ios="f7:scope" icon-aurora="f7:scope" icon-md="material:scope" text="Periscope"></f7-link>
      <f7-link tab-link="#view-settings" icon-ios="f7:gear" icon-aurora="f7:gear" icon-md="material:settings" text="Settings"></f7-link>
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main tab tab-active url="/"></f7-view>
    <f7-view id="view-catalog" name="catalog" tab url="/catalog/"></f7-view>
    <f7-view id="view-settings" name="settings" tab url="/settings/"></f7-view>

  </f7-views>


  
</f7-app>
</template>

<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        loading: true,
        // Framework7 Parameters
        f7params: {
          id: 'com.bane_so_90@hotmail.com', // App bundle ID
          name: 'Das Boot', // App name
          theme: 'ios', // Automatic theme detection
          // App root data
          data: function () {
            return {

            }
          },

          // App routes
          routes: routes,


          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },
      }
    },
    methods: {
      
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    }
  }
</script>