const environments = {
    development : {
        httpPort : 3000,
        httpsPort : 3001,
        envName: 'staging'
    },
    production : {
        httpPort : 5000,
        httpsPort : 5001,
        envName: 'production'
    }

}

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? 
    process.env.NODE_ENV.toLowerCase() : '';

type environmentTypes = keyof typeof environments;

const environmentToExport = environments[currentEnvironment as environmentTypes] ?
    environments[currentEnvironment as environmentTypes] : environments.development;

export default environmentToExport;