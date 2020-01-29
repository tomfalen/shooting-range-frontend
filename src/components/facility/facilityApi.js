import Axios from 'axios';

function getAxis(data) {
    return Axios.get("http://sokres.ddns.net:50101/position",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": data
            }
        })
}

function AddAxis(data, sessionId){
    return Axios.post("http://sokres.ddns.net:50101/position/add-axis",
    {
        "name" : data.Name,
        "allowRimfire" : data.AllowRimfire,
        "allowCenterfire" : data.AllowCenterfire,
        "allowShell" : data.AllowShell,
        "length" : data.Length,
        "numberOfFields" : data.NumberOfFields,
        "isOpen" : data.IsOpen
    },
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

function addField(data, sessionId, axisId){
    return Axios.post("http://sokres.ddns.net:50101/position/add-field/" + axisId,{},
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

function deleteAxis(data, sessionId){
    return Axios.delete("http://sokres.ddns.net:50101/position/axis/" + data,
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

function getObjectHolidays() {
    return Axios.get("http://sokres.ddns.net:50101/object/holidays")
}

function addHolidays(data, sessionId) {
    return Axios.put("http://sokres.ddns.net:50101/object/holidays",
    {
        "from" : data.From,
        "to" : data.To,
        "reason" : data.Reason
    },
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

function deleteHolidays(data, sessionId) {
    console.log(data)

    return Axios.delete("http://sokres.ddns.net:50101/object/holidays/" + data,
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": sessionId
        }
    })
}

export default { getAxis, AddAxis, deleteAxis, addField, getObjectHolidays, deleteHolidays, addHolidays };