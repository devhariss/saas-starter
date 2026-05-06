import { Html, Head, Body, Container, Heading, Text, Button, Hr, Preview } from '@react-email/components'

interface MagicLinkEmailProps {
  url: string
  email: string
}

export function MagicLinkEmail({ url, email }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your sign-in link for SaasStarter</Preview>
      <Body style={{ background: '#f7f6f2', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', background: '#fff', borderRadius: 12, padding: '40px 48px' }}>
          <Heading style={{ fontSize: 24, fontWeight: 700, color: '#12100e', marginBottom: 8 }}>Sign in to SaasStarter</Heading>
          <Text style={{ fontSize: 16, color: '#4a4845', lineHeight: 1.6 }}>
            Click the button below to sign in as <strong>{email}</strong>. This link expires in 10 minutes and can only be used once.
          </Text>
          <Button
            href={url}
            style={{ display: 'inline-block', background: '#4a3aff', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', marginTop: 24 }}
          >
            Sign in to SaasStarter
          </Button>
          <Hr style={{ borderColor: '#e8e6e2', margin: '32px 0' }} />
          <Text style={{ fontSize: 13, color: '#8a8885' }}>If you didn't request this link, you can safely ignore this email.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default MagicLinkEmail
