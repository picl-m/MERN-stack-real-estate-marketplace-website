import { TextField, Typography } from "@mui/material";
import { FormData } from "../index";

interface ContactFormProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>Enter your contact information:</Typography>
      <TextField
        label="Full name"
        size="small"
        onChange={(e) => props.updateFormData({ fullName: e.target.value })}
        value={props.formData.fullName}
      />
      <TextField
        label="Phone"
        size="small"
        onChange={(e) => props.updateFormData({ phone: e.target.value })}
        value={props.formData.phone}
      />
      <TextField
        label="Email"
        size="small"
        onChange={(e) => props.updateFormData({ email: e.target.value })}
        value={props.formData.email}
      />
    </>
  );
}