const jwt = require('jsonwebtoken');

module.exports.verificarToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers){
        token = req.headers['authorization'];
        idDocente = req.headers['iddocente'];
    }

    if (!token)
        return res.status(500).send({message: 'Acceso denegado.'});
    else {
        jwt.verify(token, 'chatUtpl2019',
            (err, decoded) => {
                if (err)
                    return res.status(500).send({message: 'Acceso denegado.'});
                else {
                    if (decoded.id == idDocente){
                        next();
                    }else{
                        return res.status(500).send({message: 'Acceso denegado.'});
                    }
                }
            }
        )
    }
}