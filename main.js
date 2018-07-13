const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

//Set Env 
process.env.NODE_ENV = 'development';

//Listen for app to be ready
app.on('ready', function () {
    //create new window
    mainWindow = new BrowserWindow({});
    //Load html file to the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    //Quit app when closed
    mainWindow.on('closed', function () {
        //mainWindow = null// use this for modal so it wont take up some space
        app.quit();
    });



    //build menu form template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});


//Quit when all windows are closed
app.on('window-all-closed', () => {
    //for mac
    if(process.platform !== 'darwin'){
        app.quit();
    }
})


//create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                role:'reload'
            },
            {
                label: 'Quit',
                accelerator: 'CommandOrControl+Q',
                click() {
                    app.quit();
                },
            }
        ]
    }
];

//if mac, add empty object to menu
if (process.platform == "darwin") {
    //unshifts = ann on the begining of an array
    mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENv !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: 'CommandOrControl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}

