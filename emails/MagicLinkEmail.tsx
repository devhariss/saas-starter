import {
  Body, Button, Container, Head, Heading,
  Hr, Html, Preview, Section, Text
} from '@react-email/components'

interface MagicLinkEmailProps {
  url: string
  email: string
}

export function MagicLinkEmail({ url, email }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your sign-in link for SaasStarter</Preview>
      <Body style={{ backgroundColor: '#f9f8f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#ffffff', borderRadius: 12, padding: '40px 36px', border: '1px solid #e8e6e1' }}>
            <Heading style={{ fontSize: 22, fontWeight: 700, color: '#1a1916', marginBottom: 8 }}>
              Sign in to SaasStarter
            </Heading>
            <Text style={{ color: '#5c5a55', lineHeight: 1.7, marginBottom: 8 }}>
              We received a sign-in request for <strong>{email}</strong>. Click the button below — this link expires in 24 hours.
            </Text>
            <Button
              href={url}
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
              Sign in
            </Button>
            <Text style={{ color: '#9e9c98', fontSize: 13, marginTop: 16 }}>
              If you didn&apos;t request this, you can safely ignore this email.
            </Text>
            <Hr style={{ borderColor: '#e8e6e1', margin: '32px 0' }} />
            <Text style={{ color: '#9e9c98', fontSize: 13 }}>
              SaasStarter · This is an automated message, please do not reply.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default MagicLinkEmail
