import { Client, Intents } from 'discord.js';

import { clientID, guild, token } from './config.json';
import raw from './modules/raw';

const client: Client = new Client({
  intents: Intents.FLAGS.GUILDS,
  presence: { status: 'online', activities: [{ name: 'Testing!' }] },
});

const data = {
  name: 'chat',
  description: 'Have a nice little conversation.',
  options: [
    {
      name: 'input',
      type: 3, // 'STRING'
      description: 'The query to start or continue the conversation',
      required: false,
    },
  ],
};

client.once('ready', async () => {
  console.log(`Ready as ${client?.user?.tag}`);
  await (client as any).api.applications[clientID].guilds[guild].commands.post({ data });
});

client.on('raw', async (packet) => {
  if (packet.t !== 'INTERACTION_CREATE') return null;
  return raw(client, packet);
});

client.login(token);
