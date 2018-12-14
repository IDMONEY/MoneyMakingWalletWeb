<template>    
    <div v-if="userAccount.user.account !== null">
         <b-container fluid >                             
            <b-row class="center margin-top-10">
                <b-col cols="12" sm="12" md="12" class="center">
                    <b-card title="Balance" class="card-left">
                        <p class="card-text">
                            <span class="cw_tile-currencyContainer"><span class="vx_text-1 token-balance" v-bind:class="{ 'token-balance-positive' : userAccount.user.account.balance.available >  0}"> {{userAccount.user.account.balance.available}} {{userAccount.user.account.symbol}}</span><span class="vx_text-body-sm token-balance_secondary"> Available</span></span>
                        </p>
                    </b-card>
                 </b-col>
            </b-row>
         </b-container>
    </div>
</template>

<script>    

    import { mapState, mapActions } from 'vuex';
    import { router } from '../router';

    export default {
        name: 'PersonalAccountComponent',
        computed: {
            ...mapState({
                userAccount: state => state.account.user                    
            })
        },
        
        methods:{        
            
            ...mapActions('account', ['logout']),        
            logout_(){
                this.logout();
            },

        },

        mounted() {
            
        }
          
    }
</script>

<style>  
   .card-left{text-align: left;}
   .card-title{color: #f5b335 !important;}


    .widget-container:last-of-type {
        margin-bottom: 3.2rem;
        background-color: #ffffff;
        border-radius: 4px;
        box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.1);
        height: 100%;
        margin: 1.25rem 0 0 0;
        padding-bottom: 0;
        padding: 0 1.5rem 1.5rem 1.5rem;
        position: relative;
    }
    .widget_tile-headerLink {
    display: block;
    overflow: hidden;
    text-align: left;
    width: auto;
    color: #f5b335 !important;
}
    .token-balance {
        color: #2c2e2f;
    }
    .token-balance_primary, .token-balance_secondary {
        color: #6c7378;
    }
    .token-balance-positive{
            color: rgb(1, 128, 101);
    }
    .token-balance, .token-balance_primary, .token-balance_secondary {
        display: block;
    }
    .vx_text-1 {
    font-size: 2.5rem;
    line-height: 3rem;
    font-weight: 300;
    text-transform: none;
    }
    .vx_text-body-sm {
        font-size: 0.8125rem;
        line-height: 1.125rem;
        font-weight: 400;
        text-transform: none;
    }

</style>

