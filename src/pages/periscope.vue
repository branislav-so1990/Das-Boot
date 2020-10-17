<template>
  <f7-page class="p-periscope" @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">

    <!-- Audio files -->
    <audio id="click_sound">
      <source src="static/audio/cap_click.wav" type="audio/wav">
    </audio>
    <audio id="ticking_sound">
      <source src="static/audio/chrono.wav" type="audio/wav">
    </audio>


    <div class="periscope-wrapper">
      <img :src="zoom_toggled ? 'static/periscope_6x.jpg' : 'static/periscope_1,5x.jpg'" class="periscope-img">

      <label class="toggle toggle-init color-gray periscope-zoom">
        <span> {{ zoom_toggled ? '6x' : '1.5x' }} </span>
        <input type="checkbox" v-model='zoom_toggled' @change="toggle_zoom">
        <span class="toggle-icon"></span>
      </label>

      <input @change="updateData('vertical', $event.target.value)" type="text" placeholder="0.0" id="vertical-picker" class="ticks left">
      <input @change="updateData('horizontal', $event.target.value)" type="text" placeholder="0.0" id="horizontal-picker" class="ticks bottom">
    </div>

    <div class="recognition-manual">
      <img src="static/recognition-manual.png">
      <div class="ship-data height">
        <label for="mast-height">Mast height: </label>
        <input @change="updateInfo('mast_height', $event.target.value)" type="text" id="mast-height" placeholder="0.0">meters
      </div>
      <div class="ship-data length">
        <label for="ship-length">Ship length: </label>
        <input @change="updateInfo('length', $event.target.value)" type="text" id="ship-length" placeholder="100">meters
      </div>
    </div>

    <h1>distance: {{distance}}</h1>

  </f7-page>
</template>

