
const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;


export const handler = async (event) => {

    const { body } = event;
    const { organization, orgLocation } = JSON.parse(body)

    try {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'hey', organization, orgLocation, url }),
        }
    } catch (error) {
        console.error(`Error #hey`, error)
        return { error }
    }

}