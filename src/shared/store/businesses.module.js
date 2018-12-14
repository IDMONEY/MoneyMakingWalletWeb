import { businessesService } from '../services';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        businessesService.getAll()
            .then(
                businesses => commit('getAllSuccess', businesses),
                error => commit('getAllFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        businessesService.delete(id)
            .then(
                business => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    },
    register({ dispatch, commit }, business) {
        commit('registerRequest', business);
    
        businessesService.register(business)
            .then(
                business => {
                    commit('registerSuccess', business);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, businesses) {
        state.all = { items: businesses };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        state.all.items = state.all.items.map(business =>
            business.id === id
                ? { ...business, deleting: true }
                : business
        )
    },
    deleteSuccess(state, id) {
        state.all.items = state.all.items.filter(business => business.id !== id)
    },
    deleteFailure(state, { id, error }) {
        state.all.items = state.items.map(business => {
            if (business.id === id) {
                const { deleting, ...businessCopy } = business;
                return { ...businessCopy, deleteError: error };
            }

            return business;
        })
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

export const businesses = {
    namespaced: true,
    state,
    actions,
    mutations
};
