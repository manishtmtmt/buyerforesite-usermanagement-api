export function validateUserInput(input) {
  if (!input || Object.keys(input).length === 0) {
    return { valid: false, error: "Request body is required." };
  }

  const { name, email, phone_number, company_name } = input;

  if (!name || !email || !phone_number || !company_name) {
    return {
      valid: false,
      error: "name, email, phone_number, and company_name fields are required.",
    };
  }
  // Additional validation logic can be added here (e.g., email format, phone number format)
  return { valid: true };
}
