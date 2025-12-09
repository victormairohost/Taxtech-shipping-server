/*All the codes in the file are codes that can be reuseable

*/
import { fileURLToPath } from 'url';
import { eachDayOfInterval, isWeekend } from 'date-fns';
// import moment from "moment-timezone";
// Nodejs encryption with CTR
// import crypto from 'crypto'
// const iv = crypto.randomBytes(16)
// Get the directory name
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
// const timeZone = "Africa/Lagos";
const currentTimeInNigeria = new Date();
// environmental variables
// const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET_KEY as string
// const USER_INFO_ENCRYPTION_KEY = process.env.USER_INFO_ENCRYPTION_KEY as string
// const USER_INFO_ENCRYPTION_ALGORITHM = process.env
//   .USER_INFO_ENCRYPTION_ALGORITHM as string
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string
// const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string
// const UYJ_STATS_ID = process.env.UYJ_STATS_ID as string
// const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD as string
// const EMAIL_SENDER = process.env.EMAIL_SENDER as string
// const EMAIL_NAME = process.env.EMAIL_NAME as string
// returns an array of strings that contains a criteria not met by password
export const strongPasswordValidation = (password) => {
    let passwordResult = [];
    if (password.length < 6) {
        passwordResult.push('Password must be at least 6 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
        passwordResult.push('Password must contain an uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
        passwordResult.push('Password must contain a lowercase letter.');
    }
    if (!/\d/.test(password)) {
        passwordResult.push('Password must contain a number.');
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
        passwordResult.push('Password must contain a special character.');
    }
    return passwordResult;
};
// ************
// a custom error constructor
export class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        // Restore prototype chain
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
// ************
// handle one-time-password generation
export const handleOTP = async () => {
    function generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    }
    try {
        const CODE = generateOTP();
        // subtract 1 from the counter so that we can know the counter number that was use to create a particular OTP
        return { CODE };
    }
    catch (error) {
        console.error('Error during authentication:', error.message);
    }
};
// *******s
// create a jwtToken token
// export const generateJWT = async (userInfo: any) => {
//   return await jwt.sign(userInfo, JWT_SECRET_KEY, {
//     expiresIn: JWT_EXPIRATION,
//   })
// }
//token payload encryption and decryption before sign
// export const encrypt = (text: string) => {
//   let cipher = crypto.createCipheriv(
//     USER_INFO_ENCRYPTION_ALGORITHM,
//     Buffer.from(USER_INFO_ENCRYPTION_KEY),
//     iv
//   )
//   let encrypted = cipher.update(text)
//   encrypted = Buffer.concat([encrypted, cipher.final()])
//   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') }
// }
// export const decrypt = (text: any) => {
//   let iv = Buffer.from(text.iv, 'hex')
//   let encryptedText = Buffer.from(text.encryptedData, 'hex')
//   let decipher = crypto.createDecipheriv(
//     USER_INFO_ENCRYPTION_ALGORITHM,
//     Buffer.from(USER_INFO_ENCRYPTION_KEY),
//     iv
//   )
//   let decrypted = decipher.update(encryptedText)
//   decrypted = Buffer.concat([decrypted, decipher.final()])
//   return decrypted.toString()
// }
// format phone number
// export const formattedPhoneNumber = (phoneNumber: string) => {
//   // check if the phone number starts with 0
//   if (phoneNumber.startsWith("0")) {
//     return phoneNumber.replace(/^0/, "+234");
//   }
//   // check if the phone number starts with 234
//   if (phoneNumber.startsWith("234")) {
//     return phoneNumber.replace(/^234/, "+234");
//   }
//   // check if phone number length is less than 11
//   if (phoneNumber.length <= 10) {
//     return `+234${phoneNumber}`;
//   }
//   return phoneNumber;
// };
export const formattedPhoneNumber = (phoneNumber) => {
    // Remove any spaces, hyphens, or other non-digit characters
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    // Check if the number starts with 0
    if (cleanedNumber.startsWith('0')) {
        return cleanedNumber.replace(/^0/, '+234');
    }
    // Check if the number starts with 234 (without +)
    if (cleanedNumber.startsWith('234')) {
        return `+${cleanedNumber}`;
    }
    // Check if the number is shorter than 11 digits
    if (cleanedNumber.length <= 10) {
        return `+234${cleanedNumber}`;
    }
    // Assume it's already correctly formatted if it doesn't match the above
    if (cleanedNumber.startsWith('+')) {
        return cleanedNumber;
    }
    // Default case: prepend +234 for unexpected input
    return `+234${cleanedNumber}`;
};
// // nodemailer email sender
// export const sendEmail = async ({
//   userEmail,
//   emailSubject,
//   emailBody,
// }: {
//   userEmail: string
//   emailSubject: string
//   emailBody: string
// }) => {
//   // NOTE remember to change the email and password to a more secure one using env
//   let mailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: GOOGLE_EMAIL_SENDER,
//       pass: GOOGLE_APP_PASSWORD,
//     },
//   })
//   let mailDetails = {
//     // from: GOOGLE_EMAIL_SENDER,
//     from: `"${EMAIL_NAME}" <${GOOGLE_EMAIL_SENDER}>`,
//     to: userEmail,
//     subject: emailSubject,
//     html: emailBody,
//   }
//   await mailTransporter.sendMail(mailDetails)
// }
// nodemailer email sender
// export const sendEmail = async ({
//   userEmail,
//   emailSubject,
//   emailBody,
// }: {
//   userEmail: string
//   emailSubject: string
//   emailBody: string
// }) => {
//   // NOTE remember to change the email and password to a more secure one using env
//   let mailTransporter = nodemailer.createTransport({
//     // service: 'gmail',
//     // secure: true,
//     // port: 587,
//     // pool: true,
//     host: 'smtp.hostinger.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: EMAIL_SENDER,
//       pass: EMAIL_APP_PASSWORD,
//     },
//   })
//   await mailTransporter.verify()
//   console.log('Smtp configuration is correct')
//   let mailDetails = {
//     from: `"${EMAIL_NAME}" <${EMAIL_SENDER}>`,
//     to: userEmail,
//     subject: emailSubject,
//     html: emailBody,
//   }
//   await mailTransporter.sendMail(mailDetails)
// }
// ************
// A function to encrypt and decrypt a string using Cryptr library
// const cryptr = new Cryptr(ENCRYPTION_KEY)
// export const encryptString = (text: string) => {
//   return cryptr.encrypt(text)
// }
// export const decryptString = (text: string) => {
//   try {
//     return cryptr.decrypt(text)
//   } catch (error) {
//     return 'Invalid request'
//   }
// }
// // export const get current date in mongoDB format
// export const getCurrentDate = () => {
//   return new Date().toISOString()
// }
// export const UYJStatsDocumentID = UYJ_STATS_ID
// // calculate 24hrs difference between two dates
// export function isDifferenceMoreThan24Hours(
//   date1: string | Date,
//   date2: string | Date
// ): boolean {
//   // Ensure date1 and date2 are Date objects
//   const dateObj1: Date = new Date(date1)
//   const dateObj2: Date = new Date(date2)
//   // Calculate the difference in milliseconds
//   const differenceInMilliseconds: number = Math.abs(
//     dateObj2.getTime() - dateObj1.getTime()
//   )
//   // Convert milliseconds to hours
//   const millisecondsInAnHour: number = 1000 * 60 * 60
//   const differenceInHours: number =
//     differenceInMilliseconds / millisecondsInAnHour
//   // Check if the difference is more than 24 hours
//   return differenceInHours > 24
// }
export function getDaysBetweenDates(prevDate) {
    // Parse the dates or create new Date objects
    const currentDate = new Date();
    const previousDate = new Date(prevDate);
    // Get the difference in time milliseconds
    const timeDifference = currentDate.getTime() - previousDate.getTime(); // Future date - current date
    // Convert time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    // number of weekends between the two dates
    const numOfWeekends = checkHowManyWeekendsBetweenDates(previousDate);
    // subtract the number number of weekends from the daysDifference
    const actualDaysBetween = Math.floor(daysDifference) - numOfWeekends;
    return actualDaysBetween;
}
// get dates between two dates
function checkHowManyWeekendsBetweenDates(startDate) {
    let result = 0;
    const dates = eachDayOfInterval({
        start: new Date(startDate),
        end: currentTimeInNigeria.toISOString(),
    });
    dates.forEach((date) => {
        if (isWeekend(date)) {
            result++;
        }
    });
    return result;
}
// set time to mid night
export function setToMidnight(date) {
    date.setUTCHours(0, 0, 0, 0);
    return date;
}
//# sourceMappingURL=helpers.js.map