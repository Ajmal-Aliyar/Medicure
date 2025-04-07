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
            const { doctorId, patientId, appointmentId, rating, comments } = req.body

            const response = await this.feedbackService.createFeedback({ doctorId, patientId, appointmentId, rating, comments })
            res.status(201).json({response})
        } catch (error: any) {
            console.error(error)
            next(error)
        }
    }

    async getFeedbackByUser( req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { _id } = req.client
            const skip = parseInt(req.query.skip as string) || 0
            const limit = parseInt(req.query.limit as string) || 5

            const feedbackData = await this.feedbackService.getFeedbackByUser( _id, skip, limit);
            res.status(201).json(feedbackData)
        } catch (error: any) {
            console.error(error)
            next(error)
        }
    }

    async getFeedbackForDoctor( req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { _id } = req.client
            const skip = parseInt(req.query.skip as string) || 0
            const limit = parseInt(req.query.limit as string) || 5
    
            const feedbackData = await this.feedbackService.getFeedbackForDoctor( _id, skip, limit);
            res.status(201).json(feedbackData)
        } catch (error: any) {
            console.error(error)
            next(error)
        }
    }
}