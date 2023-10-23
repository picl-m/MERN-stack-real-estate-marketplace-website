import { FormData } from "../index";
import styles from "./form.module.css";

import locations from "./locations.json";

interface LocationFormProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function LocationForm(props: LocationFormProps) {
  return (
    <>
      <h1 className={styles.formTitle}>Kde se nemovitost nachází:</h1>
      <div className={styles.inputContainer}>
        <div className={styles.labelContainer}>
          <label>Kraj:</label>
          <select onChange={(e) => props.updateFormData({ region: e.target.value, district: "" })}
            value={props.formData.region} className={styles.select} 
          >
            <option value="">Vyberte kraj:</option>
            {Object.keys(locations).map((region) =>
              <option key={region} value={region}>{region}</option>
            )}
          </select>
        </div>

        {(props.formData.region)?
          <div className={styles.labelContainer}>
            <label>Okres:</label>
            <div className={styles.radioContainer}>
              {locations[props.formData.region as keyof typeof locations].map((district) => (
                <div className={styles.labelContainer} key={district}>
                  <label key={district}>
                    <input type="radio" name="district" value={district}
                      onClick={(e) => props.updateFormData({ district: district })}
                      defaultChecked={district === props.formData.district}
                    />
                  {district}</label>
                </div>
              ))}
            </div>
          </div>
        :null}
      </div>
    </>
  );
}