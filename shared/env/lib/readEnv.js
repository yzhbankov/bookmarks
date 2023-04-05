const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

function getEnvPath(env) {
    const testEnvPath = path.join(__dirname, '../.env.test');
    const gitlabEnvPath = path.join(__dirname, '../.env.gitlab');
    const prodEnvPath = path.join(__dirname, '../.env');
    const defEnvPath = path.join(__dirname, '../.env.defaults');

    if (env === 'test') {
        return testEnvPath;
    } else if (env === 'gitlab') {
        return gitlabEnvPath;
    } else if (env === 'development') {
        return defEnvPath;
    } else if (fs.existsSync(prodEnvPath)) {
        return prodEnvPath;
    }
    return defEnvPath;
}

const env_path = getEnvPath(process.env.NODE_ENV);

dotenv.config({ path: env_path });
