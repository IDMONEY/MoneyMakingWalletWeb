<template>  
  <div class="padding-top-10">
    <b-container fluid>                             
        <b-row >
            <b-col cols="12" sm="12" md="12">
                <!--<b-card no-body  header="<b class=card-title>My Recent Activity</b><span class='card-title-more'><a href='#'>More </a> <span class='md-icon'>chevron_right</span></span>">-->
                <b-card no-body  header="<b class=card-title>My Recent Activity</b>">
                    <b-list-group>
                        <b-list-group-item v-for="(transaction, index) in transactions" :index="index" :key="index" href="#" class="flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{ transaction.description }}</h5>
                                <small class="text-muted" v-if="transaction.status === 'Processed'">{{transaction.processingDate | moment("DD MMMM YYYY") }}</small>
                                <small class="text-muted" v-else>{{transaction.registrationDate | moment("DD MMMM YYYY") }}</small>
                                </div>
                                <!--<p class="mb-1">
                                    {{ transaction.description }}
                                </p>-->
                                <small class="transaction-amount" v-bind:class="{ 'amount-positive' : transaction.amount >  0 && transaction.status === 'Processed'}">{{transaction.amount}} {{account.user.user.account.symbol}}</small>
                                <br />
                                <small v-bind:class="classStatus(transaction)">{{transaction.status}}</small>
                               
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>         
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import fab from 'vue-fab';
import { mapState, mapActions } from 'vuex'
import {transactionsService} from '../shared/services';

export default {
  name: 'PersonalTransactionsComponent',
  components: {fab},
  data () {
    return {        
        transactions : [],
        //loading: true,
        bgColor: '#778899'

    }
  },
    computed: {
        ...mapState({
            account: state => state.account
        })
    },

    /*created () {
        this.getAllBusinesses();
    }*/
    methods: {         
       ...mapActions('account', ['logout']),

        logout_(){
            this.logout();
        },
        log (...params) {
            console.log(...params)
        },
        getLastTransactions(){
            //this.loading = true;
            this.transactions = [];

            transactionsService.getPersonalTransactions()
                               .then(data =>
                               {
                                   data.forEach(transaction => {
                                       this.transactions.push(transaction);
                                   });
                               })
        },
        classStatus : function(transaction){
            return "status-"+transaction.status.toLowerCase();
        }
    },
     mounted (){
        this.getLastTransactions();
    }
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
    .list-group a, .list-group a:hover{text-decoration: none;color:#2c2e2f}
    .amount-positive{color:#299976;font-weight: bold;}
    .status-processed{color:#000}
    .status-rejected{color:#721c24}
    .status-registered{color:#2c2e2f}
    .transaction-amount{font-size: 1.1em}
    .card-header {text-align: left}
    .card-title-more{float: right !important;}
</style>
