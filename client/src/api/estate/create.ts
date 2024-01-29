import { Estate, EstateType } from "types/estate";

export async function createEstate(data: Estate, estateType: EstateType) {
  try {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/create/" + estateType,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (res.status === 201) {
      return true;
    } else {
      const data = await res.json();
      console.log("Server error: " + data);
    }
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    console.log("Error sending form: " + message);
  }
}
