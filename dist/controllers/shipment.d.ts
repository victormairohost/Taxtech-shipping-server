import { Request, Response } from "express";
export declare const createShipment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllShipments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getShipmentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateShipment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteShipment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
