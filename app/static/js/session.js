const Popper = window.Popper

if (document.querySelector('.copy')){
  let allCopy = document.querySelectorAll('.copy')
  allCopy.forEach((el) => el.addEventListener('click', (e) => {
    copyToClipboard(e.currentTarget.parentNode.children[1])
    let tooltip = document.querySelector('.tooltip');
    tooltip.classList.add('tooltip-show')
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
    setTimeout(() => {
      tooltip.setAttribute('data-hide', '')
      popper.update();
    }, 1000)
  }))
}

if (document.querySelector('.remove')){
  let allRm = document.querySelectorAll('.remove')
  allRm.forEach(() => addEventListener('click', (e) => {
    
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

function removeFromHistory(e) {
    let links = JSON.parse(localStorage.getItem("links"))
    console.log("this")
}
