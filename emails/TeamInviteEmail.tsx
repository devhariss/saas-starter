import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Preview,
} from '@react-email/components'

interface TeamInviteEmailProps {
  inviterName: string
  teamName: string
  inviteUrl: string
  email: string
}

export function TeamInviteEmail({ inviterName, teamName, inviteUrl, email }: TeamInviteEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{inviterName} invited you to join {teamName} on SaasStarter</Preview>
      <Body style={{ backgroundColor: '#0d0d12', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161620', borderRadius: '12px' }}>
          <Heading style={{ color: '#e8e8f0', fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>
            You&apos;ve been invited to {teamName}
          </Heading>
          <Text style={{ color: '#8888a8', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            <strong style={{ color: '#e8e8f0' }}>{inviterName}</strong> has invited{' '}
            <strong style={{ color: '#e8e8f0' }}>{email}</strong> to join the{' '}
            <strong style={{ color: '#e8e8f0' }}>{teamName}</strong> team on SaasStarter.
          </Text>
          <Button
            href={inviteUrl}
            style={{ backgroundColor: '#7c6ff7', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
          >
            Accept invitation
          </Button>
          <Hr style={{ borderColor: '#2a2a3a', margin: '32px 0' }} />
          <Text style={{ color: '#55556a', fontSize: '12px' }}>
            This invitation expires in 7 days. If you did not expect this, you can ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default TeamInviteEmail
