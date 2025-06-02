import { HTTP_STATUS } from "@/constants/http-status";
import { BaseError } from "./base-error";
import { GLOBAL_MESSAGES } from "@/constants/";

export class BadRequestError extends BaseError {
  constructor(message = GLOBAL_MESSAGES.ERROR.BAD_REQUEST) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = GLOBAL_MESSAGES.ERROR.UNAUTHORIZED) {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = GLOBAL_MESSAGES.ERROR.FORBIDDEN) {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = GLOBAL_MESSAGES.ERROR.RESOURCE_NOT_FOUND) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

export class ConflictError extends BaseError {
  constructor(message = GLOBAL_MESSAGES.ERROR.CONFLICT_OCCURRED) {
    super(HTTP_STATUS.CONFLICT, message);
  }
}
export class InternalServerError extends BaseError {
  constructor(message = GLOBAL_MESSAGES.ERROR.INTERNAL_SERVER_ERROR) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}
