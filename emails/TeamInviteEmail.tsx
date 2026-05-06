import {
  Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr,
} from '@react-email/components'

interface TeamInviteEmailProps {
  inviterName: string
  teamName: string
  inviteUrl: string
  email: string
  role: string
}

export function TeamInviteEmail({ inviterName, teamName, inviteUrl, email, role }: TeamInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{inviterName} invited you to join {teamName}</Preview>
      <Body style={{ backgroundColor: '#0d0d10', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161618', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Heading style={{ color: '#f5f5f5', fontSize: '22px', fontWeight: 700 }}>You've been invited</Heading>
          <Text style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6' }}>
            <strong style={{ color: '#f5f5f5' }}>{inviterName}</strong> has invited {email} to join{' '}
            <strong style={{ color: '#f5f5f5' }}>{teamName}</strong> as a <strong style={{ color: '#f5f5f5' }}>{role}</strong>.
          </Text>
          <Section style={{ margin: '24px 0' }}>
            <Link
              href={inviteUrl}
              style={{ display: 'inline-block', backgroundColor: '#6366f1', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}
            >
              Accept Invitation
            </Link>
          </Section>
          <Text style={{ color: '#71717a', fontSize: '13px' }}>This invitation expires in 7 days. If you were not expecting this, you can safely ignore it.</Text>
          <Hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />
          <Text style={{ color: '#71717a', fontSize: '13px' }}>SaasStarter</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default TeamInviteEmail
