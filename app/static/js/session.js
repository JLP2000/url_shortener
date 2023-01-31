function copyToClipboard() {
    var text = document.querySelector('#short-url').innerText;

    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand("copy");

    textarea.remove();
  }
