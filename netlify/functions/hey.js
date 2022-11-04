
export const handler = async (event) => {

    const { body } = event;
    const { organization, orgLocation } = JSON.parse(body)

    try {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'hey', organization, orgLocation }),
        }
    } catch (error) {
        console.error(`Error #hey`, error)
        return { error }
    }

}