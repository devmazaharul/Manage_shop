export const registerValidation = (arg) => {
  const result = {
    error: [],
  };
  for (let field in arg) {
    if (arg[field] == "") {
      result.error.push({
        field,
        message: `${field} is required`,
      });
    }
    if (field == "email" && !arg[field].includes("@")) {
      result.error.push({
        field,
        message: `${field} is invalid`,
      });
    }
    if (field == "password" && arg[field].length < 6) {
      result.error.push({
        field,
        message: `${field} must be atleast 6 characters`,
      });
    }
    if (field == "phone" && arg[field].length < 10) {
      result.error.push({
        field,
        message: `${field} must be atleast 10 characters`,
      });
    }
    if (field == "name" && arg[field].length < 3) {
      result.error.push({
        field,
        message: `${field} must be atleast 3 characters`,
      });
    }
    if (field == "address" && arg[field].length < 3) {
      result.error.push({
        field,
        message: `${field} must be atleast 3 characters`,
      });
    }
  }

  return result;
};


export const loginValidation = (arg) => { 
    const result = {
        error: [],
    };
    for (let field in arg) {
        if (arg[field] == "") {
        result.error.push({
            field,
            message: `${field} is required`,
        });
        }
        if (field == "email" && !arg[field].includes("@")) {
        result.error.push({
            field,
            message: `${field} is invalid`,
        });
        }
     
    }
    
    return result;
} 