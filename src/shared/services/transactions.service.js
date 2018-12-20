import config from '../config';
import axios from 'axios';

import { authHeader } from '../helpers';

export const transactionsService = {
    getPersonalTransactions,
    getBusinessTransactions,
    getTransaction
};

function getPersonalTransactions() {
    return axios.get(`${config.API_URL}/transactions/personal`, { headers :  authHeader() })
                .then(response => (this.info = response.data.transactions))
                .catch(err => {
                    console.log(err);
                 });
}

function getBusinessTransactions() {
    return axios.get(`${config.API_URL}/transactions/business`, { headers :  authHeader() })
                .then(response => (this.info = response.data.transactions))
                .catch(err => {
                    console.log(err);
                 });
}

function getTransaction(id) {
    return axios.get(`${config.API_URL}/transactions/${id}`, { headers :  authHeader() })
                .then(response => (this.info = response.data))
                .catch(err => {
                    console.log(err);
                 });
}