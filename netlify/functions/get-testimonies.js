
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { organization, orgLocation } = JSON.parse(body)

    try {

        const { data: testimonies } = await axios.get(
            `${url}/rest/v1/testimonies?organization=eq.${organization}${orgLocation ? `&org_location=eq.${orgLocation}` : ''}&select=*`,
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${serviceRole}`,
                    Range: '0-9'
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(testimonies),
        }
    } catch (error) {
        console.error(`Error #get-testimonies`, error)
        return { error }
    }

}