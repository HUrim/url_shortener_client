let parent = document.querySelector('.urls-display');
const getData = () => {
    fetch("http://localhost:5000/api/urls", {
        method: "GET"
    })
    .then(response => response.json())
    .then(urlData => {
        urlData.map((url) => {
            let urlContentDiv = createElementItem("div", {_attribute: ["class"], _attributeContent: ["url-content"]})
            let urlA = createElementItem("a", {_attribute: ["onclick"], _attributeContent: [`redirectFunc(this)`]}, url?.shortUrl);
            let deleteImg = createElementItem("img", {_attribute: ["src", "alt", "onclick"], _attributeContent: ["./images/delete-icon.png", "-", "deleteShortenedUrl(this)"]});
            _elementAppendChild(urlContentDiv, urlA);
            _elementAppendChild(urlContentDiv, deleteImg);
            _elementAppendChild(parent, urlContentDiv);
        })
    })
    .catch(err => alert("Error: " + err))
}

getData()

async function redirectFunc(aElement) {
    aElement = aElement.textContent.replace("http://localhost:5000/", "")
    try {
        response = await fetch(`http://localhost:5000/api/${aElement}`, {
            method: "GET",
        })
        // let data = await response.json();
        if(response.status == 200)
            window.location.href = await response.json();
        else if (response.status == 410)
            alert("Oooops! Url has expired!")
    } catch (error) {
        alert("Error: " + error)
    }
}
async function deleteShortenedUrl(imgElement) {
    let urlContentParent = imgElement.parentElement;
    let shortUrl = urlContentParent.querySelector("a").textContent;
    let shortUrlObj = {}
    shortUrlObj.shortUrl = shortUrl
    try {
        const response = await fetch('http://localhost:5000/api/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shortUrlObj)
        });
        if(response.ok) {
            location.reload()
        } else {
            alert('Failed to delete the data!')
        }
    } catch (error) {
        alert(`Error: ${error}`)
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