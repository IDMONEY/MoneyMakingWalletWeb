import config from '../config';
import axios from 'axios';

import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email, password) {
    return axios.post(`${config.API_URL}/membership/login`, {email:email, password:password },{ headers: { 'Content-Type': 'application/json' }})
                .then(response =>
                    {
                        localStorage.clear();              
                        let data = response.data;
                        if (data.token) {
                            localStorage.setItem('IDMoneyUser', JSON.stringify(data));
                        }
                    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('IDMoneyUser');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };    

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);

        console.log(data);
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
            return data;
        }
    });
}