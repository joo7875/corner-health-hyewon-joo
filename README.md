## 1. System Design

Automate insurance eligibility checks and surface the results to staff, providers, and (optionally) patients.

1. **Trigger events**

   - New appointment scheduled or rescheduled
   - Patient insurance data created or updated

2. **Processing**

   - A small service enqueues each eligibility request.
   - Worker processes call the eligibility API.
   - Normalized eligibility response are stores on the appointment or policy record.

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

| Vendor                           | Approx. cost\*                                                                       | Limitations                                                                                 | Take                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Eligible](https://eligible.com) | ≈ $0.25 per check (volume discounts)                                                 | Clearing-house onboarding required for some payers; limited sandbox data                    | Best fit if eligibility is the only integration needed                                                   |
| [pVerify](https://pverify.io)    | Plans start around $99 per month; “Advanced Eligibility” tiers from ≈ $250 per month | Exact pricing and payer coverage vary by plan tier; requires sales contact for high volumes | Good choice if you also want built-in cost-estimator tools or batch workflows in addition to eligibility |

## 3. Operational Risks and Mitigation

| Risk                                   | Mitigation                                                                                               |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Missing / invalid insurance data       | Validate payer ID, member ID, DOB at entry; block save if incomplete                                     |
| Appointment reschedules                | Run an eligibility check immediately after the reschedule                                                |
| API downtime / rate limits             | Retry with back-off, display the most recent eligibility result with its timestamp, show “pending” badge |
| Certain payers refuse automated checks | Route to manual verification                                                                             |

## 4. Product Scoping - Next Steps

1. **Payment estimates**  
   Display copay/deductible next to eligibility and let staff send an estimate link to the patient.
2. **Claims status dashboard**  
   Show post-visit claim state (submitted, adjudicated, paid/denied).
3. **Patient payments**  
   Allow patients to see balances and pay online once insurance adjudication is complete.

Release one phase every 4-6 weeks, beginning with payment estimates, which give immediate value to both staff and patients.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
