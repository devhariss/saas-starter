import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { MagicLinkEmail } from "@/emails/MagicLinkEmail";
import { InvoicePaidEmail } from "@/emails/InvoicePaidEmail";
import { TeamInviteEmail } from "@/emails/TeamInviteEmail";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@saas-starter.dev";

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome to SaasStarter!",
    react: WelcomeEmail({ name }),
  });
}

export async function sendMagicLinkEmail({ to, url }: { to: string; url: string }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Your sign-in link for SaasStarter",
    react: MagicLinkEmail({ url }),
  });
}

export async function sendInvoicePaidEmail({
  to,
  name,
  amount,
  invoiceUrl,
}: {
  to: string;
  name: string;
  amount: string;
  invoiceUrl: string;
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Payment received — SaasStarter",
    react: InvoicePaidEmail({ name, amount, invoiceUrl }),
  });
}

export async function sendTeamInviteEmail({
  to,
  inviterName,
  teamName,
  inviteUrl,
}: {
  to: string;
  inviterName: string;
  teamName: string;
  inviteUrl: string;
}) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: `${inviterName} invited you to join ${teamName}`,
    react: TeamInviteEmail({ inviterName, teamName, inviteUrl }),
  });
}
