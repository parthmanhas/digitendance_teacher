import React from 'react';
import { Crypt, RSA } from 'hybrid-crypto-js';

const Encryption = props => {
    var crypt = new Crypt();
    var rsa = new RSA();

    rsa.generateKeyPair(function(keyPair) {
        // Callback function receives new key pair as a first argument
        var publicKey = keyPair.publicKey;
        var privateKey = keyPair.privateKey;
    });

    var entropy = 'Random string, integer or float';
    var crypt = new Crypt({ entropy: entropy });
    var rsa = new RSA({ entropy: entropy });

    var crypt = new Crypt({ md: 'sha512' });

    var message = 'Hello world!';

    var encrypted = crypt.encrypt(publicKey, message);

    var decrypted = crypt.decrypt(privateKey, encrypted);

    var messageDecrypted = decrypted.message;

    console.log(messageDecrypted);

    var verified = crypt.verify(
        issuerPublicKey,
        decrypted.signature,
        decrypted.message,
    );

    console.log(verified);
}

export default Encryption;