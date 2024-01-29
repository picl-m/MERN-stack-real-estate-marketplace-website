import React from "react";
import { Container } from "@mui/material";

import NumberRange from "components/NumberRange";
import LocationSelect from "components/LocationSelect";
import MultiCheckbox from "components/MultiCheckbox";

import { SearchParams, landTypes } from "types/estate";

interface SearchFormProps {
  searchParams: SearchParams;
  updateSearchParams: (data: Partial<SearchParams>) => void;
}

export default function LandForm(props: SearchFormProps) {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <MultiCheckbox
        title="Type"
        options={landTypes}
        selected={props.searchParams.type}
        update={(value: string[]) => props.updateSearchParams({ type: value })}
      />
      <NumberRange
        title="Price"
        minValue={props.searchParams.min_price}
        maxValue={props.searchParams.max_price}
        minUpdate={(value: number) =>
          props.updateSearchParams({ min_price: value })
        }
        maxUpdate={(value: number) =>
          props.updateSearchParams({ max_price: value })
        }
      />
      <NumberRange
        title="Area"
        minValue={props.searchParams.min_area}
        maxValue={props.searchParams.max_area}
        minUpdate={(value: number) =>
          props.updateSearchParams({ min_area: value })
        }
        maxUpdate={(value: number) =>
          props.updateSearchParams({ max_area: value })
        }
      />
      <LocationSelect
        label
        checkbox
        region={props.searchParams.region}
        district={props.searchParams.districts}
        updateRegion={(region) =>
          props.updateSearchParams({ region: region, districts: [] })
        }
        updateDistrict={(districts) =>
          props.updateSearchParams({ districts: districts })
        }
      />
    </Container>
  );
}
