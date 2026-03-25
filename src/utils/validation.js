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

export function validateUserParam(params) {
  if (!params || !params.id) {
    return { valid: false, error: "User ID parameter is required." };
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id) || id <= 0) {
    return { valid: false, error: "User ID must be a positive integer." };
  }
  return { valid: true, id };
}

export function validateUserUpdateInput(input) {
  if (!input || Object.keys(input).length === 0) {
    return { valid: false, error: "Request body is required." };
  }

  const { name, email, phone_number, company_name } = input;

  if (!name && !email && !phone_number && !company_name) {
    return {
      valid: false,
      error:
        "At least one of name, email, phone_number, or company_name fields is required.",
    };
  }

  // Additional validation logic can be added here (e.g., email format, phone number format)
  return { valid: true };
}
