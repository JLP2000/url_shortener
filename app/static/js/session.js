const tooltip = document.querySelector('.tooltip');

if (document.querySelector('.copy')){
  let allCopy = document.querySelectorAll('.copy')
  allCopy.forEach((el) => el.addEventListener('click', (e) => {
    copyToClipboard(e.currentTarget.parentNode.children[1])
    let popper = Popper.createPopper(el, tooltip, {
      placement: 'top',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
    showPopper(tooltip, popper)
    setTimeout(() => {
      hidePopper(tooltip, popper)
    }, 2000)
  }))
}

function showPopper(tTip, pop) {
  tTip.setAttribute('data-show', '')
  pop.setOptions((options) => ({
    ...options,
    modifiers: [
      ...options.modifiers,
      { name: 'eventListeners', enabled: true },
    ],
  }));
  pop.update();
}

function hidePopper(tTip, pop) {
  tTip.removeAttribute('data-show')
  
  pop.setOptions((options) => ({
    ...options,
    modifiers: [
      ...options.modifiers,
      { name: 'eventListeners', enabled: false },
    ],
  }));
}

if (document.querySelector('.remove')){
  let allRm = document.querySelectorAll('.remove')
  allRm.forEach((el) => el.addEventListener('click', (e) => {
    removeFromHistory(e.target.parentNode.children[1].id)
  }))
}

function copyToClipboard(target) {

    let text = target.textContent;

    let textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand("copy");

    textarea.remove();
}

function removeFromHistory(index) {
    let links = JSON.parse(localStorage.getItem("links"))
    let hLength = document.querySelectorAll('.history-modal').length
    console.log(hLength)

    links.splice((hLength == links.length ? index : index +1), 1)
    if (links.length == 0) {
      localStorage.removeItem('links')
    } else {
      localStorage.setItem("links", JSON.stringify(links))
    }
    location.reload()
}
