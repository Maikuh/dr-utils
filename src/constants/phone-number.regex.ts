// Covers the three DR area codes: 809, 829, 849. US toll-free (800/888/877) are out of scope.
export const PHONE_NUMBER_VALID_REGEX = new RegExp(/^1?(8[024]9)(\d{3})(\d{4})$/, 'm')
export const PHONE_NUMBER_EXTRACT_REGEX = new RegExp(/\D+/, 'g')
