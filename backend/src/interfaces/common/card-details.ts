import { BloodGroup } from "./IBloodGroup";
import { IGender } from "./IGender";

export interface CardDetails {
  id: string;
  fullName: string;
  gender: IGender | null;
  profileImage: string | null;
}



