import {
  Body, Button, Container, Head, Heading,
  Html, Preview, Section, Text, Hr,
} from '@react-email/components'

interface TeamInviteEmailProps {
  inviterName: string
  teamName: string
  inviteUrl: string
  email: string
}

export function TeamInviteEmail({ inviterName, teamName, inviteUrl, email }: TeamInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{inviterName} invited you to join {teamName} on SaasStarter</Preview>
      <Body style={{ backgroundColor: '#f7f6f2', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#fff', borderRadius: '12px', padding: '40px', border: '1px solid #e4e2de' }}>
            <Heading style={{ fontSize: '24px', fontWeight: 700, color: '#1a1916', margin: '0 0 8px' }}>
              You've been invited
            </Heading>
            <Text style={{ fontSize: '16px', color: '#6b6a66', lineHeight: '1.6', margin: '0 0 24px' }}>
              <strong>{inviterName}</strong> has invited you to join the <strong>{teamName}</strong> team on SaasStarter.
            </Text>
            <Button
              href={inviteUrl}
              style={{
                background: 'oklch(0.52 0.22 285)',
                color: '#fff',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Accept invitation
            </Button>
            <Hr style={{ borderColor: '#e4e2de', margin: '32px 0 24px' }} />
            <Text style={{ fontSize: '13px', color: '#9b9a97' }}>
              This invitation was sent to {email}. If you weren't expecting it, ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
