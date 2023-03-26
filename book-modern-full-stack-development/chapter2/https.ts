// You must first create certificates using
//    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out certificate.pem -days 365 -nodes
// See: https://wanago.io/2019/04/01/node-js-typescript-8-implementing-https-with-our-own-openssl-certificate/

import * as https from 'https';
import * as fs from 'fs/promises';
 
 
async function startServer() {
  const [key, cert] = await Promise.all([
    fs.readFile('key.pem'),
    fs.readFile('certificate.pem')
  ]);
  https.createServer({ key, cert }, (req, res) => {
    res.statusCode = 200;
    res.end('hello world');
  })
    .listen(44301, () => {
      console.log('Server started');
    });
}
 
startServer();

// Navigate to https://localhost:44301/
