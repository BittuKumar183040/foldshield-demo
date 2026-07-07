import nodemailer from "nodemailer"
import { NextResponse } from "next/server"
import path from "path"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Foldshield Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: subject || "Foldshield | New Inquiry",

      attachments: [
        {
          filename: "foldshield.png",
          path: path.join(process.cwd(), "public", "rexcrux", "foldshield.png"),
          cid: "rexcruxlogo",
        },
      ],

      html: `
  <div style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,Helvetica,sans-serif;">

    <div style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,Helvetica,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
          <td align="center">

            <table width="600" cellpadding="0" cellspacing="0"
              style="background:#111827;border-radius:12px;overflow:hidden;">

              <tr>
                <td style="padding:24px 32px;border-bottom:1px solid #1f2937;">

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="64" valign="middle">
                        <img src="cid:rexcruxlogo" alt="rexcrux" width="48" height="48" style="display:block;" />
                      </td>

                      <td valign="middle" style="padding-left:12px;">
                        <h1 style="margin:0;color:#22d3ee;font-size:20px;letter-spacing:1px;">
                          FOLDSHIELD
                        </h1>
                        <p style="margin:2px 0 0;color:#9ca3af;font-size:12px;">
                          New Contact Form Submission
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <tr>
                <td style="padding:28px 32px;">

                  <p style="color:#e5e7eb;font-size:14px;margin-bottom:20px;">
                    You’ve received a new inquiry from your website.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0"
                    style="font-size:14px;background:#0f172a;border-radius:8px;padding:12px;">

                    <tr>
                      <td style="color:#9ca3af;padding:10px 0;">Name</td>
                      <td style="color:#ffffff;padding:10px 0;text-align:right;">
                        ${name || "N/A"}
                      </td>
                    </tr>

                    <tr>
                      <td style="color:#9ca3af;padding:10px 0;">Email</td>
                      <td style="color:#22d3ee;padding:10px 0;text-align:right;">
                        ${email}
                      </td>
                    </tr>

                    <tr>
                      <td style="color:#9ca3af;padding:10px 0;">Phone</td>
                      <td style="color:#ffffff;padding:10px 0;text-align:right;">
                        ${phone || "N/A"}
                      </td>
                    </tr>

                    <tr>
                      <td style="color:#9ca3af;padding:10px 0;">Subject</td>
                      <td style="color:#ffffff;padding:10px 0;text-align:right;">
                        ${subject || "General Inquiry"}
                      </td>
                    </tr>

                  </table>

                  <div style="margin-top:24px;">
                    <p style="margin:0 0 6px;color:#9ca3af;font-size:12px;letter-spacing:0.5px;">
                      MESSAGE
                    </p>

                    <div style="padding:16px;background:#020617;border-radius:8px;border:1px solid #1f2937;">
                      <p style="margin:0;color:#e5e7eb;line-height:1.6;font-size:14px;">
                        ${message}
                      </p>
                    </div>
                  </div>

                </td>
              </tr>

              <tr>
                <td style="padding:24px 32px;border-top:1px solid #1f2937;background:#020617;">

                  <table width="100%" cellpadding="0" cellspacing="0">

                    <tr>
                      <td align="center" style="padding-bottom:10px;">
                        <p style="margin:0;color:#22d3ee;font-weight:bold;letter-spacing:1px;">
                          REXCRUX
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center">
                        <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;">
                          This message was sent from your website contact form.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="padding-top:10px;">
                        <p style="margin:0;color:#6b7280;font-size:12px;">
                          📧 info@rexcrux.com &nbsp; | &nbsp; 🌐 www.rexcrux.com
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td align="center" style="padding:14px 0;">
                        <div style="width:40px;height:2px;background:#22d3ee;border-radius:2px;"></div>
                      </td>
                    </tr>

                    <tr>
                      <td align="center">
                        <p style="margin:0;color:#4b5563;font-size:11px;">
                          © ${new Date().getFullYear()} Rexcrux. All rights reserved.
                        </p>
                      </td>
                    </tr>

                  </table>

                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </div>
    </td>
    </tr>
    </table>

  </div>
  `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}