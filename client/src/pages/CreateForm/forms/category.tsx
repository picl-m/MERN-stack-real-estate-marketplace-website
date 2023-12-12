import { TextField, Typography } from "@mui/material";
import MultiCheckbox from "../../../components/MultiCheckbox";
import MultiRadio from "../../../components/MultiRadio";
import { Estate, EstateType } from "../../../types/estate";

interface CategoryFormProps {
    formData: Partial<Estate>;
    updateFormData: (data: Partial<Estate>) => void;
    estateType: EstateType;
}

export default function CategoryForm(props: CategoryFormProps) {
  return (
    <>
        <Typography variant="h4" sx={{ mb: 2 }}>Pick categories:</Typography>
        
        <TextField
          label="Area in m2"
          value={props.formData.area || ""}
          onChange={(e) => {
              let value: string = e.target.value;
              value = value.replace(/\D/g, "");
              props.updateFormData({ area: Number(value) });
          }}
        />
        {props.estateType==="houses"?
            <>
                <MultiRadio
                    title="Type"
                    options={["1 room", "2 rooms", "3 rooms", "4 rooms", "5 rooms and more"]}
                    selected={props.formData.type}
                    update={(value) => props.updateFormData({ type: value })}
                />
                <MultiCheckbox
                    title="Extras"
                    options={["balcony", "parking", "garden", "basement", "garage", "wooden", "furnished"]}
                    selected={props.formData.extras || []}
                    update={(value) => props.updateFormData({ extras: value })}
                />
            </>
        :props.estateType==="apartments"?
            <>
                <TextField
                    label="Floor"
                    value={props.formData.floor || ""}
                    onChange={(e) => {
                        let value: string = e.target.value;
                        value = value.replace(/\D/g, "");
                        props.updateFormData({ floor: Number(value) });
                    }}
                />
                <MultiRadio
                    title="Type"
                    options={["1+kt", "1+1", "2+kt", "2+1", "3+kk", "3+1", "4+kk", "4+1", "5 and more"]}
                    selected={props.formData.type}
                    update={(value) => props.updateFormData({ type: value })}
                />
                <MultiCheckbox
                    title="Extras"
                    options={["balcony", "parking", "garage", "lift", "furnished"]}
                    selected={props.formData.extras || []}
                    update={(value) => props.updateFormData({ extras: value })}
                />
                <MultiRadio
                    title="Building type"
                    options={["brick", "panel", "steel"]}
                    selected={props.formData.building_type}
                    update={(value) => props.updateFormData({ building_type: value })}
                />
            </>
        :props.estateType==="land"?
            <MultiRadio
                title="Type"
                options={["housing", "commercial", "field", "forest", "pond", "garden"]}
                selected={props.formData.type}
                update={(value) => props.updateFormData({ type: value })}
            />
        :null}
    </>
  );
}