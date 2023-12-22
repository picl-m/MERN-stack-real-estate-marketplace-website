import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Box, Button, CircularProgress, Container, MobileStepper, Paper, Typography } from "@mui/material";

import LocationForm from "./forms/location";
import ContactForm from "./forms/contact";
import PriceForm from "./forms/price";
import CategoryForm from "./forms/category";
import DescriptionForm from "./forms/description";

import Layout from "components/Layout";
import { createEstate } from "api/estate/create";
import { Estate, EstateType } from "types/estate";

import { validateEstate } from "./estateValidation";

interface CreateFormProps {
  estateType: EstateType;
}

export default function CreateForm(props: CreateFormProps) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Estate>>({
    deal: "sale",
    extras: []
  });

  const updateFormData = (data: Partial<Estate>) => {
    setFormData({...formData, ...data});
  }

  const submitForm = () => {
    setLoading(true);

    let formattedData: Partial<Estate> = {...formData};
    if (formData.phone)
      formattedData.phone = formData.phone.replace(/\s/g, "");

    const [valid, error] = validateEstate(formattedData, props.estateType)

    if (valid) {
      createEstate(formattedData as Estate, props.estateType).then(success => {
        if (success) {
          navigate("/");
        }
      })
    } else {
      setErrorMessage(error);
    }
    
    setLoading(false);
  }

  const steps = [
    <PriceForm formData={formData} updateFormData={updateFormData}/>,
    <LocationForm formData={formData} updateFormData={updateFormData}/>,
    <CategoryForm formData={formData} updateFormData={updateFormData} estateType={props.estateType}/>,
    <DescriptionForm formData={formData} updateFormData={updateFormData}/>,
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
                  <Button variant="contained" onClick={() => submitForm()}>Create</Button>
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