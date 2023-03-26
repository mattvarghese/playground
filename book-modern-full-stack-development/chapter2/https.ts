// You must first create certificates using
//    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out certificate.pem -days 365 -nodes
// See: https://wanago.io/2019/04/01/node-js-typescript-8-implementing-https-with-our-own-openssl-certificate/

import https from 'https';
import fs from 'fs/promises';


function readWolrdTime(): Promise<string> {
    const requestOptions: https.RequestOptions = {
        hostname: "worldtimeapi.org",
        port: 443,
        path: "/api/timezone/America/Chicago",
        method: "GET"
    };
    return new Promise<string>((resolve) => {
        let responseString = "";
        const httpsRequest = https.request(
            requestOptions,
            (res) => {
                res.on("data", (chunk) => {
                    responseString += chunk;
                });
                res.on("end", () => {
                    resolve(responseString);
                });
            }
        );
        // If you were using another method such as POST, you can do
        //     httpsRequest.write("string"); 
        // etc. to add data to the request body
        httpsRequest.end();
    })
}

async function startServer() {
    const [key, cert] = await Promise.all([
        fs.readFile('key.pem'),
        fs.readFile('certificate.pem')
    ]);
    https.createServer({ key, cert }, async (req, res) => {
        res.statusCode = 200;
        const jsonString = await readWolrdTime();
        const jsonObj = JSON.parse(jsonString);
        res.end(JSON.stringify(jsonObj, null, 2));
    })
        // Like with Visual Studio IISExpress, it doesn't seem to work if we use
        // prots other than 443XX 
        .listen(44301, () => {
            console.log('Server started');
        });
}

startServer();

// Navigate to https://localhost:44301/
