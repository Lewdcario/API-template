/**
 * VoiceFlow API Bugs
 * 1. Module not found until a run is tested on the website
 * 2. App crashes after deleting workspace
 * 3. Doesn't run well on laptop, becomes very slow after several blocks
 * 4. Can't parse array API responses to a list that can be outputted
 * 5. storage: { output: 'undefinedHello! One, or two?' }
 * 6. Malpractice of using 500 error codes for not found (related to 1)
 * 7. Have to refresh after errors otherwise can't move any blocks from the left popup
 * 8. The JS code action lacks documentation on what context it's executed in or what we can do with it that's actually relevant
 * 9. <response>.state.output builds on itself?
 */

import './typings';

import fetch from 'node-fetch';

import { voiceflow } from '../config.json';
import Session from './models/Session';

export default async function (
  userID: string,
  guildID: string,
  query: string
): Promise<{ output: (string | undefined)[]; suggestions?: (string[] | undefined)[] }> {
  try {
    const [session, created] = await Session.findOrCreate({
      where: { userID, guildID, finished: false },
      defaults: { userID, guildID, state: {} },
    });

    const body: Response = await fetch(`https://general-runtime.voiceflow.com/interact/${voiceflow.version}/`, {
      method: 'POST',
      headers: {
        Authorization: voiceflow.key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: {
          type: 'text',
          payload: created ? '' : query, // Should force empty query to get the starter message, otherwise the conversation will skip oddly
        },
        state: session.state,
      }),
    })
      .then((r) => r.json())
      .catch((e) => {
        console.warn('Error running request', e);
        return null;
      });

    if (!body) {
      return { output: ['There was an error creating a response. Please try again.'] };
    }

    session.state = body.state;

    if (body.trace.some((node) => node.type === 'end')) {
      session.finished = true;
    }

    await session.save();

    let output = body.trace.filter((t) => t.type === 'speak').map((t) => (t as SpeakTrace).payload?.message.replace(/(<([^>]+)>)/gi, ''));
    if (session.finished) {
      output = ['The conversation has ended.'];
    } else if (!output.length) {
      output = ['I did not recognise your input.']; // Fallback
    }

    const suggestions = body.trace.filter((t) => t.type === 'choice').map((t) => (t as ChoiceTrace).payload?.choices?.map((c) => c.name));

    return { output, suggestions };
  } catch (err) {
    console.error('Error', err);
    return { output: [err.toString()] };
  }
}
