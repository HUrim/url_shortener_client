let parent = document.querySelector('.urls-display');
{/* <div class="url-content">
    <a href="https://shorturl.co/ckrDR">https://shorturl.co/ckrDR</a>
    <img src="./images/delete-icon.png" width="18px" alt="">
</div> */}
const getData = async () => {
    urlData = []
    fetch("http://localhost:5000/api/urls", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => err)
}

getData()