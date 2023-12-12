import { Estate, EstateType } from "../types/estate";

export const validateEstate = (v: Partial<Estate>, estateType: EstateType): [boolean, string[]] => {
    let isValid = true;
    let error = [];
    
    if(! v.region) {
      isValid = false;
      error.push("Choose a region\n");
    }
    if(! v.district) {
      isValid = false;
      error.push("Choose a district\n");
    }
    if(! v.full_name || ! /^(.+){2,} (.+){2,}$/.test(v.full_name)) {
      isValid = false;
      error.push("Invalid name\n");
    }
    if(! v.phone || ! /^\d{9}$/.test(v.phone)) {
      isValid = false;
      error.push("Invalid phone number\n");
    }
    if(! v.email || ! /^(.+)@(.+){2,}\.(.+){2,}$/.test(v.email)) {
      isValid = false;
      error.push("Invalid email adress\n");
    }
    if(! v.area || v.area < 0) {
      isValid = false;
      error.push("Invalid estate area\n");
    }
    if(! v.price || v.price < 0) {
      isValid = false;
      error.push("Invalid estate price\n");
    }
    if(! v.type) {
      isValid = false;
      error.push("Choose type of estate\n");
    }
    if(! v.description) {
      isValid = false;
      error.push("Add a description\n");
    }

    if(estateType === "apartments") {
      if(! v.building_type) {
        isValid = false;
        error.push("Choose a building type\n");
      }
      if(! v.floor || v.floor < 0) {
        isValid = false;
        error.push("Invalid floor\n");
      }
    }

    return [isValid, error];
  }