<script>
  import { f7Page, f7Toggle } from 'framework7-vue';

  export default {
    components: {
      f7Page, f7Toggle
    },
    data() {
      return {
        zoom_toggled: true,
        marks: {
          vertical: 0,
          horizontal: 0,
        },
        ship: {
          mast_height: 0,
          length: 0,
          speed: 35
        },

        // results to show
        distance: 0
      }
    },
    methods: {
      run_audio() {
        var sound = document.getElementById('click_sound')
        sound.play()
      },
      toggle_zoom() {
        this.run_audio()
        this.measureDistance()
      },
      updateData(position, value) {
        this.marks[position] = value
        this.measureDistance()
      },
      updateInfo(position, value) {
        this.ship[position] = value
        this.measureDistance()
      },
      measureDistance() {
        // Distance = ((mast height * 100) / height in scope) * 4 if zoomed
        if(this.zoom_toggled) {
          this.distance = Math.round( ((this.ship.mast_height * 100) / this.marks.vertical) * 4)
        }else {
          this.distance = Math.round( ((this.ship.mast_height * 100) / this.marks.vertical))
        }
      },
      onPageInit(e) {
        const self = this
        const app = self.$f7

        // Vertical-picker / periscope
        self.pickerDescribe = app.picker.create({
          inputEl: '#vertical-picker',
          rotateEffect: true,
          formatValue(values, displayValues) {
            return `${values[0]}.${values[1]}`;
          },
          renderToolbar() {
            return '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<span>Vertical</span>' +
                '</div>' +
                '<div class="right">' +
                '<a href="#" class="link sheet-close popover-close">Done</a>' +
                '</div>' +
                '</div>' +
                '</div>';
          },
          cols: [
            { values: (function createValues() {
                const arr = [];
                for (let i = 0; i <= 20; i += 1) { arr.push(i); }
                return arr;
              }())
            },
            { divider: true, content: '.' },
            { values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]},
            { divider: true, content: 'marks' }
          ],
          on: {

          }
        }) // end of app picker
        

        // Horizontal-picker / periscope
        self.pickerDescribe = app.picker.create({
          inputEl: '#horizontal-picker',
          rotateEffect: true,
          formatValue(values, displayValues) {
            return `${values[0]}.${values[1]}`;
          },
          renderToolbar() {
            return '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<span>Horizontal</span>' +
                '</div>' +
                '<div class="right">' +
                '<a href="#" class="link sheet-close popover-close">Done</a>' +
                '</div>' +
                '</div>' +
                '</div>';
          },
          cols: [
            { values: (function createValues() {
                const arr = [];
                for (let i = 0; i <= 40; i += 1) { arr.push(i); }
                return arr;
              }()),
            },
            { divider: true, content: '.' },
            { values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0] },
            { divider: true, content: 'marks' }
          ],
          on: {

          }
        })




        // Vertical-picker / Ship data
        self.pickerDescribe = app.picker.create({
          inputEl: '#mast-height',
          rotateEffect: true,
          formatValue(values, displayValues) {
            return `${displayValues[0]}.${values[1]}`;
          },
          renderToolbar() {
            return '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<span>Mast height</span>' +
                '</div>' +
                '<div class="right">' +
                '<a href="#" class="link sheet-close popover-close">Done</a>' +
                '</div>' +
                '</div>' +
                '</div>';
          },
          cols: [
            { values: (function createValues() {
                const arr = [];
                for (let i = 0; i <= 40; i += 1) { arr.push(i); }
                return arr;
              }())
            },
            { divider: true, content: '.' },
            { values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
              onChange(picker) {

              }},
            {
              divider: true,
              content: 'meters'
            },
          ],
          on: {
            change(input) {

            }
          }
        })

        // Horizontal-picker / Ship data
        self.pickerCustomToolbar = app.picker.create({
          inputEl: '#ship-length',
          rotateEffect: true,
          formatValue(values) {
            return values[0]+values[1]+values[2];
          },
          renderToolbar() {
            return '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<span>Ship length</span>' +
                '</div>' +
                '<div class="right">' +
                '<a href="#" class="link sheet-close popover-close">Done</a>' +
                '</div>' +
                '</div>' +
                '</div>';
          },
          cols: [
            {
              divider: false,
              values: [1, 2, 3],
            },
            {
              divider: false,
              values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            },
            {
              divider: false,
              values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            },
            {
              divider: true,
              content: 'meters'
            },
          ],
          on: {

          },
        });
      },
      onPageBeforeRemove() {
        const self = this;
        self.pickerDevice.destroy();
        self.pickerDescribe.destroy();
        self.pickerDependent.destroy();
        self.pickerCustomToolbar.destroy();
      },
    },
  };
</script>

<style>
  .p-periscope {
    background-color: #0c0d08;
  }
  .periscope-wrapper {
    background-color: #0c0d08;
    position: relative;
  }
  .periscope-img {
    display: block;
    max-width: 90%;
    max-height: 320px;
    margin: 0 auto;
  }
  .periscope-zoom {
    position: absolute;
    top: 5%;
    right: 5%;
  }
  .periscope-zoom span {
    display: block;
    text-align: center;
    margin-bottom: 3px;
  }

  .ticks {
    background-color: black!important;
    border-radius: 5px!important;
    text-align: center;
    font-size: 18px!important;
    padding: 5px 0 10px;
    line-height: 30px;
    max-width: 50px;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
  }
  input[type="text"] {
    font-family: "TGL 0-17", Arial, sans-serif;
  }
  .ticks.bottom {
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
  }

  .recognition-manual {
    /*border: 1px dashed red;*/
    text-align: center;
    position: relative;
  }
  .ship-data {
    min-width: 200px;
    position: absolute;
    text-align: left;
    color: black;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .ship-data.height {
    top: 50%;
  }
  .ship-data.length {
    top: 63%;
  }
  .ship-data input {
    font-size: 16px;
    background-color: rgba(0,0,0,0.1);
    text-align: right;
    padding: 2px 5px;
    margin: 0 3px;
    max-width: 40px;
  }

</style>