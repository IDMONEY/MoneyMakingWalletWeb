import { userService } from '../services';
import { router } from '../../router';

const user = JSON.parse(localStorage.getItem('IDMoneyUser'));
const ADD_TOAST_MESSAGE = "@@toast/ADD_TOAST_MESSAGE";


const state = user
    ? { status: { loggingIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { email, password }) {
        
        commit('loginRequest', { email });
    
        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    dispatch(ADD_TOAST_MESSAGE, { text:`Welcome ${email}`, type:'info', dismissAfter: 3000 }, { root: true });
                    router.push('/home');
                },
                error => {
                    //alert("Fail");
                    commit('loginFailure', error);
                    dispatch(ADD_TOAST_MESSAGE, { text:'Access denied.', type:'danger', dismissAfter: 3000 }, { root: true });
                    //dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
        router.push('/login');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        //dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    //dispatch('alert/error', error, { root: true });
                }
            );
    },
    addUser({ dispatch, commit }, name) {
        commit('registerRequest', name);

        var user = {                         
            firstName: name,
            lastName: '',
            username: name,
            password: '123456'};
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user );                    
                    setTimeout(() => {
                        // display success message after route change completes
                        //dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    //dispatch('alert/error', error, { root: true });
                }
            );

    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
        console.log(state.user);
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};