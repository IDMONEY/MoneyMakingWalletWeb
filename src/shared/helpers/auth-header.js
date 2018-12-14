export function authHeader() {
    let user = JSON.parse(localStorage.getItem('IDMoneyUser'));

    if (user && user.token) {
        return { 'Content-Type': 'application/json', 'Authorization': user.token };
    } else {
        return {};
    }
}