const sodium = require('sodium-native');
const fs = require('fs');

const keygen = (publicKey, secretKey) => {
    var publicKey = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
    var secretKey = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);

    sodium.crypto_sign_keypair(publicKey, secretKey);

    fs.writeFile('key.public', publicKey, (err) => {
        if (err) throw err;
        console.log('Public Key is Successfully written');
    });

    fs.writeFile('key.secret', secretKey, (err) => {
        if (err) throw err;
        console.log('Secret Key is Successfully written');
    });
}

const signFile = () => {
    fs.readFile('key.secret', 'hex', (secretKey, err) => {
        var secretKey = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);

        var file = Buffer.from('FILE');
        var signedFile = Buffer.alloc(sodium.crypto_sign_BYTES + file.length);

        var signature = sodium.crypto_sign(signedFile, file, secretKey);

        if (err) throw err;
        console.log(signature);
    });
}

const verifySignature = () => {
    fs.readFile('key.public', (publicKey, err) => {
        var secretKey = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);

        var file = Buffer.from('FILE');
        var signature = sodium.crypto_sign(signFile, file, secretKey);

        var bool = sodium.crypto_sign_verify_detached(signature, file, publicKey);

        if (err) throw err;
        Boolean(bool);
    });
}

keygen();
signFile();
verifySignature();