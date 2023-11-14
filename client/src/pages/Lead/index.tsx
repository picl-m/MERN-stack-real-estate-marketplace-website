import { useState } from "react";
import styles from "./index.module.css";

import EstateTypeForm from "./forms/estateType";
import LocationForm from "./forms/location";
import ContactForm from "./forms/contact";
import { useNavigate } from "react-router-dom";

export interface FormData {
  estateType: string;
  fullName: string;
  phone: string;
  email: string;
  region: string;
  district: string;
}

export default function Lead() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    estateType: "",
    fullName: "",
    phone: "",
    email: "",
    region: "",
    district: "",
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({...formData, ...data});
  }

  const validateForm = (v: FormData) => {
    let isValid = true;
    let error = "";
    
    if(! v.estateType) {
      isValid = false;
      error = error + "Choose the type of property\n";
    }
    if(! v.region) {
      isValid = false;
      error = error + "Choose a region\n";
    }
    if(! v.district) {
      isValid = false;
      error = error + "Choose a district\n";
    }
    if(! /^(.+){2,} (.+){2,}$/.test(v.fullName)) {
      isValid = false;
      error = error + "Invalid name\n";
    }
    if(! /^\d{9}$/.test(v.phone)) {
      isValid = false;
      error = error + "Invalid phone number\n";
    }
    if(! /^(.+)@(.+){2,}\.(.+){2,}$/.test(v.email)) {
      isValid = false;
      error = error + "Invalid email adress\n";
    }

    setErrorMessage(error);
    return (isValid);
  }

  const submitForm = async () => {
    setLoading(true);
    let formattedData = {...formData, phone: formData.phone.replace(/\s/g, "")};

    if (validateForm(formattedData)) {
      try {
        const res = await fetch("https://express-form-server.vercel.app/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formattedData),
        });
        if (res.status === 201) {
          navigate("/seznam");
        } else {
          const data = res.json();
          console.log("Server error: " + data);
        }
      } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        console.log("Error sending form: " + message);
      }
    }

    setLoading(false);
  }

  const steps = [
    <EstateTypeForm formData={formData} updateFormData={updateFormData} />, 
    <LocationForm formData={formData} updateFormData={updateFormData} />, 
    <ContactForm formData={formData} updateFormData={updateFormData} />
  ]

  const nextStep = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(steps.length - 1)
    } else {
      setCurrentStep(currentStep + 1);
    }
  }

  const previousStep = () => {
    if (currentStep <= 0) {
      setCurrentStep(0)
    } else {
      setCurrentStep(currentStep - 1);
    }
  }

  return (
    <div className={styles.wrapper}>
      {(loading === false)?
        <div className={styles.formContainer}>
          {steps[currentStep]}
          <div>
            { (errorMessage) ? <p className={styles.errorMessage}>{errorMessage}</p> : null }
            <div className={styles.buttonContainer}>
              {(currentStep < steps.length - 1)?
                <button className={styles.continueButton} onClick={nextStep} >Next</button>
              :(currentStep === steps.length -1)?
                <button className={styles.continueButton} onClick={() => submitForm()}>Send</button>
              :null}

              {(currentStep > 0)?
                <button className={styles.returnButton} onClick={previousStep} >Previous</button>
              :null}
            </div>
          </div>
        </div>
      :null}
    </div>
  );
}