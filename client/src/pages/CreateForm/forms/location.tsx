import { Typography } from "@mui/material";
import LocationSelect from "../../../components/LocationSelect";
import { Estate } from "../../../types/estate";

interface LocationFormProps {
  formData: Partial<Estate>;
  updateFormData: (data: Partial<Estate>) => void;
}

export default function LocationForm(props: LocationFormProps) {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>Location of property:</Typography>
      
      <LocationSelect
        region={props.formData.region}
        district={props.formData.district}
        updateRegion={(value) => props.updateFormData({ region: value })}
        updateDistrict={([value]) => props.updateFormData({ district: value })}
      />
    </>
  );
}