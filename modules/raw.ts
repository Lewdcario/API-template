import handler from './handler';

const timeouts: TimeoutCache = {};

// Type 'any' is used because (client) BaseClient#api is private but we want to use it anyway
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function (client: any, packet: any): Promise<any> {
  if (packet.d.data.name === 'chat') {
    try {
      if (timeouts[packet.d.member.user.id]) {
        clearTimeout(timeouts[packet.d.member.user.id]);
        delete timeouts[packet.d.member.user.id];
      }

      // Acknowledge the interaction as a "Thinking..." response
      await client.api.interactions[packet.d.id][packet.d.token].callback.post({ data: { type: 5 } });

      // Empty query is recommended to start
      const { output, suggestions } = await handler(packet.d.member.user.id, packet.d.guild_id, packet.d.data.options?.[0].value || '');

      if (output.every((i) => i?.length)) {
        for (const response of output) {
          await client.api.webhooks[packet.d.application_id][packet.d.token].post({ data: { content: response } });
        }

        // Send a list of suggestions only the user can see (flags)
        if (suggestions?.length && suggestions.every((s) => s?.length)) {
          timeouts[packet.d.member.user.id] = setTimeout(() => {
            client.api.webhooks[packet.d.application_id][packet.d.token].post({
              data: { content: `Here are some suggestions if you're having trouble:\n${suggestions.join(', ')}`, flags: 64 },
            });
          }, 10000);
        }
      } else {
        return client.api.webhooks[packet.d.application_id][packet.d.token].post({
          data: { content: 'Unexpected response, please try again.', flags: 64 },
        });
      }
    } catch (err) {
      console.warn('Error with chat interaction', err);
      return client.api.webhooks[packet.d.application_id][packet.d.token].post({
        data: { content: 'Something went wrong... Please try again.', flags: 64 },
      });
    }
  }

  return null;
}
