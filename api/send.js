export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Kōhi Contact <onboarding@resend.dev>',
        to: ['karishma.cs22@sahyadri.edu.in'],
        reply_to: email,
        subject: `[Kōhi Contact] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f4ec; border-radius: 8px;">
            <h2 style="color: #1a0f00; border-bottom: 2px solid #EDE0C4; padding-bottom: 12px;">
              New message from Kōhi website
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #8B5E3C; font-size: 14px; width: 80px;"><strong>Name</strong></td>
                <td style="padding: 8px 0; color: #1a0f00; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8B5E3C; font-size: 14px;"><strong>Email</strong></td>
                <td style="padding: 8px 0; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #C8923A;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8B5E3C; font-size: 14px;"><strong>Subject</strong></td>
                <td style="padding: 8px 0; color: #1a0f00; font-size: 14px;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="color: #8B5E3C; font-size: 14px; margin-bottom: 8px;"><strong>Message</strong></p>
              <div style="background: #fff; border: 1px solid #EDE0C4; border-radius: 6px; padding: 16px; color: #1a0f00; font-size: 14px; line-height: 1.6;">
                ${message.replace(/\n/g, '<br/>')}
              </div>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #8B5E3C;">
              Reply directly to respond to ${name}.
            </p>
          </div>
        `,
      }),
    })

    if (response.ok) {
      return res.status(200).json({ success: true })
    } else {
      const err = await response.json()
      console.error('Resend error:', err)
      return res.status(500).json({ error: 'Failed to send email' })
    }
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}