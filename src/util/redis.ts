import * as redis from  "redis";
import * as APP_CONFIG from '../app.config';
const {promisify} = require('util');


// 端口、IP、密码
let client = redis.createClient(APP_CONFIG.REDIS.port, APP_CONFIG.REDIS.host);

 const getAsync = promisify(client.get).bind(client);

client.on("ready", () => {
    console.log('Redis-ready');
    
})

client.on("error", (err) => {
    console.log('Redis-error:'+ err);
    
})
// set 插入
client.set('user1', '张三'); 
client.set('user2', '李四', 'EX', 10); // 可设置过期时间（单位：秒）
client.set('user3', '张三');
client.set('user4', '张三');


// get 获取
client.get('user1', (err, value) => {
    if (err) {
        console.log(err);
    }
    console.log(value);
});
// del 删除
client.del('user4');

export default {client,getAsync};