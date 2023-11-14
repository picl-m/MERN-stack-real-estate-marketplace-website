import { FormData } from "../index";
import styles from "./form.module.css";

interface ContactFormProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <>
      <h1 className={styles.formTitle}>Enter your contact information:</h1>
      <div className={styles.inputContainer}>
        <div className={styles.labelContainer}>
          <label htmlFor="fullName">Full name</label>
          <input className={styles.input} id="fullName" placeholder="Jméno Příjmení"
            value={props.formData.fullName}
            onChange={(e) => props.updateFormData({ fullName: e.target.value })}
          />
        </div>
        <div className={styles.labelContainer}>
          <label htmlFor="phone">Phone number</label>
          <input className={styles.input} id="phone"
            value={"+420 " + props.formData.phone}
            onChange={(e) => props.updateFormData({ phone: e.target.value.slice(5) })}
          />
        </div>
        <div className={styles.labelContainer}>
          <label htmlFor="email">Email</label>
          <input className={styles.input} id="email"
            value={props.formData.email}
            onChange={(e) => props.updateFormData({ email: e.target.value })}
          />
        </div>
      </div>
    </>
  );
}