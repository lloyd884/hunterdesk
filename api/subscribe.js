export default async function handler(req, res) {
 if (req.method !== 'POST') {
   return res.status(405).json({ error: 'Method not allowed' });
 }

 const { email } = req.body;

 if (!email) {
   return res.status(400).json({ error: 'Email required' });
 }

 try {
   await fetch('https://api.resend.com/emails', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       from: 'HunterDesk <onboarding@resend.dev>',
       to: 'hunterdesk@proton.me',
       subject: 'New HunterDesk Signup',
       html: `<p>New early access signup: <strong>${email}</strong></p>`
     })
   });

   return res.status(200).json({ success: true });
 } catch (error) {
   return res.status(500).json({ error: 'Failed to send' });
 }
}

