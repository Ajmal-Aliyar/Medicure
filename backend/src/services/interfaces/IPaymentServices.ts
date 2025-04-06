import { ITransaction } from "../../models/transaction/transactionInterface"

export interface IPaymentServices {
    checkoutSession (data: ICheckoutSession): Promise<any>
    webhookHandler(bodyData: any, sig: string): Promise<void>
    processRefund(transactionId: string): Promise<any>
    approveWithdrawal(transactionId: string): Promise<any>
    createConnectedAccountAndPayout({
        email,
        accountHolderName,
        accountNumber,
        ifscCode,
        amountInRupees
      }) 
}

export interface ICheckoutSession {
    doctorName: string, 
    specialization: string, 
    startTime: string, 
    endTime: string, 
    duration: string, 
    fees: number, 
    doctorId: string, 
    patientId: string, 
    slotId: string, 
    appointmentDate: string
}