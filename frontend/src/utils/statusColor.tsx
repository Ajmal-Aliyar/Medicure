export function statusColor(status: string): string {
    switch (status.toLowerCase()) {
        case "scheduled":
            return "yellow";
        case "completed":
            return "green";
        case "accepted":
            return "green";
        case "success":
            return "green";
        case "approved":
            return "green";
        case "failed":
            return "red";
        case "cancelled":
            return "red";
        case "rejected":
            return "red";
        case "no show":
            return "orange";
        case "in progress":
            return 'blue'
        case "pending":
            return 'yellow'
        default:
            return "black";
    }
} 