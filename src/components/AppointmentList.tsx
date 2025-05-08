import React from "react";
import { useAppointmentsQuery } from "../graphql/generated/types";
import "../styles/AppointmentList.css";

interface Props {
  apptId: string | null;
  onSelect: (id: string) => void;
}

export const AppointmentList: React.FC<Props> = ({ apptId, onSelect }) => {
  const { data, isLoading, isError } = useAppointmentsQuery(
    {
      endpoint: "/api/graphql",
      fetchParams: { headers: { "Content-Type": "application/json" } },
    },
    {
      should_paginate: false,
      offset: 0,
      is_active: true,
    }
  );

  const appointments = data?.appointments ?? [];
  const count = data?.appointmentsCount ?? 0;

  return (
    <aside className="sidebar">
      <h2>Appointments</h2>
      <p className="count">{count} appointments</p>
      {isLoading && <p>Loading appointments...</p>}
      {isError && <p className="error">Failed to load appointments</p>}
      <ul>
        {appointments.length === 0 ? (
          <li className="no-appointments">No appointments available</li>
        ) : (
          appointments.map((appt) => (
            <li
              key={appt.id}
              className={appt.id === apptId ? "active" : ""}
              onClick={() => onSelect(appt.id!)}
            >
              <div className="appt-date">
                {new Date(appt.date!).toLocaleString()}
              </div>
              <div className="appt-provider">{appt.provider?.full_name}</div>
              <div className="appt-type">{appt.appointment_type?.name}</div>
              <div className="appt-attendee">
                {appt.attendees?.[0]?.full_name}
              </div>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
};
