import { NextFunction, Request, Response } from "express";
import { IDashboardServices } from "../services/interfaces/IDashboardServices";

export class DashboardController {
    private dashboardServices: IDashboardServices;

    constructor( dashboardServices: IDashboardServices) {
        this.dashboardServices = dashboardServices;

        this.getPatientDashboard = this.getPatientDashboard.bind(this)
        this.getChartDetails = this.getChartDetails.bind(this)
    }

    async getPatientDashboard( _req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.dashboardServices.getPatientDashboard()
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getChartDetails( _req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.dashboardServices.getChartDetails()
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

}