const express = require('express');
const db = require('../common/database');
const nodemailer = require('nodemailer');
const moment = require('moment');
const utils = require('../common/utils');


var router = express.Router();

router.post('/user/billing/first', (request, response) => {
    const user_id = request.body.user_id;
    const user_plan = request.body.user_plan;
    const payment_method = request.body.payment_method;
    const due_date = moment(request.body.due_date, "DD-MM-YYYY").format("YYYY-MM-DD");
    var connection = db.connect();
    console.log(`${user_id} ${user_plan} ${payment_method} ${due_date}`);
    const statement_billing = `INSERT INTO user_billing (user_id, user_plan, user_due_date) VALUES (${user_id}, ${user_plan},'${due_date}')`;
    console.log(statement_billing);
    connection.query(statement_billing, (error_billing, result_billing) => {
        billing_id = result_billing.insertId;
        console.log(error_billing);
        console.log(result_billing);
        const statement_trasaction = `INSERT INTO user_monthly (billing_id, user_id, user_payment_method) VALUES (${billing_id}, ${user_id}, ${payment_method})`;
        console.log(statement_trasaction);
        connection.query(statement_trasaction, (error_transaction, result_transaction) => {
            console.log(error_transaction);
            console.log(result_transaction);
        });
        var result = {};
        if (result_billing.lenght === 0 && result_transaction.lenght === 0) {
            result.status = 'error';
            result.message = 'Not Ok';
        } else {
            result.status = 'success';
            result.message = 'Ok';
        }
        console.log(result);
        response.send(result);
    });

});

router.get('/user/get/billing/', (request, response) => {
    const user_id = request.query.user_id;
    const connection = db.connect();
    result = {};

    const statement_due_date = `select user_plan, user_join_date, user_due_date from user_billing where user_id = ${user_id};select user_payment_method, billing_time from user_monthly where user_id = ${user_id}`;
    connection.query(statement_due_date, (error_due_date, results_due_date) => {
        console.log(error_due_date);
        console.log(results_due_date);
        result.data = results_due_date;
        response.send(result);
    });


});

router.post('/test', (request, response) => {
    var number = request.body.number;
    var message = request.body.message;
    utils.sendSMS(number, message).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });
});

router.post('/search', (request, response) => {
    const user_email = request.body.user_email;
    const connection = db.connect();
    result = {};
    const statement_search = `select user_id, user_name from users where user_email = '${user_email}'`;
    connection.query(statement_search, (error_search, ressults_search) => {
        connection.end();
        console.log(error_search);
        console.log(ressults_search);
        result.data = ressults_search;
        response.send(result);
    });

});

router.post('/payment', (request, response) => {
    const user_id = request.body.user_id;
    const payment_method = request.body.payment_method;
    const due_date = moment(request.body.due_date, "DD-MM-YYYY").format("YYYY-MM-DD");
    var connection = db.connect();
    var billing_id;
    const statement_payment = `UPDATE user_billing SET user_due_date ='${due_date}' WHERE user_id = ${user_id}`;
    console.log(statement_payment);
    var result = {};
    connection.query(statement_payment, (error, results) => {
        const statement_billing_id = `SELECT billing_id from user_billing where user_id = ${user_id}`;
        connection.query(statement_billing_id, (error, result_id) => {
            billing_id = result_id[0].billing_id;
            const statement_trasaction = `INSERT INTO user_monthly (billing_id, user_id, user_payment_method) VALUES (${billing_id}, ${user_id}, ${payment_method})`;
            connection.query( statement_trasaction, (error_transaction_payment, result_transaction_payment) => {
                console.log(result_transaction_payment);
                console.log(error_transaction_payment);
            });
        });
        result = results;
        // 
        // connection.end();
        //console.log(result);
        response.send(result);
    });

});


module.exports = router;