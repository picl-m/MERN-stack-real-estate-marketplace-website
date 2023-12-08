import { TextField, Typography } from "@mui/material";
import { FormData } from "../index";

interface DescriptionFormProps{
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function DescriptionForm(props: DescriptionFormProps) {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>Add a description:</Typography>
      <TextField
        multiline
        label="Description"
        onChange={(e) => props.updateFormData({ description: e.target.value })}
        value={props.formData.description || ""}
      />
    </>
  );
}