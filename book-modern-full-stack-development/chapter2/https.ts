// You must first create certificates using
//    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out certificate.pem -days 365 -nodes
// See: https://wanago.io/2019/04/01/node-js-typescript-8-implementing-https-with-our-own-openssl-certificate/

import https from 'https';
import fs from 'fs/promises';
import url from 'url';
import querystring from 'querystring';

function readWolrdTime(zone: string): Promise<string> {
    if (zone == "") zone = "Chicago";
    const requestOptions: https.RequestOptions = {
        hostname: "worldtimeapi.org",
        port: 443,
        path: "/api/timezone/America/" + zone,
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
        const parsedURL = url.parse(req.url as string, true);
        console.log("\nURL: ", req.url);
        console.log("\nParsed URL: " + JSON.stringify(parsedURL,null,2));
        console.log("\nHeaders: \n" + JSON.stringify(req.headers,null,2))
        const timeZone: string = parsedURL.query.timezone as string ?? "";
        res.statusCode = 200;
        const jsonString = await readWolrdTime(timeZone);
        const jsonObj = JSON.parse(jsonString);
        res.end("Time API response as JSON: \n" + JSON.stringify(jsonObj, null, 2) + "\nAs Query String: \n" + querystring.stringify(jsonObj));
    })
        // Like with Visual Studio IISExpress, it doesn't seem to work if we use
        // prots other than 443XX 
        .listen(44301, () => {
            console.log('Server started');
        });
}

startServer();

// Navigate to https://localhost:44301/
// or https://localhost:44301/?timezone=New_York
// or https://localhost:44301/?timezone=Menominee
// or https://localhost:44301/some/path?timezone=Menominee
// See: https://worldtimeapi.org/api/timezone/America/ for timezone options
