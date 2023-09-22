
const {ipcRenderer,contextBridge}=require('electron');

contextBridge.exposeInMainWorld('electron',{

    notificationApi:{
        sendNotification(message){
            console.log(message);
            ipcRenderer.send('notify',message);
        }
    },
    batteryApi:{

    },
    filesApi:{

    },
})




contextBridge.exposeInMainWorld('Products',{
  products: ()=> ipcRenderer.invoke('products').then(response=>response)


 
  
})


