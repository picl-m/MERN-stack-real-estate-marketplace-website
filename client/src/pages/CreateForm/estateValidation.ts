import { Estate, EstateType } from "types/estate";

export const validateEstate = (
  v: Partial<Estate>,
  estateType: EstateType,
): [boolean, string[]] => {
  let isValid = true;
  let errorMessages = [];

  if (!v.region) {
    isValid = false;
    errorMessages.push("Missing region\n");
  }
  if (!v.district) {
    isValid = false;
    errorMessages.push("Missing district\n");
  }
  if (!v.full_name || !/^(.+){2,} (.+){2,}$/.test(v.full_name)) {
    isValid = false;
    errorMessages.push("Invalid name\n");
  }
  if (!v.phone || !/^\d{9}$/.test(v.phone)) {
    isValid = false;
    errorMessages.push("Invalid phone number\n");
  }
  if (!v.email || !/^(.+)@(.+){2,}\.(.+){2,}$/.test(v.email)) {
    isValid = false;
    errorMessages.push("Invalid email adress\n");
  }
  if (!v.area || v.area < 0) {
    isValid = false;
    errorMessages.push("Invalid estate area\n");
  }
  if (!v.price || v.price < 0) {
    isValid = false;
    errorMessages.push("Invalid estate price\n");
  }
  if (!v.type) {
    isValid = false;
    errorMessages.push("Missing type of estate\n");
  }
  if (!v.description) {
    isValid = false;
    errorMessages.push("Missing description\n");
  }

  if (estateType === "apartments") {
    if (!v.building_type) {
      isValid = false;
      errorMessages.push("Missing building type\n");
    }
    if (!v.floor || v.floor < 0) {
      isValid = false;
      errorMessages.push("Invalid floor\n");
    }
  }

  return [isValid, errorMessages];
};
