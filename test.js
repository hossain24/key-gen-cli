/* function verifySignedFile() {
    fs.readFile('key.public', (publicKey, err) => {
        var publicKey = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
        var file = Buffer.alloc(crypto_sign_BYTES);
        var signedFile = Buffer.alloc(sodium.crypto_sign_BYTES);

        var bool = sodium.crypto_sign_open(file, signedFile, publicKey);
        var bool = true;
        if (bool) {
            console.log(bool);
        } else
            return false;

        if (err) throw err;
    });
}*/