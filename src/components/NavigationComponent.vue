<template>    
    <div v-if="account.status.loggingIn">
        <div class="page-container md-layout-column">
            <md-toolbar class="md-primary">
                <div class="md-toolbar-section-start">
                    <md-button class="md-icon-button" @click="showNavigation = true">
                        <md-icon>menu</md-icon>
                    </md-button>
                    <span class="md-title">ID Money</span>
                </div>
                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button" @click="refresh()">
                        <md-icon>refresh</md-icon>
                    </md-button>
                    <md-button class="md-primary" @click="logout_()">Logout</md-button>
                </div>
            </md-toolbar>
            <md-drawer :md-active.sync="showNavigation">
                <md-toolbar class="md-transparent" md-elevation="0">
                    <span class="md-title ta">ID Money</span>
                </md-toolbar>
                <md-list>
                    <md-list-item v-for="(item, i) in items" :key="i">
                        <md-icon>{{item.icon}}</md-icon>
                        <span class="md-list-item-text" @click="showNavigation = false"><router-link :to="item.path">{{item.title}}</router-link></span>
                    </md-list-item>        
                    <md-list-item>
                        <md-icon>exit_to_app</md-icon>
                        <span class="md-list-item-text" @click="logout_()">Logout</span>
                    </md-list-item>        
                </md-list>
            </md-drawer>                
        </div>
    </div>
</template>

<script>    

    import fab from 'vue-fab';
    import { mapState, mapActions } from 'vuex';
    import { router } from '../router';

    export default {
        name: 'NavigationComponent',
        components: { fab },

        data () {
            return {      
                showNavigation: false,           
                items: []
            }
        },

        computed: {
            ...mapState({
                account: state => state.account                         
            })
        },
        
        methods:{        
            
            ...mapActions('account', ['logout']),        
            logout_(){
                this.logout();
            },  

            refresh(){
                this.$forceUpdate();
            },
            
            /*redirectUsersManager(){
                router.push('/usersmanager');
            },

            redirectBTCAddresses(){
                router.push('/btcaddresses');
            },                                     

            redirectBTCTransactions(){
                router.push('/btctransactions');
            },

            redirectLogs(){
                router.push('/logs');
            },                      

            isAdmin(){                
                if(this.account.user.roles !== null){                    
                    return  this.account.user.roles.indexOf("Admin") > -1;
                }else{
                    return false;
                }
            },     */ 

            isAdmin(){                
                /*if(this.account.user.roles !== null){                    
                    return  this.account.user.roles.indexOf("Admin") > -1;
                }else{
                    return false;
                }*/
                return true;
            },
            
            loadMenuOptions(){
                
                this.items.push(
                {
                    path: '/home',
                    icon: 'home',
                    title: 'Home',                
                }); 

                /*this.items.push(
                {
                    path: '/btctransactions',
                    icon: 'attach_money',
                    title: 'Transactions',                
                }); */
                this.items.push(
                {
                    path: '/businesses',
                    icon: 'list',
                    title: 'Businesess',                
                }); 
                
                if(this.isAdmin()){
                    this.items.push(
                    {
                        path: '/usersmanager',
                        icon: 'supervisor_account',
                        title: 'Users manager',                    
                    });   
                    /*this.items.push(
                    {
                        path: '/logs',
                        icon: 'youtube_searched_for',
                        title: 'Logs',                    
                    });*/
                }
                             
            }

        },

        mounted() {                                         
            let timer = setInterval(this.loadMenuOptions(), 500*1000);        
            clearInterval(timer);
        }
          
    }
</script>

<style>  
    .md-list-item-text{
        color:gray;    
        cursor: pointer;
    }
    .md-title{
        color:white !important;
    }
</style>

