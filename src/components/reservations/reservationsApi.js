import Axios from 'axios';

function getReservation(data, sessionId) {
    console.log(data, sessionId)
    return Axios.get("http://sokres.ddns.net:50101/order/" + data,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
            }
        })
}

function getReservationForWorker(data, sessionId) {
    return Axios.get("http://sokres.ddns.net:50101/order/worker/" +  data,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
            }
        })
}


function getReservationForClient(data, sessionId) {
    return Axios.get("http://sokres.ddns.net:50101/order/customer/" +  data,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
            }
        })
}


function getReservationForAxis(data, sessionId) {
    return Axios.get("http://sokres.ddns.net:50101/order/field/" +  data,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
            }
        })
}


export default { getReservation, getReservationForWorker, getReservationForClient, getReservationForAxis };