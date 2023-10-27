let parent = document.querySelector('.urls-display');
{/* <div class="url-content">
    <a href="https://shorturl.co/ckrDR">https://shorturl.co/ckrDR</a>
    <img src="./images/delete-icon.png" width="18px" alt="">
</div> */}
const getData = async () => {
    fetch("http://localhost:5000/api/urls", {
        method: "GET"
    })
    .then(response => response.json())
    .then(urlData => {
        console.log(urlData.length)
        urlData.map((url, index) => {
            let urlContent = createElementItem("div", {_attribute: ["class"], _attributeContent: ["url-content"]})
            let urlA = createElementItem("a", {_attribute: ["href", "onclick"], _attributeContent: [urlData[index]?.shortUrl, `redirectFunc(${url.longUrl})`]}, urlData[index]?.shortUrl);
            let deleteImg = createElementItem("img", {_attribute: ["id", "src", "alt", "onclick"], _attributeContent: [`${url._id}`, "./images/delete-icon.png", "-", `deleteShortenedUrl(this)`]});
            _elementAppendChild(urlContent, urlA);
            _elementAppendChild(urlContent, deleteImg);
            _elementAppendChild(parent, urlContent);
        })
    })
    .catch(err => err)
}

getData()

async function deleteShortenedUrl(imgElement) {
    let urlContentParent = imgElement.parentElement;
    console.log(urlContentParent)
    let shortUrl = urlContentParent.querySelector("a").textContent;
    let shortUrlObj = {}
    shortUrlObj.shortUrl = shortUrl
    console.log(JSON.stringify(shortUrlObj))
    try {
        const response = await fetch('http://localhost:5000/api/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shortUrlObj)
        });
        console.log(response)
        if(response.ok) {
            console.log('Record Deleted successfully')
        } else {
            console.error('Failed to delete')
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

const _elementAppendChild = (parentElement, childElement) => {
    parentElement.appendChild(childElement);
}

const createElementItem = (_element, attributeObj, textNode) => {
    let item_element = document.createElement(_element);
    document.body.appendChild(item_element);
    if(!!attributeObj) {
        for (let i = 0; i < attributeObj?._attribute.length; i++) {
            item_element.setAttribute(attributeObj?._attribute[i], attributeObj?._attributeContent[i]);
        }
    }
    if(textNode) {
        item_element.appendChild(document.createTextNode(textNode));
    }
    
    return item_element;
}