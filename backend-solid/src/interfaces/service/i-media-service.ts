import { IDoctor } from "@/models";

export interface IMediaService {
  delete(publicIds: string[]): Promise<void>;
  extractPublicId(url: string): string;
}
