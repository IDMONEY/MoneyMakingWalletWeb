<template>    
    <div>        
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title class="center">New User</md-dialog-title>            
            <b-container class="margins left">                                                                    
                <b-row>
                    <b-col cols="3 mp" class="left">                
                        Name:
                    </b-col>
                    <b-col cols="11">                                        
                        <md-field v-bind:class="{ 'md-invalid': notValidName }">                                        
                            <md-input v-model="item.name" maxlength="100" required></md-input>
                            <h1 v-if="notValidName"><span class="md-error">The name is required</span></h1>                                        
                        </md-field>
                    </b-col>
                </b-row>                
                <b-row>       
                    <b-col>  
                        &nbsp; 
                    </b-col>   
                </b-row>                       
            </b-container>
            
            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="add()">Ok</md-button>
            </md-dialog-actions>
        </md-dialog>                
        <fab
            :position="position"
            :bg-color="bgColor"
            :actions="fabActions"
            @cache="refresh"
            @alertMe="showDialog = true"
            @logout="logout"
        ></fab>
    </div>
</template>

<script>    
    
    import fab from 'vue-fab';    
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'DialogNewUser',

        components: {
            fab
        },        

        data: () => ({
            showDialog: false,            
            types: [],
            item: {                                
                name:""                
            },
            notValidName : false,                        
            bgColor: '#78b567',
            position: 'top-right',
            fabActions: [
              {
                  name: 'cache',
                  icon: 'cached',
                  tooltip: 'Reload',
                  color: 'black'   
              },
              {
                  name: 'alertMe',
                  icon: 'fiber_new',
                  tooltip: 'Add New User',
                  color: '#2A56FA'     
              },
              {
                  name: 'logout',
                  icon: 'exit_to_app',
                  tooltip: 'Log out',
                  color: '#2A56FA'     
              }                 
            ]
        }),    
    
        methods:{             
            
            add(){

                this.item.name = this.item.name.trim();                
                
                let valid = true;

                if(this.item.name === ''){
                    this.notValidName = true;
                    valid = false;
                }else{
                    this.notValidName = false;
                }                                            
                                
                if(valid){
                    this.showDialog = false;                           
                    this.$parent.addRow(this.item.name);                      
                    this.item.name = "";                                                            
                }
            },

            refresh(){                
                this.$parent.getAllUsers();                
            },

            logout(){
                this.$parent.logout_();               
            }

        },

        mounted() {
                
        },  
    }
</script>

<style scoped>
    .md-dialog {
        max-width: 50% !important;
        width: 27% !important;
    }

    .margins {
        margin-left:3% !important;      
    }

    .center{
        text-align: center;
    }
  
    .mp{
        padding-top: 35px;        
    } 
</style>

