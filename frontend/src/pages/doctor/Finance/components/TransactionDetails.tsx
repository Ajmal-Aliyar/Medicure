import { useTransaction } from "@/hooks/useTransaction";
import { formatDate, formatTimeTo12Hour } from "@/utils/formatDate"
import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}
const TransactionDetails = ({ className }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetchingNextPage } = useTransaction(page);
  const transactions = data?.transactions || [];
  const totalPages = data?.meta?.totalPages || 1;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || page >= totalPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef.current, page, totalPages, isFetchingNextPage]);

  const grouped = transactions.reduce((acc: Record<string, typeof transactions>, txn) => {
    const key = formatDate(txn.createdAt.toString());
    if (!acc[key]) acc[key] = [];
    acc[key].push(txn);
    return acc;
  }, {});
  return (
    <div className={`p-4 -mt-10  max-w-2xl overflow-y-auto ${className}`}>
      {Object.entries(grouped).map(([date, txns]) => (
        <div key={date}>
          <div className="text-sm font-medium text-secondary mb-1 mt-7">{date}</div>
          {txns.map((txn) => (
            <div
              key={txn.id}
              className="border-b border-gray-200 p-3 flex justify-between"
            >
              <div>
                <p className="text-md text-secondary">
                  {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTimeTo12Hour(txn.createdAt.toString())}
                </p>
              </div>
              <p
                className={`${txn.type === 'withdraw' ? "text-red-700" : txn.direction === "credit"
                  ? "text-green-700"
                  : "text-red-700"
                  }`}
              >
                ₹{txn.amount}
              </p>
            </div>
          ))}
        </div>
      ))}

      {isLoading && <p>Loading...</p>}
      <div ref={loaderRef} className="h-10" />
    </div>
  )
}

export default TransactionDetails