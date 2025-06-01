export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== '/.well-known/webfinger') {
      return new Response('Not Found', { status: 404 });
    }

    const resource = url.searchParams.get('resource');
    const match = resource?.match(/^acct:([^@]+)@solitonradar\.com$/);

    if (!match) {
      return new Response(JSON.stringify({ error: 'Invalid resource' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const username = match[1];

    const response = {
      subject: `acct:${username}@solitonradar.com`,
      links: [
        {
          rel: 'http://openid.net/specs/connect/1.0/issuer',
          href: 'https://auth.solitonradar.com'
        }
      ]
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/jrd+json' }
    });
  }
}
