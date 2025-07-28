import type { MetaType } from "@/types/common";
import type { Transaction } from "@/types/transaction";
import { useState, useEffect } from "react";
import { useRole } from "./useRole";
import { patientTransactionService } from "@/services/api/patient/transaction";
import type { IRole } from "@/types/auth";
import { doctorTransactionService } from "@/services/api/doctor/transaction";
import { adminTransactionService } from "@/services/api/admin/transaction";

interface TransactionService {
    getTransactionDetails: (page: number) => Promise<{
        data: Transaction[];
        meta: MetaType;
    }>;
}

export const useTransaction = (page: number) => {
    const [data, setData] = useState<{
        transactions: Transaction[];
        meta: MetaType;
    }>({ transactions: [], meta: { page: 1, totalPages: 1 } });
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const role = useRole();
    
    useEffect(() => {
        const fetchData = async () => {
            if (page === 1) setIsLoading(true);
            setIsFetchingNextPage(true);

            const services: Record<IRole, TransactionService> = {
                patient: patientTransactionService,
                doctor: doctorTransactionService,
                admin: adminTransactionService,
            };

            if (!services[role]) {
                throw new Error("Invalid role");
            }

            const result = await services[role].getTransactionDetails(page);

            setData(prev => ({
                transactions: page === 1
                    ? result.data
                    : [...prev.transactions, ...result.data],
                meta: result.meta,
            }));

            setIsLoading(false);
            setIsFetchingNextPage(false);
        };

        fetchData();
    }, [page]);

    return {
        data,
        isLoading,
        isFetchingNextPage,
    };
};
