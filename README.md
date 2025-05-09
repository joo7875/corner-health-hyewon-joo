# Insurance Eligibility Check App

A React-based application to check and display insurance eligibility results for patient appointments.  
It integrates with a Healthie GraphQL API and supports sending eligibility results into a conversation chat.

## Running the App

Follow these steps to install dependencies, generate GraphQL types, and start the React app.

1. Install dependencies

```bash
yarn install
```

2. Run GraphQL codegen

```bash
yarn codegen
```

3. Run a backend server

```bash
node server.js
```

4. Start the app

```bash
yarn start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## File Structure

```
src/
├── components/
│   ├── AppointmentDetails.tsx
│   ├── AppointmentList.tsx
│   └── Chat.tsx
├── constants/
│   └── constant.ts
├── graphql/
│   ├── generated/
│   │   └── types/
│   │       └── index.ts
│   ├── mutations/
│   │   └── createNote.graphql
│   ├── queries/
│   │   ├── appointment.graphql
│   │   ├── appointments.graphql
│   │   ├── conversation.graphql
│   │   └── conversationMemberships.graphql (not used)
│   └── schema.graphql
├── styles/
│   ├── AppointmentDetails.css
│   ├── AppointmentList.css
│   └── Chat.css
├── App.css
├── App.tsx
├── AppProvider.tsx
├── index.css
├── index.tsx
.env.local
codegen.yml
package.json
README.md
server.ts
```

---

## 1. System Design

Automate insurance eligibility checks and surface the results to staff, providers, and (optionally) patients.

1. **Trigger events**

   - New appointment scheduled or rescheduled.
   - Patient insurance data created or updated.

2. **Processing**

   - A small service enqueues each eligibility request.
   - Worker processes call the eligibility API.
   - Normalized eligibility response are stored on the appointment or policy record.

3. **Surfacing the result**

   - **Providers / staff:** shown in the appointment schedules and the appointment details panel.
   - **Patients (optional):** displayed in a patient portal or sent by email/SMS.

4. **Reliability**

   - Retry API calls up to 3 times with exponential back-off.
   - On final failure flag the appointment for manual follow-up by staff.
   - Emit metrics and alerts for error rate and latency (e.g. Datadog, Sentry).

5. **Scaling**
   - The queue (e.g. Redis, SQS) smooths spikes and respects vendor rate limits.
   - Use batch endpoints if the vendor supports them.

## 2. Third-Party Insurance Eligibility APIs

| Vendor                            | Approximate Cost                                               | Considerations                                                                              | Ideal For                                                                                                                                                         |     |
| --------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| [Eligible](https://eligible.com/) | \~\$0.25 per check (volume discounts available)                | Some payers may require clearinghouse onboarding; limited sandbox data for testing.         | Organizations seeking a straightforward solution focused solely on eligibility verification.                                                                      |     |
| [pVerify](https://pverify.com/)   | Plans start at \~\$99/month; advanced tiers from \~\$250/month | Pricing and payer coverage vary by plan tier; requires sales contact for high-volume needs. | Organizations looking for a comprehensive solution that includes eligibility verification along with advanced features like cost estimation and batch processing. |

## 3. Operational Risks and Mitigation

| Risk                                   | Mitigation                                                                                               |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Missing / invalid insurance data       | Validate payer ID, member ID, DOB at entry; block save if incomplete                                     |
| Appointment reschedules                | Run an eligibility check immediately after the reschedule                                                |
| API downtime / rate limits             | Retry with back-off, display the most recent eligibility result with its timestamp, show “pending” badge |
| Certain payers refuse automated checks | Route to manual verification                                                                             |

## 4. Product Scoping - Next Steps

1. **Payment estimates**: Display copay/deductible next to eligibility and let staff send an estimate link to the patient.
2. **Appointment push notification**: Send automated push notifications via email/SMS to remind patients of upcoming appointments.
3. **Eligibility action items**: Flag and display any required actions when an eligibility check returns an issue for a scheduled appointment.
4. **Claims status dashboard**: Show post-visit claim state (submitted, adjudicated, paid/denied).
5. **Patient payments**: Allow patients to see balances and pay online once insurance adjudication is complete.

Release one phase every 4-6 weeks, beginning with payment estimates, which give immediate value to both staff and patients.
