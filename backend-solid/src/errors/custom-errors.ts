import { HTTP_STATUS } from "@/constants/http-status";
import { BaseError } from "./base-error";
import { ERROR_MESSAGES } from "@/constants/messages";

export class BadRequestError extends BaseError {
  constructor(message = ERROR_MESSAGES.BAD_REQUEST) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = ERROR_MESSAGES.FORBIDDEN) {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = ERROR_MESSAGES.RESOURCE_NOT_FOUND) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

export class ConflictError extends BaseError {
  constructor(message = ERROR_MESSAGES.CONFLICT_OCCURRED) {
    super(HTTP_STATUS.CONFLICT, message);
  }
}
