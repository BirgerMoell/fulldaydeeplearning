# Dialogflow Fulfillment Webhook Template for Node.js and Cloud Functions for Firebase

This webhook template sets up everything needed to build fulfillment for your Dialogflow agent.

## Setup Instructions
Select **only one** of the options below.

### Option 1: Dialogflow Inline Editor (Recommended)
1. Create [Dialogflow Agent](https://console.dialogflow.com/)
2. **Fulfillment** > **Enable** the [Inline Editor](https://dialogflow.com/docs/fulfillment#cloud_functions_for_firebase)<sup>A.</sup>
3. Select **Deploy**

### Option 2: Firebase CLI
1. Create [Dialogflow Agent](https://console.dialogflow.com/)
2. `git clone https://github.com/dialogflow/fulfillment-webhook-nodejs.git`
3. `cd` to the `functions` directory
4. `npm install`
5. Install the Firebase CLI by running `npm install -g firebase-tools`
6. Login with your Google account, `firebase login`
7. Add your project to the sample with $ `firebase use <project ID>`
  + In Dialogflow console under **Settings** ⚙ > **General** tab > copy **Project ID**.
8. Run `firebase deploy --only functions:dialogflowFirebaseFulfillment`
9. When successfully deployed, visit the **Project Console** link > **Functions** > **Dashboard**
  + Copy the link under the events column. For example: `https://us-central1-<PROJECTID>.cloudfunctions.net/<FUNCTIONNAME>`
10. Back in Dialogflow Console > **Fulfillment** > **Enable** Webhook.
11. Paste the URL from the Firebase Console’s events column into the **URL** field > **Save**.

<sup>A.</sup> Powered by Cloud Functions for Firebase

## Samples 
| Name                                 | Language                         |
| ------------------------------------ |:---------------------------------|
| [Fulfillment Webhook JSON](https://github.com/dialogflow/fulfillment-webhook-json)| JSON |
| [Dialogflow Console Template](https://github.com/dialogflow/fulfillment-webhook-nodejs)| Node.js
| [Bike Shop-Google Calendar API](https://github.com/dialogflow/fulfillment-bike-shop-nodejs)| Node.js|
| [WWO Weather API](https://github.com/dialogflow/fulfillment-weather-nodejs)| Node.js |
| [Alexa Importer](https://github.com/dialogflow/fulfillment-importer-nodejs) | Node.js |
| [Temperature Trivia](https://github.com/dialogflow/fulfillment-temperature-converter-nodejs) | Node.js |
| [Human-Agent](https://github.com/dialogflow/agent-human-handoff-nodejs) | Node.js |
| [Google Translation API](https://github.com/dialogflow/fulfillment-translate-python) | Python |
| [WWO Weather API](https://github.com/dialogflow/fulfillment-weather-python) | Python |


## References & Issues
* Questions? Try [StackOverflow](https://stackoverflow.com/questions/tagged/dialogflow).
* Find a bug? Report it on [GitHub](https://github.com/dialogflow/fulfillment-webhook-json/issues).
* Dialogflow [Documentation](https://dialogflow.com/docs/getting-started/basics).
* For more information on [Initializing Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk).

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
