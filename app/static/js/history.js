let history = JSON.parse(localStorage.getItem('links'))
let link = document.querySelector('.short-url')
if (link) {
    let long = link.getAttribute('href')
    let short = link.textContent
    let h = JSON.parse(localStorage.getItem('links'))
    if (h) {
        //only add if not already in storage
        if (h[0]['short'] != link.textContent) {
            h.unshift({long: long, short: short})
        }
    } else {
        h = [{long: long, short: short}]
    }
    localStorage.setItem('links', JSON.stringify(h))
}

let children = []
let index = 0
history && history.forEach((link) => {
    let parent = document.createElement('div')
    parent.className = "history-modal"
    let favImg = document.createElement('img')
    favImg.src = `http://www.google.com/s2/favicons?domain=${link.long}`
    favImg.className = 'fav'
    let p1 = document.createElement('p')
    p1.textContent = link.long
    let a1 = document.createElement('a')
    a1.id = index
    a1.className = 'short-url'
    a1.textContent = link.short
    a1.href = link.long
    let qrImg = document.createElement('img')
    qrImg.src = `/static/images/qrcode-${link.short.slice(-6)}.png` 
    qrImg.className = 'qrcode'

    let button = document.createElement('button')
    button.className = 'copy'
    button.textContent = 'Copy'
    let remove = document.createElement('button')
    remove.className = 'remove'
    remove.textContent = 'X'
    
    parent.appendChild(favImg)
    parent.appendChild(p1)
    parent.appendChild(a1)
    parent.appendChild(qrImg)
    parent.appendChild(button)
    parent.appendChild(remove)
    
    children.push(parent)
    index += 1
})

const currentDiv = document.querySelector('.home-modal')
if (children.length != 0) {
    let header = document.createElement("h3")
    header.textContent = "History"
    currentDiv.append(header)
}

children.forEach((element) => {
    currentDiv.append(element)
})
