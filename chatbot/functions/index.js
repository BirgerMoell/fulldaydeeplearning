
'use strict'

const functions = require('firebase-functions')
const { WebhookClient } = require('dialogflow-fulfillment')
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

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', welcome)
    intentMap.set('Default Fallback Intent', fallback)
    intentMap.set('GetHealthTip', getHealthTip)
    intentMap.set('GetSickTime', getSickTime)
    agent.handleRequest(intentMap)
  })
})
