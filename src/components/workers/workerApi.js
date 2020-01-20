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
    Axios.post("http://sokres.ddns.net:50101/worker/add",
      {
        "FirstName": "tomasz",
        "LastName": "falenczyk",
        "Pesel": "12312312",
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

export default { getWorkers, editWorker, deleteWorker, addWorker };