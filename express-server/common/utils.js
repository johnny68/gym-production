const randomString = require('randomstring');
const nodemailer = require('nodemailer');
const textlocal = require('textlocal');
const hash = '28f3f38a6b3dd17b0c45118863f39103664879e2c4daaa10bf1e52f855cfd091';
const urlencode = require('urlencode');
const http = require('http');


function createResult(error, data) {
    var result = {};
    if (error == null) {
        result['status'] = 'success';
        result[data] = data;
    } else {
        result['status'] = ['error'];
    }
    return result;
}

function createPassword() {
    const password_generated = randomString.generate({
        length: 6,
        charset: 'alphanumeric'
    });

    return password_generated;
}

function createLink(request) {
    const rand = randomString.generate({
        length: 12,
        charset: 'alphanumeric'
    });
    host = request.get('host');
    link = "http://" + request.get('host') + "/user/verify?id=" + rand;

    return link;
}

function createTransport() {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'siddhant.ghosh.5@gmail.com',
            pass: '9011392667'
        }
    });
    return transporter;
}

function sendSMS(number, message) {
    var results;
    const username = 'siddhanta.ghosh.5@gmail.com';
    const sender = 'TXTLCL';
    const msg = urlencode(message);
    const toNumber = number;
    const data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + msg;
    const options = {
        host: 'api.textlocal.in',
        path: '/send?' + data
    };

    return new Promise(function(resolve, reject) {
        var req = http.request(options, function(res) {
            console.log('here start');
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', function(err) {
            reject(err);
        });
        req.end();
    });


    /* callback = (function (response_sms) {
        var result = '';
        response_sms.on('data', (chunk) => {
            result += chunk;
        });
        response_sms.on('end', function () {
            console.log(result);
            results = result;
            console.log(results);
            return result;
        });
    });
    http.request(options, callback).end();
    return results; */
}



module.exports = {
    createResult: createResult,
    createPassword: createPassword,
    createLink: createLink,
    createTransport: createTransport,
    sendSMS: sendSMS
};