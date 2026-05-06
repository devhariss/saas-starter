import { Html, Head, Body, Container, Heading, Text, Button, Hr, Preview } from '@react-email/components'

interface TeamInviteEmailProps {
  inviterName: string
  teamName: string
  inviteUrl: string
}

export function TeamInviteEmail({ inviterName, teamName, inviteUrl }: TeamInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{inviterName} invited you to join {teamName} on SaasStarter</Preview>
      <Body style={{ background: '#f7f6f2', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', background: '#fff', borderRadius: 12, padding: '40px 48px' }}>
          <Heading style={{ fontSize: 24, fontWeight: 700, color: '#12100e', marginBottom: 8 }}>You've been invited</Heading>
          <Text style={{ fontSize: 16, color: '#4a4845', lineHeight: 1.6 }}>
            <strong>{inviterName}</strong> has invited you to join <strong>{teamName}</strong> on SaasStarter.
          </Text>
          <Button href={inviteUrl} style={{ display: 'inline-block', background: '#4a3aff', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', marginTop: 24 }}>Accept Invitation</Button>
          <Hr style={{ borderColor: '#e8e6e2', margin: '32px 0' }} />
          <Text style={{ fontSize: 13, color: '#8a8885' }}>This invitation expires in 48 hours. If you weren't expecting this, ignore it.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default TeamInviteEmail
