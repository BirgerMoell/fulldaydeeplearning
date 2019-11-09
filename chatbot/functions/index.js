// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Dialogflow fulfillment getting started guide:
// https://dialogflow.com/docs/how-tos/getting-started-fulfillment

'use strict'

const functions = require('firebase-functions')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Card, Suggestion } = require('dialogflow-fulfillment')
const cors = require('cors')({ origin: true })
const greetings = ['Welcome to my firebase agent!', 'Welcome to our custom agent!']

process.env.DEBUG = 'dialogflow:debug' // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const agent = new WebhookClient({ request, response })
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers))
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body))

    const result = request.body.queryResult

    function getRandomPhrase (listOfPhrases) {
      var randomPhrase = listOfPhrases[Math.floor(Math.random() * listOfPhrases.length)]
      return randomPhrase
    }

    const getHealthTip = (agent) => {
      console.log('the request body is', request.body)

      const { bodypart, symptom } = result.parameters

      console.log('the body part is', bodypart)
      console.log('the symptom is symptom', symptom)

      if (bodypart && symptom) {
        agent.add(`How long have you had ${symptom} in ${bodypart} ?`)
      } else {
        agent.add('How long have you had these symptoms?')
      }
    }

    function welcome (agent) {
      agent.add(getRandomPhrase(greetings))
    }

    function fallback (agent) {
      agent.add(`I didn't understand`)
      agent.add(`I'm sorry, can you try again?`)
    }

    // // Uncomment and edit to make your own intent handler
    // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function yourFunctionHandler(agent) {
    //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
    //   agent.add(new Card({
    //       title: `Title: this is a card title`,
    //       imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
    //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //       buttonText: 'This is a button',
    //       buttonUrl: 'https://docs.dialogflow.com/'
    //     })
    //   );
    //   agent.add(new Suggestion(`Quick Reply`));
    //   agent.add(new Suggestion(`Suggestion`));
    //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    // }

    // // Uncomment and edit to make your own Google Assistant intent handler
    // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!'); // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', welcome)
    intentMap.set('Default Fallback Intent', fallback)
    intentMap.set('GetHealthTip', getHealthTip)
    // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
    agent.handleRequest(intentMap)
  })
})
