import { TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FormData } from "../index";

interface PriceFormProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function PriceForm(props: PriceFormProps) {
  return (
    <>
        <Typography variant="h4" sx={{ mb: 2 }}>Enter the price:</Typography>
        <TextField
          label={props.formData.deal==="rent"?"Price per month in CZK":"Price in CZK"}
          value={props.formData.price || ""}
          onChange={(e) => {
              let value: string = e.target.value;
              value = value.replace(/\D/g, "");
              props.updateFormData({ price: Number(value) });
          }}
        />
        <ToggleButtonGroup
          exclusive
          color="primary"
          value={props.formData.deal}
          onChange={(_, value) => props.updateFormData({ deal: value })}
        >
            <ToggleButton value="sale">Sale</ToggleButton>
            <ToggleButton value="rent">Rent</ToggleButton>
        </ToggleButtonGroup>
    </>
  );
}