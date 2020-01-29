import Axios from 'axios';

function login(formData) {
    return Axios.post("http://sokres.ddns.net:50101/user/login", {
        // Login: "testfalenczyk123",
        // Password: "#Test123"
        Login: formData.username,
        Password: formData.password
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
}

function register(formData) {
    return Axios.post("http://sokres.ddns.net:50101/customer/register", {
        "FirstName": formData.FirstName,
        "LastName": formData.LastName,
        "GunPermissionNumber": formData.GunPermissionNumber,
        "GunPermissionPublisher": formData.GunPermissionPublisher,
        "PerceptorIdentityNumber": formData.PerceptorIdentityNumber,
        "PerceptorIdentityPublisher": formData.PerceptorIdentityPublisher,
        "Username": formData.username,
        "Email": formData.Email,
        "Password": formData.password,
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
}


function logout(sessionId) {
    return Axios.post("http://sokres.ddns.net:50101/user/logout", {},
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
            }
        })
}


export default { login, register, logout };