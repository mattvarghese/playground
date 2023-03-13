import http from 'http';
import request from 'request';

function RequestHandler(_inRequest: http.IncomingMessage, inResponse: http.ServerResponse) {
    request(
        "http://worldtimeapi.org/api/timezone/America/Chicago",
        (_inErr: any, _inResp: request.Response, inBody: any) => {
            inResponse.end(`Hello from my first Node Web Server: ${inBody}`);
        }
    );
}

const server = http.createServer(RequestHandler);
server.listen(8080);