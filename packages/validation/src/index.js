import { validateEmail } from './validators/emailValidator';
import { validateLength } from './validators/lengthValidator';
import { validatePassword } from './validators/passwordValidator';
import { validateRequired } from './validators/requiredValidator';

const validators = {
    email: validateEmail,
    length: validateLength,
    password: validatePassword,
    required: validateRequired,
};

export { validators, validateEmail, validateLength, validatePassword, validateRequired };
