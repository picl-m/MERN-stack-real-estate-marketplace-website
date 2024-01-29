import { Estate, EstateType } from "types/estate";

export async function getRecent() {
  try {
    const res = await fetch(process.env.REACT_APP_SERVER_URL + "/search", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      console.log("Server error: " + data);
    }
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    console.log("Error getting search results: " + message);
  }
}

export async function getResults(
  params: Estate,
  estateType: EstateType,
  page: number,
  limit: number,
) {
  try {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/search/" + estateType,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filter: params,
          page: page,
          limit: limit,
        }),
      },
    );
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      console.log("Server error: " + data);
    }
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    console.log("Error getting search results: " + message);
  }
}

export async function getListing(id: string) {
  try {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/search/listing",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      },
    );
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      console.log("Server error: " + data);
    }
  } catch (err) {
    let message = "Unknown error";
    if (err instanceof Error) message = err.message;
    console.log("Error getting listing: " + message);
  }
}
