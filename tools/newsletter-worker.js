/**
 * Cloudflare Worker — Newsletter and gated content signup proxy
 * Proxies signups to MailerLite API v2.
 * Accepts optional group_id in request body to route to specific MailerLite groups.
 *
 * Environment variables to set in Cloudflare dashboard:
 *   MAILERLITE_API_KEY    — MailerLite API key
 *   NEWSLETTER_GROUP_ID   — Default group for newsletter signups
 *
 * Gated content pages pass a hardcoded group_id in the request body.
 * Groups:
 *   Newsletter:  (default — set NEWSLETTER_GROUP_ID env var)
 *   <!-- GATED CONTENT NAME -->: <!-- MAILERLITE_GROUP_ID -->
 */

const MAILERLITE_API = 'https://api.mailerlite.com/api/v2';

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const email    = (body.email || '').trim().toLowerCase();
    const group_id = body.group_id || env.NEWSLETTER_GROUP_ID;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (!group_id) {
      return new Response(JSON.stringify({ success: false, error: 'No group configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    try {
      const mlRes = await fetch(`${MAILERLITE_API}/groups/${group_id}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': env.MAILERLITE_API_KEY,
        },
        body: JSON.stringify({ email, resubscribe: true }),
      });

      if (!mlRes.ok) {
        const err = await mlRes.text();
        console.error('MailerLite error:', mlRes.status, err);
        return new Response(JSON.stringify({ success: false, error: 'Subscription failed' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });

    } catch (err) {
      console.error('Worker error:', err);
      return new Response(JSON.stringify({ success: false, error: 'Internal error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
