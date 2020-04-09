document.getElementById('homeButton').onclick = () => {
    changePage("home.html");
}
document.getElementById('terminalButton').onclick = () => {
    changePage("terminal.html");
}
document.getElementById('sshButton').onclick = () => {
    changePage("ssh.html");
}

function changePage(page) {
    ipcRenderer.send('asynchronous-message', ["changePage", page]);
}