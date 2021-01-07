
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const {encriptarValor, enmascararValor, desencriptarValor } = require('./modules/forge');
const app = express();

app.use(cors());
app.use(express.json());

//Settings
app.set('appName', 'prueba IBM');
app.set('port', '3000')

//Middlewares
app.use(express.json());

//Routes
app.get('/api/key', (req, res) => {
    res.json({
        Keyname: 'accessKey',
        keyNumber: "-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFziZlz1VnGhqISYCoKet7ED8pEJU5Y3XoZ7Pep8LCFUlKZ+bZTmgq4gawbpVtUCMJlTIDyQcT2zlzyBDLbBPgsDdEw868F9TioOjbQ+l6dfrXIuaRR3n8+IKEx2NIP0HtwtIjwKNv1nhbmEttYau/fAtxi/Xvw2mmAXi+e3kFJPAgMBAAE=-----END PUBLIC KEY-----"
    });
});

app.post('/api/enmascarar', (req, res) => {
    let valor = enmascararValor(req.body.cedula, 2);
    res.json({
        nombre: req.body.nombre,
        cedula: valor
    });
});

app.post('/api/encryptar', (req, res) => {
    let valor = encriptarValor(req.body.key, req.body.value);
    let valorD = desencriptarValor(valor);
    res.json({
        value: valor
    });
    // const valordes = desencriptarValor('', valor);
    logger.info(`la cedula original es ${valorD}`);
});

app.post('/api/decrypt', (req, res) => {
    let valor = desencriptarValor(req.body.value);
    res.json({
        value: valor
    });
    logger.info(`la cedula original es ${valor}`);
});

app.listen(app.get('port'), () => {
    logger.info('servidor prendido')
});

