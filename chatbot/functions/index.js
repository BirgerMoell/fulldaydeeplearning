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

// Kommunicate integration
// https:// www.kommunicate.io/test?appId=10d244c3bd3b842e5f18068c11b6ccd16&botIds=fulldaybot-3ygcj&assignee=fulldaybot-3ygcj

'use strict'

const functions = require('firebase-functions')
const { WebhookClient } = require('dialogflow-fulfillment')
const { Card, Suggestion } = require('dialogflow-fulfillment')
const cors = require('cors')({ origin: true })
const greetings = ['Welcome to your own personal health bot, please tell me how you are feeling sick', 'Welcome to your own personal health bot, please tell me how you are feeling sick']

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
        const response1 = `How long have you had a ${symptom} ${bodypart} ?`
        const response2 = `How long have you had a ${symptom} in your ${bodypart} ?`
        const healthRespones = [response1, response2]

        // agent.add(`How long have you had a ${symptom} ${bodypart} ?`)
        agent.add(getRandomPhrase(healthRespones))
      } else {
        agent.add('How long have you had these symptoms?')
      }
    }

    const getSickTime = (agent) => {
      const { duration } = result.parameters
      console.log('duration is', duration)

      if (duration) {
        const { unit, amount } = duration
        const response1 = `You been sick for ${duration}.`
        const sickTimeResponses = [response1]

        if (unit === 'wk') {
          agent.add(`You been sick for more than ${amount} weeks`)
          agent.add(`We would recommend you to see a doctor`)
        } else if (unit === 'day') {
          if (duration >= 3) {
            agent.add(`You been sick for more than ${amount} days`)
            agent.add(`You should think about going to see a doctor`)
          } else {
            agent.add(`Try taking an aspirin`)
          }
        }

        // agent.add(getRandomPhrase(sickTimeResponses))
      } else {
        agent.add('You should see a doctor')
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
    intentMap.set('GetSickTime', getSickTime)
    // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
    agent.handleRequest(intentMap)
  })
})
