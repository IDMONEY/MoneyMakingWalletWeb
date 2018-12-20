<template>  
  <div class="padding-top-10">
    <b-container fluid>                             
        <b-row >
             <b-col cols="12" sm="12" md="12">
                <div class="card">

                <!-- Card image -->
                <!--<img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap">-->

                <!-- Card content -->
                <div class="card-body">
                    <b-row >
                            <b-col cols="12" sm="12" md="6">
                                <div class="card-body">
                                    <p class="card-text-label" v-if="transaction.status === 'Processed'">{{transaction.processingDate | moment("MMMM D, YYYY hh:MM:SS A") }}</p>
                                    <p class="card-text-label" v-else>{{transaction.registrationDate | moment("MMMM D, YYYY hh:MM:SS A") }}</p>
                                    <p class="card-text">{{transaction.description}}</p>

                                    <p class="card-text-label margin-top-30">Category</p>
                                    <p class="card-text">Unknown</p>   

                                    <p class="card-text-label margin-top-20">Transaction ID</p>
                                    <p class="card-text">{{transaction.id}}</p>                                    
                                    

                                </div>
                        </b-col>
                                <b-col cols="12" sm="12" md="6">
                                <div class="card-body">
                                    <h4 class="card-title card-title-right"><a><small class="transaction-amount" v-bind:class="{ 'amount-positive' : transaction.amount >  0 && transaction.status === 'Processed'}">{{transaction.amount}} {{account.user.user.account.symbol}}</small></a></h4>

                      
                                    <p class="card-text-label margin-top-30">Transaction Details</p>
                                    <p class="card-text">{{transaction.amount}} {{account.user.user.account.symbol}}</p>           

                                    <p class="card-text-label margin-top-20">Sent From</p>
                                    <p class="card-text">{{from.address}}</p>  

                                    <p class="card-text-label margin-top-20">Received By</p>
                                    <p class="card-text">{{to.address}}</p>                                                               
                                
                                </div>
                        </b-col>
                </b-row>
                </div>

                </div>
             </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import { mapState, mapActions } from 'vuex'
import {transactionsService} from '../shared/services';

export default {
  name: 'TransactionDetails',
  data () {
    return {        
        transaction : null,
        from: null,
        to: null,
        id : null,
        //loading: true,
        bgColor: '#778899'

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
        log (...params) {
            console.log(...params)
        },
        getTransactionDetails(){
            //this.loading = true;
            this.transactions = [];

            transactionsService.getTransaction(this.$route.params.id)
                               .then(data =>
                               {
                                    this.transaction = data.transaction;
                                    this.from = data.from;
                                    this.to=  data.to;
                               })
        },
        classStatus : function(transaction){
            return "status-"+transaction.status.toLowerCase();
        }
    },
     mounted (){
        this.getTransactionDetails();
    }
}
</script>

<style scoped>
    p{margin-bottom: 0.25rem}
    .card{text-align: left;}
    .card-text-label{font-weight: bold;}
    .amount-positive{color:#299976;font-weight: bold;}
    .status-processed{color:#000}
    .status-rejected{color:#721c24}
    .status-registered{color:#2c2e2f}
    .transaction-amount{font-size: 1.1em}
</style>
