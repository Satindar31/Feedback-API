import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

/**
 * Saves user feedback to the database.
 *
 * @param {Object} feedbackData - An object containing user's name, email, and feedback message.
 * @param {string} feedbackData.name - The name of the user providing feedback.
 * @param {string} feedbackData.email - The email of the user providing feedback.
 * @param {string} feedbackData.feedback - The feedback message provided by the user.
 * @return {Promise<{success: boolean}>} A promise that resolves with a success message or rejects with an error message.
 * 
 * @example
 * ```js
 * try {
 *     const response = await saveFeedback({
 *         name: 'John Doe',
 *         email: 'a@b.com',    
 *         feedback: 'My feedback message'
 *     })
 *      console.log(response)
 * } catch (error) {
 *     console.log(error)  
 * }
 * ```
 */
function saveFeedback({ name, email, feedback, brand }: { name: string, email: string, feedback: string, brand: number }) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(name, email, feedback, brand)
            // Save feedback to database
            await prisma.feedback.create({
                data: {
                    email,
                    name,
                    message: feedback,
                    brand
                },
            })
            // Return success message
            return resolve({ success: true })
        }
        catch (error: any) {
            console.log(error)
            // Return error message
            return reject({
                message: error.message
            })
        }
    })
}

export default saveFeedback