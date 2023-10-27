let form = document.getElementById('shorten-url-form')
document.getElementById('shorten-url').addEventListener('click', async () => {
    let startDate = new Date()    
    let formData = new FormData(form)
    console.log([...formData])
    let dataObj = {};
    formData.forEach(function(value, key){
        dataObj[key] = value;
    });
    dataObj.startDate = startDate
    let jsonData = JSON.stringify(dataObj);
    try {
        const response = await fetch('http://localhost:5000/api/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        });
        if(response.ok) {
            location.reload()
        } else {
            alert("Failed to save data!")
        }
    } catch (error) {
        alert(`Error: ${error}`)
    }
})