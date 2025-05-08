import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CONVERSATION_ID, DOB } from "../constants/constant";
import {
  useAppointmentQuery,
  useCreateNoteMutation,
} from "../graphql/generated/types";
import "../styles/AppointmentDetails.css";

export interface EligibilityResult {
  policyId: string;
  eligible: string;
}

interface Props {
  apptId: string | null;
}

export const AppointmentDetails: React.FC<Props> = ({ apptId }) => {
  const queryClient = useQueryClient();

  const [eligibility, setEligibility] = useState<EligibilityResult[]>([]);
  const [error, setError] = useState<string>("");

  const { data, isLoading, isError } = useAppointmentQuery(
    {
      endpoint: "/api/graphql",
      fetchParams: { headers: { "Content-Type": "application/json" } },
    },
    { id: apptId! },
    { enabled: Boolean(apptId) }
  );

  const appt = data?.appointment ?? null;
  const policies = appt?.user?.policies ?? [];

  const {
    mutate: sendNotice,
    isError: sendError,
    data: sendData,
    reset: resetSend,
  } = useCreateNoteMutation(
    {
      endpoint: "/api/graphql",
      fetchParams: { headers: { "Content-Type": "application/json" } },
    },
    {
      onSuccess: () => {
        // invalidate the Conversation query so Chat will re-fetch
        queryClient.invalidateQueries({
          queryKey: ["Conversation", { id: CONVERSATION_ID }],
        });
      },
      onError: (err: Error) => {
        console.log("Error sending a message", err);
        alert(`Failed: ${err.message}`);
      },
    }
  );

  const handleSendNotice = () => {
    if (!appt || !appt.user || !eligibility.length || !policies) {
      setError("Nothing to send");
      return;
    }

    const lines = [
      `Appointment ID: ${appt.id}`,
      `User: ${appt.user.full_name}`,
      `DOB: ${appt.user.dob || DOB}`,
      "",
      ...policies.flatMap((policy) => {
        const result =
          eligibility.find((e) => e.policyId === policy.id)?.eligible ?? "-";
        return [
          `Policy ID: ${policy.id}`,
          `Member ID: ${policy.num}`,
          `Payer ID: ${policy.insurance_plan?.payer_id || ""}`,
          `Payer Name: ${policy.insurance_plan?.payer_name || ""}`,
          `Eligibility result: ${result}`,
          "",
        ];
      }),
    ];

    sendNotice({
      content: lines.join("\n"),
      conversation_id: CONVERSATION_ID,
    });
  };

  // run eligibility checks when policies load
  useEffect(() => {
    if (!policies.length) return;
    setError("");
    (async () => {
      try {
        const results = await Promise.all(
          policies.map(async (p) => {
            const resp = await axios.post("/api/eligibility", {
              payer_id: p.insurance_plan?.payer_id,
              member_id: p.num,
              date_of_birth: appt!.user!.dob || DOB,
            });
            return {
              policyId: p.id,
              eligible: resp.data.eligible ? "Yes" : "No",
            };
          })
        );
        setEligibility(results);
      } catch {
        setError("Failed eligibility check");
      }
    })();
  }, [policies, appt]);

  useEffect(() => {
    resetSend();
  }, [apptId, resetSend]);

  if (isLoading) return <div className="center">Loading details...</div>;
  if (isError)
    return <div className="center error">Failed to load details</div>;
  if (!appt)
    return <div className="center">Select an appointment to view details</div>;

  return (
    <main className="details">
      <div className="detail-card">
        <h2>Appointment Details</h2>
        <p>
          <strong>ID:</strong> {appt.id}
        </p>
        <p>
          <strong>Date:</strong> {new Date(appt.date).toLocaleString()}
        </p>
        <p>
          <strong>Provider:</strong> {appt.provider.full_name}
        </p>
        <p>
          <strong>Contact:</strong> {appt.contact_type}
        </p>
        <p>
          <strong>Type:</strong> {appt.appointment_type?.name}
        </p>

        {appt.user && (
          <div className="user-section">
            <h3>User & Eligibility</h3>
            <p>
              <strong>Name:</strong> {appt.user.full_name}
            </p>
            <p>
              <strong>DOB:</strong> {appt.user.dob || DOB}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Policy ID</th>
                  <th>Member ID</th>
                  <th>Payer ID</th>
                  <th>Payer Name</th>
                  <th>Eligible</th>
                </tr>
              </thead>
              <tbody>
                {policies.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="no-policies">
                      No policy available
                    </td>
                  </tr>
                ) : (
                  policies.map((p) => {
                    const r = eligibility.find((e) => e.policyId === p.id);
                    return (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.num}</td>
                        <td>{p.insurance_plan?.payer_id}</td>
                        <td>{p.insurance_plan?.payer_name}</td>
                        <td>{r?.eligible ?? "-"}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            {error && <p className="error">{error}</p>}
          </div>
        )}

        <div>
          <button onClick={handleSendNotice}>Send</button>
          {sendError && <p className="error">Failed to send notice</p>}
          {sendData && <p className="success">Notice sent!</p>}
        </div>
      </div>
    </main>
  );
};
