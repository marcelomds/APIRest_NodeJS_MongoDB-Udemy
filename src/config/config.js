const env = process.env.NODE_ENV || 'dev';

const config = () => {
    // De acordo com os Ambientes

    switch (env) {
        case "dev":
            return {
                bd_connect: 'mongodb://localhost/udemy_nodejs_express_api',
                jwt_pass: 'mmoreira012',
                jwt_expired: '7d',
            }

        case "homologacao":
            return {
                bd_connect: 'mongodb://localhost/udemy_nodejs_express_api'
            }

        case "producao":
            return {
                bd_connect: 'mongodb://localhost/udemy_nodejs_express_api'
            }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();