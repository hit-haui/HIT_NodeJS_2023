/*
    npm i jsonwebtoken
    npm i bcrypt
    // Load hash from your password DB.
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.s
    });
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
    });
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
        // result == false
    });
    const jwt = require('jsonwebtoken');
*/
