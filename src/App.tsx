import { useState } from "react";
import "./App.css";
import { AppointmentDetails } from "./components/AppointmentDetails";
import { AppointmentList } from "./components/AppointmentList";
import { Chat } from "./components/Chat";
import { CONVERSATION_ID } from "./constants/constant";

function App() {
  const [apptId, setApptId] = useState<string | null>(null);

  return (
    <div className="container">
      <AppointmentList apptId={apptId} onSelect={setApptId} />
      <AppointmentDetails apptId={apptId} />
      <Chat conversationId={CONVERSATION_ID} />
    </div>
  );
}

export default App;
