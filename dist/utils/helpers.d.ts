export declare const strongPasswordValidation: (password: string) => string[];
export declare class CustomError extends Error {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string);
}
export declare const handleOTP: () => Promise<{
    CODE: string;
} | undefined>;
export declare const formattedPhoneNumber: (phoneNumber: string) => string;
export declare function getDaysBetweenDates(prevDate: string | Date): number;
export declare function setToMidnight(date: Date): Date;
