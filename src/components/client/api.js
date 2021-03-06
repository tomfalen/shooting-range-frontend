import Axios from 'axios';

function getAccountInfo(session) {
    return Axios.get("http://sokres.ddns.net:50101/customer/current",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": session
            }
        })
}

function editAccount(session, formData) {
    return Axios.post("http://sokres.ddns.net:50101/customer/current/update", {
            "FirstName": formData.FirstName,
            "LastName": formData.LastName,
            "GunPermissionNumber": formData.GunPermissionNumber,
            "GunPermissionPublisher": formData.GunPermissionPublisher,
            "PerceptorIdentityNumber": formData.PerceptorIdentityNumber,
            "PerceptorIdentityPublisher": formData.PerceptorIdentityPublisher,
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

function getHistory(session, formData) {
    const dateFrom = new Date(formData.From);
    const fromQuery = dateFrom.getFullYear() + '' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '' + ("0" + dateFrom.getDate()).slice(-2);
    const dateTo = new Date(formData.To);
    const toQuery = dateTo.getFullYear() + '' + ("0" + (dateTo.getMonth() + 1)).slice(-2) + '' + ("0" + dateTo.getDate()).slice(-2);

    return Axios.get("http://sokres.ddns.net:50101/customer/current/history/" + fromQuery + "/" + toQuery,
        {
            headers: {
                "Authorization": session
            }
        })
}

function getReservations(session) {
    return Axios.get("http://sokres.ddns.net:50101/customer/current/order",
        {
            headers: {
                "Authorization": session
            }
        })
}

function addReservation(session, formData) {
    const date = new Date(formData.Begin);
    return Axios.put("http://sokres.ddns.net:50101/customer/current/order", {
            "Begin": date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + ("0" + date.getMinutes()).slice(-2),
            "Duration": parseInt(formData.Duration.replace(/\,/g,""), 10),
            "Rimfire": formData.Rimfire,
            "Centerfire": formData.Centerfire,
            "Shell": formData.Shell,
            "Distance": parseInt(formData.Distance.replace(/\,/g,""), 10)
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": session
            }
        })
}

function deleteReservation(session, id) {
    return Axios.delete("http://sokres.ddns.net:50101/customer/current/order/" + id,
        {
            headers: {
                "Authorization": session
            }
        })
}

function getAcceptedRegulations(session) {
    return Axios.get("http://sokres.ddns.net:50101/customer/current/accepted-regulations",
        {
            headers: {
                "Authorization": session
            }
        })
}

function getObjectOpenHours() {
    return Axios.get("http://sokres.ddns.net:50101/object/open-hours")
}

function getObjectHolidays() {
    return Axios.get("http://sokres.ddns.net:50101/object/holidays")
}

function getIsOpenObject(formDate) {
    const date = new Date(formDate);
    const queryDate = date.getFullYear() + '' + ("0" + (date.getMonth() + 1)).slice(-2) + '' + ("0" + date.getDate()).slice(-2);
    return Axios.get("http://sokres.ddns.net:50101/object/is-open/" + queryDate)
}

function changePassword(session, formData) {
    return Axios.post("http://sokres.ddns.net:50101/user/change-password", {
            "OldPassword": formData.OldPassword,
            "NewPassword": formData.NewPassword,
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": session
            }
        })
}

export default {
        getAccountInfo,
        editAccount,
        getHistory,
        getReservations,
        addReservation,
        deleteReservation,
        getAcceptedRegulations,
        getObjectOpenHours,
        getObjectHolidays,
        getIsOpenObject,
        changePassword
    }
