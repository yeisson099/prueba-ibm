var forge = require('node-forge');


//Encripta un campo tipo String con RSA pasandole la clave Publica
function encriptarValor(publicKey, valorCampo){
	var publicKey = forge.pki.publicKeyFromPem(publicKey);
    var buffer = forge.util.createBuffer(valorCampo, 'utf8');
	var binaryString = buffer.getBytes();
	var encrypted = publicKey.encrypt(binaryString, 'RSA-OAEP', {
		md: forge.md.sha256.create(),
		mgf1: {
		  md: forge.md.sha1.create()
		}
	  })
    return forge.util.encode64(encrypted);
}

//Encripta un campo tipo String con RSA pasandole la clave Publica
function desencriptarValor(encrypt){
	const privateKeyV = "-----BEGIN RSA PRIVATE KEY-----MIICWwIBAAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAECgYARcIzJrWLSqQisBKQMjGJvAQ+9PaQNE05TL7abXT8n7uqOLDTE/VbR/NI7lPoxulyHnTzzQieQ7zRZLt3FPpk4W612W35aoiusLMY9Tl9+IJTJH/fJWoVTOT6jplljLL87t1R0gbl6a1/8n4hp1X6+qAJxlG3KvEKNU3bxhUhamQJBALGG3qpOTyvS0vp+pkyxPjvV8VwplMu27klS469uByPpIVJ6UVYGbgWhGzUsaPVKmEIEoEbk9mj2VfL3RVBfIDsCQQCF8UwEEXiMeiWogu8kNapnAC6l/6SSiOnuDWrWG4aRXyRiRviTptS6Hd9gZENfZG3wObrBrh0lGN2kQKWPiOj9AkEArshmua5X7IGpDs9a0+89opPFCkQ2J0t31+EwIixmA0kocZfUNKon8IrpyrRqsfY7aeQ8GRCcOkMt5ATnzXWauQJAHvcU2s/rLZbDg/yZKqbZeSx6nFfIhTPv2N/zNgJxDsSPFcVQjFoCTfDABnnHdZMzM1k1Srdk94GTI/jqDY/aRQJASk5i1+D7TWL0YcwWE1wi+rMC1YgBdqJYFjKQF5sy0IbZmkCSJbrZ2RpFY2voX9ZBip8c1O7A4oXn8RvvRbimAA==-----END RSA PRIVATE KEY-----"
	var privateKey = forge.pki.privateKeyFromPem(privateKeyV);
	var decode = forge.util.decode64(encrypt)
	var decrypted = privateKey.decrypt(decode, 'RSA-OAEP', {
		md: forge.md.sha256.create(),
		mgf1: {
		  md: forge.md.sha1.create()
		}
	  });
    return decrypted;
}

//Enmascara un valor con asteriscos y deja visibles los n últimos caracteres
function enmascararValor(valorCampo, visibles) {
	if (valorCampo != null && visibles != null && valorCampo.length > visibles) {
		var enmascarado = "";
		var size = valorCampo.length;
		if (valorCampo != null && size != 0) {
			for (i = 0; i < (size - visibles); i++) {
				enmascarado = enmascarado + "*";
			}
		}

		if (visibles > 0) {
			enmascarado = enmascarado + valorCampo.substring(valorCampo.length - visibles);
		}
		return enmascarado;
	} else {
		return valorCampo;
	}
}

//Cifra y enmascara elemento pasado como parámetro
function encriptarCampo(nomVar, nomVarCrypto, visibles, publicKey) {
	if (document.getElementById(nomVar)) {
		var val = document.getElementById(nomVar).value;
		if (val.trim().length != 0) {
			document.getElementById(nomVar).value = enmascararValor(val, visibles);
			document.getElementById(nomVarCrypto).value = encriptarValor(publicKey, val);
		}
	}
}

exports.encriptarCampo = encriptarCampo;
exports.enmascararValor = enmascararValor;
exports.encriptarValor = encriptarValor;
exports.desencriptarValor = desencriptarValor;