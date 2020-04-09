let sshList = ipcRenderer.sendSync('synchronous-message', ["getFile", "sshList.json"]),
    sshNames = Object.keys(sshList);

function transformPassword(password) {
    if (password) {
        let passwordString = "";
        for (c in password) {
            if (c < password.length-3) {
                passwordString += "*";
            }
            else {
                passwordString += password[c];
            }
        }
        return passwordString
    }
}

if (sshNames.length == 0) {
    document.getElementsByClassName("main")[0].innerHTML = `
    <div class="row">
        <div class="col s12 m10">
            <div class="card blue-grey darken-1 z-depth-5">
                <div class="card-content white-text">
                    <span class="card-title">No SSH Client registered. 
                    Press the + button below!</span>
                </div>
            </div>
        </div>
    </div>`
}
else {
    for (let i in sshNames) {
        let currentDiv = document.createElement('div');
        currentDiv.innerHTML = `
        <div class="row">
            <div class="col s12 m6">
                <div class="card blue-grey darken-1 z-depth-5">
                    <div class="card-content white-text">
                        <span class="card-title">${sshList[sshNames[i]].name}</span>
                        <p>Address: ${sshList[sshNames[i]].address}</p>
                        <p>Last Connected: ${sshList[sshNames[i]].last}</p>
                        <p>Password: ${transformPassword(sshList[sshNames[i]].password)}</p>
                    </div>
                    <div class="card-action">
                        <a onclick="openSSH(${i})">Apri</a>
                        <a onclick="editSSH(${i})">Modifica</a>
                    </div>
                </div>
            </div>
        </div>`
        document.getElementsByClassName("main")[0].appendChild(currentDiv)
    }
}

function openAddSSH() {
    document.getElementsByClassName("main")[0].innerHTML = `
    <div class="row">
        <div class="col s12">
            <div class="row">
                <div class="input-field col s3">
                    <input id="name" type="text" class="validate">
                    <label for="address">Name</label>
                </div>  
                <div class="input-field col s3">
                    <input id="address" type="text" class="validate">
                    <label for="address">Address</label>
                </div>
                <div class="input-field col s3">
                    <input id="password" type="text" class="validate">
                    <label for="password">Password</label>
                </div>
                <div class="col s3" style="vertical-align: middle;">
                    <p>
                        <label>
                            <input id="savePassword" type="checkbox" />
                            <span>Save Password</span>
                        </label>
                    </p>
                </div>
            </div>
        </div>
    </div>
    `
}