function ValidationResult(type, prop, message) {
    return { type, prop, message };
}

export function notEmpty(value, label, name) {
    const type = 'notEmpty';
    if (!value || value.length === 0) {
        return ValidationResult(type, name, `Must enter a ${label}`);
    }
    return ValidationResult(type, name, null);
}

export function isMatch(value1, value2, label, name) {
    const type = 'passwordMatch';
    if (value1 != value2) {
        return ValidationResult(type, name, `${label} doesnt match`);
    }
    return ValidationResult(type, name, null);
}