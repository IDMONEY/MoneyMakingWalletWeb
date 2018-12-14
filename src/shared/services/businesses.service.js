import config from '../config';
import axios from 'axios';

import { authHeader } from '../helpers';

const options = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export const businessesService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function register(business) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(business)
    };    

    return fetch(`${config.API_URL}/businesses`, requestOptions).then(handleResponse);
}

function getAll() {
    /*const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.API_URL}/businesses/user`, requestOptions).then(handleResponse);
*/
    const url = `${config.API_URL}/businesses/user`;                
    return axios.get(url,{ headers: authHeader()}).then(response => (this.info = response.data.businesses)); 
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.API_URL}/businesses/${id}`, requestOptions).then(handleResponse);
}

function update(business) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(business)
    };

    return fetch(`${config.API_URL}/businesses/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.API_URL}/businesses/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);        
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            
            const error = (data && data.errors[0].message) || response.statusText;
            return Promise.reject(error);
        }

        if(data.isSuccessful){
            return data.businesses;
        }
    });
}