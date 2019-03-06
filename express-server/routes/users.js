const express = require('express');
const db = require('../common/database');
const crypto = require('crypto');
const utils = require('../common/utils');
const moment = require('moment');
const nodemailer = require('nodemailer');
const multer = require('multer');

const upload = multer({
  dest: 'images/'
});

var router = express.Router();

/* Create ADMIN */

router.post('/admin/create', (request, response) => {
  const userName = request.body.userName;
  const password = crypto.createHash('SHA256').update(request.body.password).digest('base64');
  const name = request.body.name;
  const emailID = request.body.emailID;

  console.log(password);
  var connection = db.connect();

  const statement = `INSERT INTO admin (admin_username, admin_password, admin_name, admin_email_id, admin_is_active) VALUES ('${userName}', '${password}','${name}','${emailID}', 'Y')`;

  console.log(statement);
  connection.query(statement, (error, results) => {
    connection.end();
    console.log(results);
    console.log(error);

    response.send(utils.createResult(error, results));
  });
});

/* POST ADMIN Login */
router.post('/admin/login', (request, response) => {

  const userName = request.body.userName;
  const password = crypto.createHash('SHA256').update(request.body.password).digest('base64');

  var connection = db.connect();
  const statement = `SELECT * FROM admin WHERE admin_username = '${userName}' and admin_password = '${password}'`;
  console.log(statement);

  connection.query(statement, (error, results) => {
    connection.end();
    var result = {};
    console.log(results);
    console.log(error);
    if (results.length === 0) {
      result.status = 'error';
      result.message = 'Invalid Username or password';
    } else {
      result.success = 'success';
      result.message = 'Correct Login Details';
      result.data = results;
    }
    response.send(result);
  });

});

/* get all admin users */

router.get('/admin/getAll', (request, response) => {
  const statement = 'SELECT admin_id, admin_name, admin_email_id from admin';
  console.log(statement);
  var connection = db.connect();
  connection.query(statement, (error, results) => {
    connection.end();
    console.log(results);
    console.log(error);
    var result = {};
    if (results.length === 0) {
      result.status = 'error';
      result.message = 'Some error has occured contact Siddhant';
    } else {
      result.status = ['success'];
      result.message = ['ok'];
      result.data = results;
    }

    response.send(result);
  });
});

/* get all client users */

router.get('/user/getAll', (request, response) => {
  const statement = 'SELECT user_id, user_email, user_name, user_active from users';
  console.log(statement);
  var connection = db.connect();
  connection.query(statement, (error, results) => {
    connection.end();
    console.log(results);
    console.log(error);
    var result = {};
    if (results.length === 0) {
      result.status = 'error';
      result.message = 'Some error has occured contact Siddhant';
    } else {
      result.status = ['success'];
      result.message = ['ok'];
      result.data = results;
    }

    response.send(result);
  });
});

/* Create Normal User */

