import { TextField, Typography } from "@mui/material";
import { Estate } from "../../../types/estate";

interface DescriptionFormProps{
    formData: Partial<Estate>;
    updateFormData: (data: Partial<Estate>) => void;
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