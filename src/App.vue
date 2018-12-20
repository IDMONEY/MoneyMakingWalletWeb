<template>    
    <div id="app">        
        <div v-if="account.status.loggingIn">
            <div class="page-container md-layout-column">
                <NavigationComponent/>
            </div>
        </div>
        <md-content>
            <transition name="page" mode="out-in">
                <router-view/>
            </transition>      
        </md-content>
        <div>        
            <toast position="n"></toast>
        </div>
    </div>
</template>

<script>

const default_layout = "default";

import { mapState, mapActions } from 'vuex';
import Vue from 'vue';
import {MdButton,MdContent,MdCheckbox,MdField,MdIcon,MdDialog,MdDrawer,MdToolbar,MdList} from 'vue-material/dist/components'
import BootstrapVue from 'bootstrap-vue';    
import NavigationComponent from '@/components/NavigationComponent.vue';
import { Toast } from 'vuex-toast';
import 'vuex-toast/dist/vuex-toast.css';

Vue.use(BootstrapVue);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdToolbar);
Vue.use(MdField);
Vue.use(MdIcon);
Vue.use(MdDrawer);
Vue.use(MdDialog);
Vue.use(MdList);
Vue.use(require('vue-moment'))

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert,
            account: state => state.account    
        }),
    },
    methods: {
        ...mapActions({
            ...mapActions('account', ['logout']),  
        })
    },
    watch: {
        $route (to, from){
        }
    },
    components :{
        NavigationComponent, Toast
    }
};
</script>

<style>

  /*body{
    background-color: #f0f2f5;
  }*/

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;    
  }

  .mat{
      font-size:12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.16), 0 4px 8px rgba(0,0,0,0.23);
      background-color: #cdcdcd;
  }  

  .md-field .md-input, .md-field .md-textarea {    
    background-color: white;
  }

  .component-container{
      background: #fff;
        padding: 10px 10px 0;
        margin-bottom: 10px;
  }

table th{
    position: relative;
    text-overflow: ellipsis;
    vertical-align: middle;
    word-wrap: normal;
    /*border-bottom: 1px solid #ebeef5;*/
}
table th.text-left,table td.text-left{text-align: left}
table th.text-right,table td.text-right{text-align: right}
table tr>td {
    text-align: left;
}
table tr:hover>td {
    background-color: #f5f7fa;
}
    .md-toolbar{
        background-color: #F5B335 !important;
    }


    .margin-top-10{margin-top:10px;}
    .margin-top-15{margin-top:15px;}
    .margin-top-20{margin-top:20px;}
    .margin-top-25{margin-top:25px;}
    .margin-top-30{margin-top:30px;}
      .padding-top-10{
      padding-top: 10px
  }
</style>
