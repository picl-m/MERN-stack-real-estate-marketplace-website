import { useEffect, useState } from "react";
import { FormData } from "../Lead/index";

export default function LeadList() {
    const [leads, setLeads] = useState<Array<FormData>>();

    async function getLeads() {
        try {
            const res = await fetch("https://express-form-server.vercel.app/leads", {
             method: "GET",
             headers: { "Content-Type": "application/json"},
            });
            const data = await res.json();
            if(res.status === 200) {
                setLeads(data);
            } else {
                console.log("Server error: " + data);
            }
        } catch (err) {
            console.log("Error getting leads:" + err);
        }
    }

    useEffect(() => {
        getLeads();
    }, [])

    return(
        <div>
            {(leads)?leads.map((lead, id) => (
                <div key={id}>
                    <div>
                        {Object.keys(lead).map((information, id) => (
                            <div key={id}>
                                {(information !== "__v" && information !== "_id")?
                                    <p>
                                        <b>{information}: </b>
                                        {lead[information as keyof FormData]}
                                    </p>
                                :<></>}
                            </div>
                        ))}
                    </div>
                    <br/>
                </div>
            )):null}
        </div>
    )
}