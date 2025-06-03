import { Request } from "express";
import { BadRequestError } from "@/errors";
import { GLOBAL_MESSAGES } from "@/constants";
import { IPagination, PaginationMeta } from "@/interfaces";


export const getPaginationParams = (req: Request): IPagination => {
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 10;

  if (isNaN(skip) || isNaN(limit) || skip < 0 || limit <= 0) {
    throw new BadRequestError(GLOBAL_MESSAGES.VALIDATION.INVALID_PAGINATION);
  }

  return { skip, limit };
};


export const buildPaginationMeta = (
  total: number,
  skip: number,
  limit: number
): PaginationMeta => {
  return {
    total,
    skip,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};