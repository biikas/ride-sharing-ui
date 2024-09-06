import { ValidationErrors } from '@angular/forms';

export const XPA_FORM_ERROR_MESSAGES = {
    required: (name: string) => `${name} is mandatory.`,
    min: (name: string, errors: ValidationErrors) => `${name} must be at least ${errors['min'].min}.`,
    max: (name: string, errors: ValidationErrors) => `${name} must be at most ${errors['max'].max}.`,
    minlength: (name: string, errors: ValidationErrors) => `${name} must be at least ${errors['minlength'].requiredLength} characters.`,
    maxlength: (name: string, errors: ValidationErrors) => `${name} must be at most ${errors['maxlength'].requiredLength} characters.`,
    pattern: (name: string) => `${name} must be valid.`,
    cannotContainSpaceOrEnter: (name: string) => `${name} cannot contain space/enter at start or end.`,
    notUnique: (name: string) => `${name} already exists`,
    startDateGreater: (name: string) => `End Date is before Start Date`,
    sameStartAndEndDate: (name: string) => `End Date and Start Date are same`,
};
