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

function getSelfAbsencess(sessionId){
    return Axios.get("http://sokres.ddns.net:50101/worker/current/absences",
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": sessionId
      }
    })
}

function addAbsence(data, sessionId){
    const dateFrom = new Date(data.TimeFrom);
    const fromQuery = dateFrom.getFullYear() + '' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + dateFrom.getDate()).slice(-2);
    const dateTo = new Date(data.TimeTo);
    const toQuery = dateTo.getFullYear() + '' + ("0" + (dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + dateTo.getDate()).slice(-2);

    return Axios.put("http://sokres.ddns.net:50101/worker/current/absence/" + fromQuery + "/" + toQuery,{},
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

function deleteAbsence(absenceId, sessionId){

    return Axios.delete("http://sokres.ddns.net:50101/worker/current/absence/" + absenceId,
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

export default { getSelfData, getSelfReservations, getSelfAbsencess, addAbsence, deleteAbsence }
