const WebSocket = require('ws');

const createEchoServer = server=>{
    const wsServer = new WebSocket.Server({server});
    const map = new Map();

    wsServer.on('connection', (ws, req)=>{
        map.set(ws, {name:''});
        ws.on('message', msg=>{
            const mObj = map.get(ws);
            let outMsg;
            if(! mObj.name){
                mObj.name = msg;
                outMsg = `${mObj.name} 進入聊天室, 目前有 ${wsServer.clients.size} 人`;
            } else {
                outMsg = `${mObj.name}: ${msg}`;
            }
            wsServer.clients.forEach(c=>{
                if(c.readyState===WebSocket.OPEN){
                    c.send(outMsg);
                }
            })
        });
        ws.send('連線了');
    })
}
module.exports = createEchoServer;
