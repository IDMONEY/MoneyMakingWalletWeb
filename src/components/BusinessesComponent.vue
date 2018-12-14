<template>  
  <div class="padding-top-10">
    <b-container fluid>                             
        <b-row class="center">
            <b-col cols="12" sm="12" md="12" class="center">
                <div class="form-group">
                <input type="text" class="form-control" v-model="search" placeholder="Search">
                </div>
                <div class="table-responsive component-container">
                    <table class="table" style="width:100%">
                        <thead width="400px">
                            <tr>
                                <th scope="col" class="text-left">#</th>
                                <th scope="col" class="text-left"  @click="sort('name')">Name <!--<i class="fas fa-sort-alpha-down float-right"></i>--></th>
                                <th scope="col" class="text-left" @click="sort('description')">Description<!--<i class="fas fa-sort-alpha-down float-right"></i>--></th>
                                <th scope="col" class="text-right" >Balance</th>
                                <th scope="col">Options </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(business, index) in businesses" :index="index" :key="index">
                                <td>{{business.id}}</td>
                                <td><!--<img v-bind:src="'data:image/png;base64,'+business.image" width="20px" height="20px"/> !-->{{business.name}}</td>
                                <td>{{business.description}}</td>
                                <td class="text-right">{{business.account.balance.available}}</td>
                                <td>
                                    <span v-if="business.deleting"><em> - Deleting...</em></span>
                                        <span v-else-if="business.deleteError" class="text-danger"> - ERROR: {{business.deleteError}}</span>
                                        <span v-else>                                                                                                                          
                                            <md-button class="md-primary" @click="deleteBusiness(business.id)"> <md-icon class="md-size"> delete_forever </md-icon></md-button>                                         
                                        </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                 <!--<button @click="prevPage" class="float-left btn btn-outline-info btn-sm"><i class="fas fa-arrow-left"></i> Previous</button> 
                 <button @click="nextPage" class="float-right btn btn-outline-info btn-sm">Next <i class="fas fa-arrow-right"></i></button>-->
            </b-col>         
        </b-row>
    </b-container>       
    <DialogNewBusiness/>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import DialogNewBusiness from '@/components/DialogNewBusiness.vue';
import fab from 'vue-fab';
import { mapState, mapActions } from 'vuex'
import {businessesService} from '../shared/services';

export default {
  name: 'BusinessesComponent',
  components: {fab, DialogNewBusiness},
  data () {
    return {
        businesses : [],
        main_icon: "add",
        bgColor: '#778899',
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
                tooltip: 'New',
                color: '#2A56FA'     
            }              
        ],
        currentSort:'name',
        currentSortDir:'asc',
        search: '',
        searchSelection: '',
        pageSize: 20,
        currentPage: 1
    }
  },
    computed: {
        ...mapState({
            account: state => state.account
        })
    },

    methods: {        
       ...mapActions('account', ['logout']),

        logout_(){
            this.logout();
        },
        getAllBusinesses()
        {
            this.loading = true;
            this.businesses = []; 
            businessesService.getAll()
                .then(
                    data =>{
                         data.forEach(element =>{
                             this.businesses.push(element);
                         });
                        //this.getbusinessesFiltered();
                    },
                    error => { 
                        this.handleError(error,"There was an error loading the transactions");
                    }
                )

        },

        getbusinessesFiltered(){
        },

        addRow(business){                
            businessesService.register(business)
                .then(
                    _ =>
                    {
                        if(r.status === 200)
                        {
                            console.log('success');
                        }
                        else{
                          console.log(error);
                        }
                    },
                    error => {/*this.handleError(error,"There was an error adding the Transaction");*/}
                )
                .catch(error => {this.errorCatch(error);})
                .finally(() => {
                    this.loading = false;
                    this.getAllBusinesses();
                });
            this.getAllBusinesses();      
        },   

        log (...params) {
        console.log(...params)
        },
    },
    mounted()
    {
        //this.actualUser = this.account.user.userName;  
        this.getAllBusinesses();      
    },
}
</script>

<style scoped>
  .padding-top-10{
      padding-top: 10px
  }
  th {
        cursor:pointer;
        white-space: nowrap;
    }
    tr {
    white-space: nowrap;
    }
    .table td, .table th{
        padding:.5rem;
    }
</style>
