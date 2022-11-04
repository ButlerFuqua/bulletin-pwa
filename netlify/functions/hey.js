
export const handler = async () => {

    try {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'hey' }),
        }
    } catch (error) {
        console.error(`Error #hey`, error)
        return { error }
    }

}