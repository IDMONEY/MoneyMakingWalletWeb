<template>    
    <div>        
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title class="center">New Business</md-dialog-title>            
            <b-container class="margins left">                                                                    
                <b-row>
                    <b-col cols="3 mp" class="left">                
                        Name:
                    </b-col>
                    <b-col cols="11">                                        
                        <md-field v-bind:class="{ 'md-invalid': notValidName }">                                        
                            <md-input v-model="item.name" maxlength="60" required></md-input>
                            <h1 v-if="notValidName"><span class="md-error">The name is required</span></h1>                                        
                        </md-field>
                    </b-col>
                </b-row>
                 <b-row>
                    <b-col cols="3 mp" class="left">                
                        Description:
                    </b-col>
                    <b-col cols="11">                                        
                        <md-field v-bind:class="{ 'md-invalid': notValidDescription }">                                        
                            <md-input v-model="item.description" maxlength="255" required></md-input>
                            <h1 v-if="notValidDescription"><span class="md-error">The Description is required</span></h1>                                        
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
        name: 'DialogNewBusiness',

        components: {
            fab
        },        

        data: () => ({
            showDialog: false,            
            types: [],
            item: {                                
                name:"",
                description:""             
            },
            notValidName : false,                 
            notValidDescription : false,
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
                  tooltip: 'Add New Business',
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
                this.item.description = this.item.description.trim();
                
                let valid = true;

                if(this.item.name === ''){
                    this.notValidName = true;
                    valid = false;
                }else{
                    this.notValidName = false;
                } 
                
                if(this.item.description === ''){
                    this.notValidDescription = true;
                    valid = false;
                }else{
                    this.notValidDescription = false;
                }
                                
                if(valid){
                    this.showDialog = false;                           
                    this.$parent.addRow({name : this.item.name, description: this.item.description});
                    this.item.name = "";                                                            
                    this.item.description = "";   
                }
            },

            refresh(){                
                this.$parent.getAllBusinesses();                
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
        padding-top: 20px;        
    } 
</style>

