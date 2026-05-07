import {
  Body, Button, Container, Head, Heading,
  Hr, Html, Preview, Section, Text
} from '@react-email/components'

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
      <Body style={{ backgroundColor: '#f9f8f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#ffffff', borderRadius: 12, padding: '40px 36px', border: '1px solid #e8e6e1' }}>
            <Heading style={{ fontSize: 22, fontWeight: 700, color: '#1a1916', marginBottom: 8 }}>
              You&apos;re invited to join {teamName}
            </Heading>
            <Text style={{ color: '#5c5a55', lineHeight: 1.7 }}>
              <strong>{inviterName}</strong> has invited you to collaborate on <strong>{teamName}</strong> in SaasStarter.
            </Text>
            <Button
              href={inviteUrl}
              style={{
                background: 'oklch(0.52 0.22 285)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                display: 'inline-block',
                margin: '16px 0',
              }}
            >
              Accept invitation
            </Button>
            <Text style={{ color: '#9e9c98', fontSize: 13 }}>
              This invitation expires in 7 days. If you weren&apos;t expecting this, ignore it.
            </Text>
            <Hr style={{ borderColor: '#e8e6e1', margin: '32px 0' }} />
            <Text style={{ color: '#9e9c98', fontSize: 13 }}>SaasStarter</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default TeamInviteEmail
