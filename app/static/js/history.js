let history = JSON.parse(localStorage.getItem('links'))
let link = document.querySelector('.short-url')
if (link) {
  
        let long = link.getAttribute('href')
        let short = link.textContent
        let h = JSON.parse(localStorage.getItem('links'))
        if (h) {
            if (h[0]['short'] != link.textContent) {
                h.unshift({long: long, short: short})
            }
        } else {
            h = [{long: long, short: short}]
        }
        // console.log(h)
        localStorage.setItem('links', JSON.stringify(h))

}

let children = []
history && history.forEach((link) => {
    let parent = document.createElement('div')
    parent.className = "history-modal"
    let p1 = document.createElement('p')
    p1.textContent = link.long
    let a1 = document.createElement('a')
    a1.className = 'short-url'
    a1.textContent = link.short
    a1.href = link.long
    let button = document.createElement('button')
    button.className = 'copy'
    button.textContent = 'Copy'
    let remove = document.createElement('button')
    remove.className = 'remove'
    remove.textContent = 'X'
    let tooltip = document.createElement('div')
    tooltip.className = 'tooltip'
    tooltip.role = 'tooltip'
    tooltip.textContent = 'Link Copied!'
    
    parent.appendChild(p1)
    parent.appendChild(a1)
    parent.appendChild(button)
    parent.appendChild(tooltip)
    parent.appendChild(remove)
    
    children.push(parent)
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
