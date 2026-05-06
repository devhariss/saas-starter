import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview, Section,
} from '@react-email/components'

interface TeamInviteEmailProps {
  inviterName: string
  teamName: string
  inviteUrl: string
  role: string
}

export function TeamInviteEmail({ inviterName, teamName, inviteUrl, role }: TeamInviteEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{inviterName} invited you to join {teamName} on SaasStarter</Preview>
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', backgroundColor: '#ffffff', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <Section style={{ backgroundColor: '#0f0f13', padding: '32px 40px' }}>
            <Heading style={{ color: '#ffffff', fontSize: 24, margin: 0, fontWeight: 600 }}>SaasStarter</Heading>
          </Section>
          <Section style={{ padding: '32px 40px' }}>
            <Heading as="h2" style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginTop: 0 }}>
              You&apos;re invited to join {teamName}
            </Heading>
            <Text style={{ color: '#4b5563', lineHeight: 1.6, fontSize: 15 }}>
              <strong>{inviterName}</strong> has invited you to join <strong>{teamName}</strong> as a <strong>{role}</strong>. Accept the invitation to start collaborating.
            </Text>
            <Button
              href={inviteUrl}
              style={{ backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: 6, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}
            >
              Accept Invitation
            </Button>
            <Hr style={{ borderColor: '#e5e7eb', margin: '32px 0' }} />
            <Text style={{ color: '#9ca3af', fontSize: 13 }}>
              This invitation expires in 7 days. If you didn&apos;t expect this, you can safely ignore it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default TeamInviteEmail
