import Axios from 'axios';

function searchClients(session, formData) {
    //iloczyn -> true
    //suma -> false
    return Axios.post("http://sokres.ddns.net:50101/customer/search/true",
        {
            "LastName": formData.LastName,
            "GunPermissionNumber": formData.GunPermissionNumber,
            "PerceptorIdentityNumber": formData.PerceptorIdentityNumber,
            "Email": formData.Email
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": session
            }
        })
}

function getClient(session, id) {
    return Axios.get("http://sokres.ddns.net:50101/customer/" + id,
        {
            headers: {
                "Authorization": session
            }
        })
}

export default {
    searchClients,
    getClient
}