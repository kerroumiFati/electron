const { app, BrowserWindow,ipcMain,Notification } = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const isDev= !app.isPackaged;
let mainWindow;

//let a=[];

let A = 1;
let a = new Array(A);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor:"white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScripte: true,
      contextIsolation:true,
     preload:path.join(__dirname,'preload.js')
    },
  
  
  });

  mainWindow.loadFile("index.html");
  mainWindow.openDevTools();

}
 if(isDev)
 {
  require('electron-reload')(__dirname,{
    electron:path.join(__dirname,'node_modules','.bin','electron')
  })
 }

ipcMain.on('notify',(_,message)=>{
  new Notification({title:'Notification',body:message}).show();

})


// Function to read data from the serial port
function readSerialData() {
  new Promise((resolve, reject) => {

  const port = new SerialPort({
    path: 'COM3', //EDIT AS NEEDED
    baudRate: 9600 ,//EDIT AS NEEDED
  maxBufferSize: 256 
})
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
 

  for(let i=0 ;i<2;i++){
  parser.on('data', (data) => {
  a[0]=data;
  });
  
  }
  //console.log(a[0]);
  
 
  parser.on('end', () => {
    port.close(); // Close the port after reading data
    resolve(data);
  });

  port.on('error', (err) => {
    reject(err);
  });
});
return a;
}




  ipcMain.handle('products',readSerialData );
 
 app.whenReady().then(createWindow)



/*
 const { app, BrowserWindow,ipcMain,Notification } = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const isDev= !app.isPackaged;
let mainWindow;
let donnee = '';


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor:"white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScripte: true,
      contextIsolation:true,
     preload:path.join(__dirname,'preload.js')
    },
  
  
  });

  mainWindow.loadFile("index.html");
  mainWindow.openDevTools();

}
 if(isDev)
 {
  require('electron-reload')(__dirname,{
    electron:path.join(__dirname,'node_modules','.bin','electron')
  })
 }

ipcMain.on('notify',(_,message)=>{
  new Notification({title:'Notification',body:message}).show();

})

// Create a function to initialize the serial port and handle data reception

function initializeSerialPort() {
  const port = new SerialPort({
    path: 'COM4', //EDIT AS NEEDED
    baudRate: 9600 //EDIT AS NEEDED
})
  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  parser.on('data', (data) => {
    donnee = data;
  });
}

// Initialize the serial port
initializeSerialPort();


// Create a function to handle the IPC request
async function getval() {
  // You might want to await for some time here to ensure data is received
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second (adjust as needed)
console.log(donnee);
  return donnee;
}

/* Set up IPC handling
ipcMain.handle('products', async (event, args) => {
  const result = await getVal();
  return result;
});
*/

/* function getval(){

  
  
  const val = "hammada";
  return donnee;

 }

 
 ipcMain.handle('products',getval);


 app.whenReady().then(createWindow)

*/