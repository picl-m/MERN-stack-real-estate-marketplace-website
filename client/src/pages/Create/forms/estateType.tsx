import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FormData } from "../index";

interface EstateTypeProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function EstateTypeForm(props: EstateTypeProps) {
  const options = [
    {
      title: "Apartment",
      value: "apartment"
    },
    {
      title: "House",
      value: "house"
    },
    {
      title: "Land",
      value: "land"
    }
  ]

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>Type of property:</Typography>
      <ToggleButtonGroup
        value={props.formData.estateType}
        exclusive
        color="primary"
        onChange={(_, value) => props.updateFormData({ estateType: value })}
        orientation="vertical"
        fullWidth
      >
        {options.map(option => (
          <ToggleButton key={option.value} value={option.value}>{option.title}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}