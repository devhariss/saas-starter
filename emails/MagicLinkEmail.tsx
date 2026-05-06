import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview, Section,
} from '@react-email/components'

interface MagicLinkEmailProps {
  magicLink: string
  email: string
}

export function MagicLinkEmail({ magicLink, email }: MagicLinkEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your sign-in link for SaasStarter</Preview>
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', backgroundColor: '#ffffff', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <Section style={{ backgroundColor: '#0f0f13', padding: '32px 40px' }}>
            <Heading style={{ color: '#ffffff', fontSize: 24, margin: 0, fontWeight: 600 }}>SaasStarter</Heading>
          </Section>
          <Section style={{ padding: '32px 40px' }}>
            <Heading as="h2" style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginTop: 0 }}>
              Sign in to SaasStarter
            </Heading>
            <Text style={{ color: '#4b5563', lineHeight: 1.6, fontSize: 15 }}>
              Click the button below to sign in as <strong>{email}</strong>. This link expires in 24 hours and can only be used once.
            </Text>
            <Button
              href={magicLink}
              style={{ backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: 6, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}
            >
              Sign in to SaasStarter
            </Button>
            <Hr style={{ borderColor: '#e5e7eb', margin: '32px 0' }} />
            <Text style={{ color: '#9ca3af', fontSize: 13 }}>
              If you didn&apos;t request this email, you can safely ignore it. Your account is not at risk.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default MagicLinkEmail
