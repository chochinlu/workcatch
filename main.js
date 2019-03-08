'use strict';

var path = require('path')
var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
const {app, Tray} = require('electron');

var trayIcon = null;
var window = null;

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 150;
const HORIZ_PADDING = 0;
const VERT_PADDING = 0;

app.on('ready', function() {
  
  if(process.platform === 'darwin') app.dock.hide();

  window = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizable: false,
    frame: false,
    transparent: false,
    show: false
  });

  window.loadURL('file://' + __dirname + '/index.html');

  window.on('close', function () {
    window = null;
  });

  window.on('blur', function(){
    window.hide();
  });

  const iconName = 'images/icon.png';
  const iconPath = path.join(__dirname, iconName);

  trayIcon = new Tray(iconPath);
  trayIcon.setToolTip('Hello World');

  trayIcon.on('click', (event) => {
    var screen = electron.screen;
    const cursorPosition = screen.getCursorScreenPoint();
    const primarySize = screen.getPrimaryDisplay().workAreaSize;
    const trayPositionVert = cursorPosition.y >= primarySize.height/2 ? 'bottom' : 'top';  
    const trayPositionHoriz = cursorPosition.x >= primarySize.width/2 ? 'right' : 'left';  
    window.setPosition(getTrayPosX(),  getTrayPosY());
    window.isVisible() ? window.hide() : window.show();

    function getTrayPosX() {
      const horizBounds = {
        left:   cursorPosition.x - WINDOW_WIDTH/2,
        right:  cursorPosition.x + WINDOW_WIDTH/2
      }
      if (trayPositionHoriz == 'left') {
        return horizBounds.left <= HORIZ_PADDING ? HORIZ_PADDING : horizBounds.left;
      }
      else {
        return horizBounds.right >= primarySize.width ? primarySize.width - HORIZ_PADDING - WINDOW_WIDTH: horizBounds.right - WINDOW_WIDTH;
      }
    }    
    function getTrayPosY() {
      return trayPositionVert == 'bottom' ? cursorPosition.y - WINDOW_HEIGHT - VERT_PADDING : cursorPosition.y + VERT_PADDING;
    }
  });

  const {Menu, MenuItem} = require('electron');
  var menu = new Menu();

  menu.append(new MenuItem({ label: 'Quit', click: () => app.quit() }));

  var ipcMain = require('electron').ipcMain;
  ipcMain.on('show-config-menu', (event) => {
      menu.popup(window);
  });

});