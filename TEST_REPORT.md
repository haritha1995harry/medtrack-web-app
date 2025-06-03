# End-to-End Test Report

## Overview
This report documents the Cypress end-to-end tests written to verify core user workflows in the MedTrack application.

## Test Coverage
| Feature Tested           | Description                                                    | Status     |
|--------------------------|----------------------------------------------------------------|------------|
| Login                    | User login with valid credentials                              | ✅ Passed  |
| Login (Empty Fields)     | Attempt login with missing input fields                        | ✅ Passed  |
| Login (Invalid Email)    | Attempt login with invalid email format                        | ✅ Passed  |
| Login (Invalid Password) | Attempt login with incorrect password                          | ✅ Passed  |
| Add Caregiver            | Adding a new caregiver with full details                       | ✅ Passed  |
| Caregiver Already Exists | Prevent duplicate caregiver entry                              | ✅ Passed  |
| Add Caregiver (Empty)    | Attempt to submit caregiver form with empty required fields    | ✅ Passed  |
| Add Medication           | Adding a new medication with schedule                          | ✅ Passed  |
| Medication (Empty)       | Attempt to submit medication form with empty required fields   | ✅ Passed  |

## Evidence
- `cypress/e2e/Login Testing/login.cy.js` — tested user login with valid credentials
- `cypress/e2e/Login Testing/loginEmptyFields.cy.js` — tested login with missing fields
- `cypress/e2e/Login Testing/loginInvalidEmail.cy.js` — tested login with invalid email
- `cypress/e2e/Login Testing/loginInvalidPassword.cy.js` — tested login with wrong password
- `cypress/e2e/Caregiver Testing/addCaregiver.cy.js` — tested caregiver creation
- `cypress/e2e/Caregiver Testing/addCaregiverAlreadyExist.cy.js` — tested duplicate caregiver
- `cypress/e2e/Caregiver Testing/addCaregiverEmptyFields.cy.js` — tested caregiver form validation
- `cypress/e2e/Medication Testing/addMedication.cy.js` — tested medication form
- `cypress/e2e/Medication Testing/addMedicationEmptyFields.cy.js` — tested medication form validation

## Conclusion
All key user workflows have been successfully tested using Cypress. The test cases cover valid interactions, form validations, and error handling scenarios. Test scripts are stored under `cypress/e2e/`, with screenshots and videos (if enabled) saved in their respective folders.
