import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Box, Button, CircularProgress, Container, MobileStepper, Paper, Typography } from "@mui/material";

import locations from "../../utils/locations.json";

import LocationForm from "./forms/location";
import ContactForm from "./forms/contact";
import PriceForm from "./forms/price";
import CategoryForm from "./forms/category";

import Layout from "../../components/Layout";

export interface FormData {
  deal?: string;
  type?: string;
  extras: string[];
  building_type?: string;
  price?: number;
  area?: number;
  floor?: number;
  full_name?: string;
  phone?: string;
  email?: string;
  region?: keyof typeof locations;
  district?: string;
}

interface CreateFormProps {
  estateType: "house"|"apartment"|"land";
}

export default function CreateForm(props: CreateFormProps) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    deal: "sale",
    extras: []
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({...formData, ...data});
  }

  const validateForm = (v: FormData) => {
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
    if(v.full_name && ! /^(.+){2,} (.+){2,}$/.test(v.full_name)) {
      isValid = false;
      error.push("Invalid name\n");
    }
    if(v.phone && ! /^\d{9}$/.test(v.phone)) {
      isValid = false;
      error.push("Invalid phone number\n");
    }
    if(v.email && ! /^(.+)@(.+){2,}\.(.+){2,}$/.test(v.email)) {
      isValid = false;
      error.push("Invalid email adress\n");
    }

    setErrorMessage(error);
    return (isValid);
  }

  const submitForm = async () => {
    setLoading(true);
    if (formData.phone) {
      let formattedData = {...formData, phone: formData.phone.replace(/\s/g, "")};
      console.log(formattedData);

      if (validateForm(formattedData)) {
        try {
          const res = await fetch(process.env.REACT_APP_SERVER_URL + "/create/" + props.estateType, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formattedData),
          });
          if (res.status === 201) {
            navigate("/");
          } else {
            const data = await res.json();
            console.log("Server error: " + data);
          }
        } catch (err) {
          let message = "Unknown error";
          if (err instanceof Error) message = err.message;
          console.log("Error sending form: " + message);
        }
      }
    }
    setLoading(false);
  }

  const steps = [
    <PriceForm formData={formData} updateFormData={updateFormData}/>,
    <LocationForm formData={formData} updateFormData={updateFormData}/>,
    <CategoryForm formData={formData} updateFormData={updateFormData} estateType={props.estateType}/>,
    <ContactForm formData={formData} updateFormData={updateFormData}/>
  ];

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
    <Layout>
      {(loading === false)?
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h3" paragraph>{"Create new " + props.estateType + " listing"}</Typography>
          <Paper sx={{ minHeight: "500px", display: "flex", flexDirection: "column", padding: 2 }}>
            <Box flexGrow={1} display="flex" flexDirection="column" gap={2}>
              {steps[currentStep]}
            </Box>
            {(errorMessage.length)?
              <Alert severity="error" onClose={() => setErrorMessage([])} sx={{ mt: 2 }}>
                <AlertTitle>Error</AlertTitle>
                <ul>
                  {errorMessage.map((message, i) => (
                    <Typography key={i} component="li">{message}</Typography>
                  ))}
                </ul>
              </Alert>
            :null}
            <MobileStepper
              sx={{ mt: 4, bgcolor: "transparent" }}
              position="static"
              steps={steps.length}
              activeStep={currentStep}
              nextButton={(currentStep < steps.length - 1)?
                  <Button variant="contained" onClick={nextStep} >Next</Button>
                :(currentStep === steps.length -1)?
                  <Button variant="contained" onClick={() => submitForm()}>Send</Button>
              :null}
              backButton={
                <Button disabled={currentStep === 0} onClick={previousStep}>Previous</Button>
              }
            />
          </Paper>
        </Container>
      :
        <Box flexGrow={10} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress/>
        </Box>
      }
    </Layout>
  );
}