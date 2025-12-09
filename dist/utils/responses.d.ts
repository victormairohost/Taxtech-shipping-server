import { Response } from "express";
export declare const successResponse: (res: Response, statusCode: number, message: string, data?: any) => Response<any, Record<string, any>>;
export declare const errorResponse: (res: Response, statusCode: number, message: string) => Response<any, Record<string, any>>;
