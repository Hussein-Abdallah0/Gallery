"use strict";
const { app, BrowserWindow } = require("electron");
const path = require("path");
app.disableHardwareAcceleration();
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}
app.whenReady().then(createWindow);
