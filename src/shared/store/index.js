import Vue from 'vue';
import Vuex from 'vuex';

import { account } from './user.module';
import { message } from './message.module';
import { createModule } from 'vuex-toast';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        account,
        message,
        toast: createModule({
            dismissInterval: 8000
        })
    }
});
