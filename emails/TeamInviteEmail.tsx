import {
  Html, Head, Body, Container, Section, Text, Button, Hr
} from '@react-email/components'

interface TeamInviteEmailProps {
  inviterName: string
  teamName: string
  inviteUrl: string
  role: string
}

export default function TeamInviteEmail({ inviterName, teamName, inviteUrl, role }: TeamInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e6ebf1' }}>
          <Section>
            <Text style={{ fontSize: '24px', fontWeight: '700', color: '#0d0d12', margin: '0 0 8px' }}>
              You&apos;ve been invited to join {teamName}
            </Text>
            <Text style={{ fontSize: '16px', color: '#4a5568', lineHeight: '1.6', margin: '0 0 24px' }}>
              <strong>{inviterName}</strong> has invited you to join the <strong>{teamName}</strong> team on SaasStarter as a <strong>{role}</strong>.
            </Text>
          </Section>
          <Button
            href={inviteUrl}
            style={{ backgroundColor: '#5b4cf5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}
          >
            Accept invitation
          </Button>
          <Section style={{ marginTop: '24px' }}>
            <Text style={{ fontSize: '13px', color: '#8898aa', margin: '0' }}>This invitation expires in 7 days.</Text>
          </Section>
          <Hr style={{ borderColor: '#e6ebf1', margin: '32px 0 24px' }} />
          <Text style={{ fontSize: '12px', color: '#8898aa', margin: '0' }}>
            If you weren&apos;t expecting this invitation, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
