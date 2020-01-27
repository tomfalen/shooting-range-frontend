import Axios from 'axios';

function getWorkers(data) {
    return Axios.get("http://sokres.ddns.net:50101/worker",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": data
            }
        })
}

function addAbsence(data, sessionId, workerId){
    const dateFrom = new Date(data.TimeFrom);
    const fromQuery = dateFrom.getFullYear() + '' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + dateFrom.getDate()).slice(-2);
    const dateTo = new Date(data.TimeTo);
    const toQuery = dateTo.getFullYear() + '' + ("0" + (dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + dateTo.getDate()).slice(-2);
    console.log(fromQuery, toQuery, workerId)
    return Axios.put("http://sokres.ddns.net:50101/worker/absence/" + workerId + "/" + fromQuery + "/" + toQuery,{},
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

function deleteAbsence(absenceId, sessionId, workerId){
    console.log(absenceId, sessionId, workerId)
    return Axios.delete("http://sokres.ddns.net:50101/worker/absence/" + workerId + "/" + absenceId,
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

function editWorker(data, sessionId) {
    return Axios.post("http://sokres.ddns.net:50101/worker/update/" + data.Id,
        {
            "FirstName": data.FirstName,
            "LastName": data.LastName,
            "Pesel": data.Pesel,
            "Birthday": data.Birthday,
            "Phone": data.Phone,
            "Username": data.Username,
            "Email": data.Email
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
            }
        })
}

function deleteWorker(data, sessionId) {
    return Axios.delete("http://sokres.ddns.net:50101/worker/" + data,
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
            }
        })
}

function addWorker(data, sessionId, selectedBirthDate, selectedEmployedDate) {
    return Axios.post("http://sokres.ddns.net:50101/worker/add",
      {
        "FirstName": "tomasz",
        "LastName": "falenczyk",
        "Pesel": "94081359995",
        "Birthday": selectedBirthDate,
        "Phone": "123123123",
        "Employed": selectedEmployedDate,
        "Username": "tomfalen",
        "Email": "tomfalen@gmail.pl",
        "Password": "tomfalen1234"
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": sessionId
        }
      })
}

export default { getWorkers, editWorker, deleteWorker, addWorker, addAbsence, deleteAbsence };