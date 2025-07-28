import { DEFAULT_IMAGE } from "@/app/constants";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { adminConnectionRequestService } from "@/services/api/admin/connection-request";
import { doctorConnectionRequestService } from "@/services/api/doctor/connection-request";
import { patientConnectionRequestService } from "@/services/api/patient/connection-request";
import type { IRole } from "@/types/auth";
import type {
  ConnectionRequestListDetails,
  IConnectionRequestService,
} from "@/types/connection-request";
import { formatDateToLong } from "@/utils/formatDate";
import { statusColor } from "@/utils/statusColor";
import { useEffect, useMemo, useState } from "react";

interface Props {
  role: IRole;
}

const ChatRequestList = ({ role }: Props) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequestListDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service: IConnectionRequestService = useMemo(() => {
    const services: Record<IRole, IConnectionRequestService> = {
      patient: patientConnectionRequestService,
      doctor: doctorConnectionRequestService,
      admin: adminConnectionRequestService,
    };
    return services[role];
  }, [role]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const { data, meta } = await service.getRequests(page);
        setConnectionRequests(data);
        setTotalPage(meta.totalPages);
        setError(null);
      } catch (err) {
        setError("Failed to load connection requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [page, service]);

  const approveRequest = async (requestId: string) => {
    try {
      await doctorConnectionRequestService.approveRequest(requestId);
      setConnectionRequests((prev) =>
        prev.map((rqst) =>
          rqst.id === requestId ? { ...rqst, status: "accepted" } : rqst
        )
      );
    } catch (err) {
      console.error("Failed to approve request:", err);
    }
  };

  const RequestItem = ({ rqst }: { rqst: ConnectionRequestListDetails }) => {
    const target =
      role === "patient" ? rqst.doctor : rqst.patient;

    return (
      <div className="flex items-start gap-4 p-4 border-b border-border w-full">
        <img
          src={target.profileImage || DEFAULT_IMAGE}
          alt={target.fullName}
          className="w-12 h-12 rounded-full shadow object-cover"
        />

        <div className="flex-1">
          <p className="text-secondary font-medium">{target.fullName}</p>
          <p className="text-primary-light text-xs">
            {formatDateToLong(String(rqst.createdAt))}
          </p>
        </div>

        <div className="mt-1 text-right">
          {role === "patient" ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium text-${statusColor(
                rqst.status
              )}-700 bg-${statusColor(rqst.status)}-100`}
            >
              {rqst.status}
            </span>
          ) : rqst.status === "pending" ? (
            <div className="flex gap-2">
              <Button variant="red" className="px-2 text-xs">
                Reject
              </Button>
              <Button
                variant="green"
                className="px-2 text-xs"
                onClick={() => approveRequest(rqst.id)}
              >
                Accept
              </Button>
            </div>
          ) : (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium text-${statusColor(
                rqst.status
              )}-700 bg-${statusColor(rqst.status)}-100`}
            >
              {rqst.status}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      {loading ? (
        <p className="text-center py-6 text-sm text-muted">Loading requests...</p>
      ) : error ? (
        <p className="text-center py-6 text-sm text-red-500">{error}</p>
      ) : connectionRequests.length === 0 ? (
        <p className="text-center py-6 text-sm text-muted">No connection requests found.</p>
      ) : (
        connectionRequests.map((rqst) => (
          <RequestItem key={rqst.id} rqst={rqst} />
        ))
      )}

      {totalPage > 1 && (
        <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPage} />
      )}
    </div>
  );
};

export default ChatRequestList;
