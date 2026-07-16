import { HttpErrorResponse } from '@angular/common/http';

/**
 * Turns a failed HttpClient response into a short, user-facing message,
 * covering: the backend being unreachable, field-level validation errors
 * (from the backend's 400 responses), and any other error body with a
 * "message" field, falling back to a generic message otherwise.
 */
export function getErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Unable to reach the server. Please check that the backend is running.';
  }

  if (error.status === 400 && error.error && typeof error.error === 'object') {
    const fieldErrors = Object.values(error.error).filter(value => typeof value === 'string');
    if (fieldErrors.length > 0) {
      return fieldErrors.join(' ');
    }
  }

  if (error.error?.message) {
    return error.error.message;
  }

  return 'Something went wrong. Please try again.';
}
