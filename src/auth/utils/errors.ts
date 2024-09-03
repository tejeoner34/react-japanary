import { AuthServiceErrorModel } from '../models/errors.model';

class AuthServiceError {
  private readonly errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Email already in use',
  };

  private readonly defaultErrorMessage = 'An error occurred';

  getErrorMessage(error: AuthServiceErrorModel): string {
    return this.errorMessages[error.code] || this.defaultErrorMessage;
  }
}

export default new AuthServiceError();
