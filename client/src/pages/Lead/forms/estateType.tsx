import { FormData } from "../index";
import styles from "./form.module.css";

interface EstateTypeProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function EstateTypeForm(props: EstateTypeProps) {
  const options = [
    {
      title: "Byt",
      value: "apartment"
    },
    {
      title: "Dům",
      value: "house"
    },
    {
      title: "Pozemek",
      value: "land"
    }
  ]

  return (
    <>
      <h1 className={styles.formTitle}>Vyberte typ nemovitosti:</h1>
      <div className={styles.optionButtonContainer}>
        {options.map(option => (
          <button
            className={
              (option.value === props.formData.estateType)
              ?styles.optionButtonSelected
              :styles.optionButton} 
            key={option.value}
            onClick={() => props.updateFormData({ estateType: option.value })}>
            {option.title}
          </button>
        ))}
      </div>
    </>
  );
}