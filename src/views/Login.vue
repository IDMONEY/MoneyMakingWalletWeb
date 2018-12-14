<template>
    <div>
        <div class="middle"></div>
        <b-container>                
            <b-row class="center">  
                <b-col cols="12" sm="12" md="4" class="center"></b-col>
                <b-col cols="12" sm="12" md="4" class="center mat">
                    <br/>
                    <h2>Login</h2>
                    <form @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" v-model="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" />
                            <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
                        </div>
                        <div class="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                            <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                        </div>
                        <div class="form-group">                        
                            <md-button class="md-primary" :disabled="status.loggingIn" @click="handleSubmit">Login</md-button>
                            <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />                            
                            <md-button class="md-primary" :disabled="status.loggingIn" @click="register">Register</md-button>
                        </div>
                    </form>
                </b-col>
                <b-col cols="12" sm="12" md="4" class="center"></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { router } from '../router';

export default {
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            this.submitted = true;
            const { email, password } = this;

            if (email && password) {
                this.login({ email, password })
            }
        },
        register () {
            router.push("/register");            
        }
    }
};
</script>
<style scoped>
  .middle{
      padding-top: 10%
  }
</style>