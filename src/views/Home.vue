<template>
    <div>
         <!--<md-progress-bar md-mode="indeterminate" v-show="loading"></md-progress-bar>-->
            <b-container fluid>
                <b-row>
                    <b-col cols="12" sm="12" md="4" lg="4" xl="4">
                      <PersonalAccountComponent />
                      <PersonalTransactionsComponent />
                    </b-col>
                    <b-col cols="12" sm="12" md="8" lg="8" xl="8">
                      <BusinessTransactionsComponent />
                    </b-col>
                </b-row>
                 <!--<b-row>
                   <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                    
                   </b-col>
                 </b-row>-->
            </b-container>
    </div>
</template>


<script>
// @ is an alias to /src
import {mapState,mapActions} from 'vuex';
import BusinessTransactionsComponent from '@/components/BusinessTransactionsComponent.vue'
import PersonalAccountComponent from '@/components/PersonalAccountComponent.vue'
import PersonalTransactionsComponent from '@/components/PersonalTransactionsComponent.vue'

export default {
  name: 'home',
  components: {
    BusinessTransactionsComponent,
    PersonalAccountComponent,
    PersonalTransactionsComponent
  }
}
</script>
