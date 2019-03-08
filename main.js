const electron = require('electron');
const app = electron.app;
const path = require('path');
const Tray = electron.Tray;
const Menu = electron.Menu;
const iconPath = path.join(__dirname, 'images/icon.png');
const { getScreenShot } = require('./renderer');

let tray = null;
function createTray() {
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'ScreenShot', click: () => getScreenShot() },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setToolTip('Take a desktop screenhot!');
  tray.setContextMenu(contextMenu);
}

app.on('ready', createTray);