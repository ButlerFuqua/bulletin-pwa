
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { testimonyId } = JSON.parse(body)

    try {

        const { data: testimonies } = await axios.get(
            `${url}/rest/v1/testimonies?id=eq.${testimonyId}`,
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${serviceRole}`
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(testimonies[0]),
        }
    } catch (error) {
        console.error(`Error #get-testimonies`, error)
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify(error),
        }
    }

}