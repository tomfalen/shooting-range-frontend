import Axios from 'axios';

function getSelfData(data) {
    return Axios.get("http://sokres.ddns.net:50101/worker/current",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": data
            }
        })
}

function getSelfReservations(data) {
    return Axios.get("http://sokres.ddns.net:50101/worker/current/orders",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": data
            }
        })
}

export default { getSelfData, getSelfReservations }
