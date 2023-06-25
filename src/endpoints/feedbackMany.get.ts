import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

/**
 * Asynchronously retrieves feedback information of a user from the database.
 *
 * @param {string} email - email of the user to retrieve feedback for.
 * @returns {Promise<{success: boolean, data: {[key: string]: any}}>} - A Promise that resolves to an object containing a success flag and feedback data for the user.
 * The feedback data is an object containing an 'xyz' key, which maps to an array of feedback for the user.
 * If the Promise rejects, it returns an object with a message key containing the error message.
 * 
 *  @example
 * ```js
 * try {
 *     const response = await getFeedback({
 *         email: 'a@b.com'
 *     })
 *     console.log(response)
 * } catch (error) {
 *     console.log(error)
 * }
 * ```
 */
async function getFeedback({ email }: { email: string }) {
    return new Promise(async (resolve, reject) => {
        try {
            // Get feedback from database
            const feedbackData = await prisma.feedback.findFirstOrThrow({
                where: {
                    email,
                },
            })
            // console.log(feedbackData)
            // Return success message
            return resolve({
                success: true, data: feedbackData
            })
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

export default getFeedback