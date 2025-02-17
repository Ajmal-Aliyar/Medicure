import { NextFunction, Request, Response } from "express";
import { IFeedbackService } from "../services/interfaces/IFeedbackServices";

export class FeedbackController {
    private feedbackService: IFeedbackService;

    constructor( feedbackService: IFeedbackService ) {
        this.feedbackService = feedbackService

        this.handleFeedbackSubmission = this.handleFeedbackSubmission.bind(this)
        this.getFeedbackByUser = this.getFeedbackByUser.bind(this)
        this.getFeedbackForDoctor = this.getFeedbackForDoctor.bind(this)
    }

    async handleFeedbackSubmission( req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { patientId, doctorId, rating, comments } = req.body
            const response = await this.feedbackService.createFeedback({ patientId, doctorId, rating, comments })
            res.status(201).json({response})
        } catch (error: any) {
            console.error(error)
            next(error)
        }
    }

    async getFeedbackByUser( req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { _id } = req.client
            const { page = 1, limit = 10 } = req.query;

            const pageNumber = parseInt(page as string) || 1;
            const limitNumber = parseInt(limit as string) || 10;
            const skip = (pageNumber - 1) * limitNumber;
    
            const feedbackData = await this.feedbackService.getFeedbackByUser( _id, skip, limitNumber);
            res.status(201).json({feedbackData})
        } catch (error: any) {
            console.error(error)
            next(error)
        }
    }

    async getFeedbackForDoctor( req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { _id } = req.client
            const { page = 1, limit = 10 } = req.query;
            const pageNumber = parseInt(page as string) || 1;
            const limitNumber = parseInt(limit as string) || 10;
            const skip = (pageNumber - 1) * limitNumber;
    
            const feedbackData = await this.feedbackService.getFeedbackForDoctor( _id, skip, limitNumber);
            res.status(201).json({feedbackData})
        } catch (error: any) {
            console.error(error)
            next(error)
        }
    }
}