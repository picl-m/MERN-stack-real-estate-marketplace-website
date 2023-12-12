import { TextField, Typography } from "@mui/material";
import { Estate } from "../../../types/estate";

interface ContactFormProps {
    formData: Partial<Estate>;
    updateFormData: (data: Partial<Estate>) => void;
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <>
      <Typography variant="h4">Enter your contact information:</Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>(Contact information is publicly visible)</Typography>
      <TextField
        label="Full name"
        size="small"
        onChange={(e) => props.updateFormData({ full_name: e.target.value })}
        value={props.formData.full_name || ""}
      />
      <TextField
        label="Phone"
        size="small"
        onChange={(e) => props.updateFormData({ phone: e.target.value })}
        value={props.formData.phone || ""}
      />
      <TextField
        label="Email"
        size="small"
        onChange={(e) => props.updateFormData({ email: e.target.value })}
        value={props.formData.email || ""}
      />
    </>
  );
}