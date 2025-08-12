import 'dotenv/config';

export default ({ config }) => {
    return {
        ...config,
        extra: {
            API_KEY: process.env.API_KEY,
            USER_SERVICE_URL: process.env.USER_SERVICE_URL,
            MONITORING_SERVICE_URL: process.env.MONITORING_SERVICE_URL,
            IRRIGATION_SERVICE_URL: process.env.IRRIGATION_SERVICE_URL,
            projectId: process.env.PROJECT_ID

            // add all your env variables here
        },
    };
};