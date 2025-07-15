import { Request } from "express";
import { BadRequestError } from "@/errors";
import { GLOBAL_MESSAGES } from "@/constants";
import { IPagination, PaginationMeta } from "@/interfaces";

const DEFAULT_PAGE = 12;
export const getPaginationParams = (req: Request): IPagination => {
  const page = Number(req.query.page) || 1
  const skip = (page - 1) * DEFAULT_PAGE
  const limit = DEFAULT_PAGE

  if (isNaN(page) || page <= 0 ) {
    throw new BadRequestError(GLOBAL_MESSAGES.VALIDATION.INVALID_PAGINATION);
  }

  return { skip, limit };
};


export const buildPaginationMeta = (
  total: number,
  skip: number
): PaginationMeta => {
  return {
    page: (skip+DEFAULT_PAGE)/DEFAULT_PAGE,
    totalPages: Math.ceil(total / DEFAULT_PAGE),
  };
};