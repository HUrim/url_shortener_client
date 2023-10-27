let form = document.getElementById('shorten-url-form')
document.getElementById('shorten-url').addEventListener('click', async () => {
    let startDate = new Date()
    console.log(startDate)
    
    let formData = new FormData(form)
    console.log([...formData])
    let dataObj = {};
    formData.forEach(function(value, key){
        dataObj[key] = value;
    });
    let seconds = expirationAsInt(dataObj.expirationTime)
    let expiryDate = new Date(startDate.getTime() + seconds * 1000);
    dataObj.startDate = startDate;
    dataObj.expiryDate = expiryDate;
    let jsonData = JSON.stringify(dataObj);
    console.log(jsonData)
    try {
        const response = await fetch('http://localhost:5000/api/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
        console.log(response)
        if(response.ok) {
            console.log('Data sent successfully')
        } else {
            console.error('Failed to send data')
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
})

const validateURL = (url) => {
    return !!url && String(url)
        .match(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
        )
        // https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
}

const expirationAsInt = time => {
    let seconds = 0
    switch(time) {
        case "1 minute":
            seconds = 60
            break;
        case "5 minutes":
            seconds = 5*60
            break;
        case "30 minutes":
            seconds = 30*60;
            break;
        case "1 hour":
            seconds = 1*60*60
            break;
        case "5 hours":
            seconds = 5*60*60
            break;
    }
    return seconds;
}