router.post('/user/create', (request, response) => {
  const user_email = request.body.user_email;
  const user_name = request.body.user_name;
  const user_aaddhar = request.body.user_aaddhar;
  const user_address = request.body.user_address;
  const user_city = request.body.user_city;
  const user_pincode = request.body.user_pincode;
  const user_mobile_number = request.body.user_mobile_number;
  const user_date_of_birth = moment(request.body.user_date_of_birth, "DD-MM-YYYY").format("YYYY-MM-DD");
  const user_gender = request.body.user_gender;
  const user_blood_group = request.body.user_blood_group;
  const user_height = request.body.user_height;
  const user_weight = request.body.user_weight;
  const user_purpose = request.body.user_purpose;
  const user_training_type = request.body.user_training_type;
  const user_medical_history = request.body.user_medical_history;
  const user_past_gym = request.body.user_past_gym;
  const user_past_protien = request.body.user_past_protien;


  console.log(user_email, user_name, user_address, user_aaddhar, user_city, user_pincode,
    user_mobile_number, user_date_of_birth, user_gender, user_blood_group, user_height, user_weight, user_purpose,
    user_training_type, user_medical_history, user_past_gym, user_past_protien);


  var connection = db.connect();
  const generated_password = utils.createPassword()
  const password = crypto.createHash('SHA256').update(generated_password).digest('base64');
  const message = `Welcome to Royal Fitness Club, Your OTP is ${generated_password}`;


  const statement_user_create = `INSERT INTO users (user_email, user_password, user_active, user_name) VALUES ('${user_email}', '${password}', 'N', '${user_name}')`;

  connection.query(statement_user_create, (error, results) => {
    console.log(error);
    console.log(results);
    user_id = results.insertId;
    const statement_user_records = `INSERT INTO user_records
    (user_id, user_aaddhar, user_address, user_city, user_pincode, user_mobile_number, user_date_of_birth, user_gender,
      user_blood_group, user_height, user_weight, user_purpose, user_training_type, user_medical_history, user_past_gym, user_past_protien)
    VALUES
    (${user_id},'${user_aaddhar}','${user_address}','${user_city}','${user_pincode}','${user_mobile_number}','${user_date_of_birth}','${user_gender}'
    ,'${user_blood_group}','${user_height}','${user_weight}','${user_purpose}','${user_training_type}','${user_medical_history}','${user_past_gym}','${user_past_protien}')`;


    /* Sending mail*/
    link = utils.createLink(request);
    const transporter = utils.createTransport();
    var mailOptions = {
      from: 'siddhant.ghosh.5@gmail.com',
      to: user_email,
      subject: 'Welcome to Royal Fitness Club !',
      text: `Password for Royal Fitness Club for ${request.body.user_name} and Email ID ${request.body.user_email} is ${generated_password} + '\n' +
                Also, Please click on the following link to verify your Email + '\n' +
                ${link}`,
      html: `<h4> Password for ${request.body.user_name} and Email ID ${request.body.user_email} </h4> <hr> \n
              <h1>${generated_password}</h1> \n
              <b>Also, Please click on the following link to verify your Email</b>\n
              <a href="${link}"> Link</a>`
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {

      if (error) {
        return console.log('Error in Sendmail', error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      response.send(info.responseCode);
    });
    /* Resuming Flow */
    connection.query(statement_user_records, (error_create, results_create) => {
      console.log(results_create);
      console.log(error_create);
    });
    const statement_verify = `INSERT INTO verify_user (user_id, verify_key) VALUES (${user_id}, '${link}')`;
    connection.query(statement_verify, (error_verify, results_verify) => {});
    connection.end();
    var result = {};
    result.status = 'success';
    result.id = results.insertId;

    utils.sendSMS(user_mobile_number, message).then(function (result) {
      console.log(result);
    }).catch(function (error) {
      console.log(error);
    });
    response.send(result);
  });
});



/* POST user Login */
router.post('/user/login', (request, response) => {

  const userName = request.body.userName;
  const password = crypto.createHash('SHA256').update(request.body.password).digest('base64');

  var connection = db.connect();
  const statement = `SELECT user_email, user_password FROM users WHERE user_email = '${userName}' and user_password = '${password}'`;
  console.log(statement);

  connection.query(statement, (error, results) => {
    connection.end();
    console.log(results[0].user_email);
    var result = {};
    console.log(results);
    console.log(error);
    if (results.length === 0) {
      result.status = 'error';
      result.message = 'Invalid Username or password';
    } else {
      result.status = 'success';
      result.message = 'Correct Login Details';
      result.data = results;
    }
    response.send(result);
  });

});

/* enter user data */

/* change user active status*/
router.post('/user/changeactivestatus/', (request, response) => {
  const userid = request.body.user_id;
  var connection = db.connect();
  console.log(userid);
  const statement = `update users set user_active = 'N' where user_id = ${userid}`;
  console.log(statement);
  connection.query(statement, (error, results) => {
    connection.end();
    console.log(error);
    console.log(results);
    response.send(utils.createResult(error, results));
  });
});
/* Change Password*/
router.post('/user/change-password/', (request, response) => {
  const user_email = request.body.user_email;
  const user_password = request.body.user_password;
  var connection = db.connect();
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'siddhant.ghosh.5@gmail.com',
      pass: '9011392667'
    }
  });
  var mailOptions = {
    from: 'siddhant.ghosh.5@gmail.com',
    to: user_email,
    subject: 'Password for Royal Fitness Club',
    text: `New Password for ${user_email} is ${user_password}`
  };
  console.log(mailOptions);
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log('Error in Sendmail', error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    response.send(info.responseCode);
  });
  const statement_change_password = `UPDATE users SET user_password = '${user_password}' WHERE user_email = '${user_email}'`;
  console.log(statement_change_password);
  connection.query(statement_change_password, (error, results) => {
    connection.end();
    response.send(utils.createResult(error, results));
  });
});

/* Verify User */
router.get('/user/verify', (request, response) => {
  const connection = db.connect();
  const host = `${request.protocol+"://"+request.get('host')}/user/verify?id=${request.query.id}`;
  console.log(host);
  const statement_verify_email = `SELECT user_id, verify_key from verify_user where verify_key = '${host}'`;

  connection.query(statement_verify_email, (error_verify_email, result_verify_email) => {

    console.log(error_verify_email);
    console.log(result_verify_email);
    var result = {};
    if (result_verify_email.length === 0) {
      result.status = 'error';
      result.message = 'Invalid Link';
    } else {
      result.status = 'success';
      result.message = 'verified';
    }
    const statement_activate_user = `update users set user_active = 'Y', is_verified = 1 where user_id = ${result_verify_email[0].user_id}`;
    connection.query(statement_activate_user, (error_activate_user, result_activate_user) => {
      console.log(result_activate_user);
    });
    connection.end();
    response.end("<h1>Email is " + result.message + "</h1>");
  });
});

router.get('/users/get', (request, response) => {
  console.log(request.query.id);
  const statement = `SELECT * from user_records WHERE user_id = '${request.query.id}'`;
  console.log(statement);
  var connection = db.connect();
  connection.query(statement, (error, results) => {
    connection.end();
    console.log(results);
    console.log(error);
    var result = {};
    if (results.length === 0) {
      result.status = 'error';
      result.message = 'Some error has occured contact Siddhant';
    } else {
      result.status = ['success'];
      result.message = ['ok'];
      result.data = results;
    }

    response.send(result);
  });
});

module.exports = router;