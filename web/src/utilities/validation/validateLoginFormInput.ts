const validateLoginFormInput = (formInputs: {
  identifier: string;
  password: string;
}): { validated: boolean; errors: { msg: string }[] } => {
  let errors: { msg: string }[] = [];
  /*   
  check if any input field is missing
  if any of the input fields is missing, return with errors.
  */
  if (formInputs.identifier.length === 0) {
    errors.push({ msg: "username or email is required." });
  }
  if (formInputs.password.length === 0) {
    errors.push({ msg: "password is required." });
  }
  if (errors.length > 0) {
    return { validated: false, errors };
  }
  //   validate identifier
  if (formInputs.identifier.includes("@")) {
    // validation for email
    if (formInputs.identifier.length < 3 || formInputs.identifier.length > 320) {
      errors.push({ msg: "email must be 3 to 320 characters long" });
    } else {
      if (!/\S+@\S+\.\S+/.test(formInputs.identifier)) {
        errors.push({ msg: "invalid email address" });
      }
    }
  } else {
    // validation for username
    if (formInputs.identifier.length < 1 || formInputs.identifier.length > 30) {
      errors.push({ msg: "username must be 1 to 30 characters long" });
    } else {
      if (!/^[A-Za-z0-9]*$/.test(formInputs.identifier)) {
        errors.push({ msg: "username can only contains letters and numbers" });
      }
    }
  }

  //   validate password
  if (formInputs.password.length < 6 || formInputs.password.length > 40) {
    errors.push({ msg: "password must be at least 6 characters long ( upto 40 characters)" });
  } else {
    if (!/[A-Z]/.test(formInputs.password)) {
      errors.push({ msg: "password must contain at least one uppercase character" });
    }
    if (!/[a-z]/.test(formInputs.password)) {
      errors.push({ msg: "password must contain at least one lowercase character" });
    }
    if (!/\d/.test(formInputs.password)) {
      errors.push({ msg: "password must contain at least one numberic character" });
    }
    if (!/\W/.test(formInputs.password)) {
      errors.push({ msg: "password must contain at least one non alphanumeric character" });
    }
  }
  if (errors.length > 0) {
    return { validated: false, errors };
  }
  //   no errors
  return { validated: true, errors: [] };
};

export default validateLoginFormInput;
