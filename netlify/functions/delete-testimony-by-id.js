
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { accessToken, testimonyId } = JSON.parse(body)

    try {

        await axios.delete(
            `${url}/rest/v1/testimonies?id=eq.${testimonyId}`,
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${accessToken}`,
                    ['Content-Type']: 'application/json'
                },
            }
        )


        return {
            statusCode: 204
        }
    } catch (error) {
        console.error(`Error #create-testimony`, error)
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify(error),
        }
    }

}