import {
  Body, Button, Container, Head, Heading,
  Html, Preview, Section, Text, Hr,
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
      <Body style={{ backgroundColor: '#f7f6f2', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#fff', borderRadius: '12px', padding: '40px', border: '1px solid #e4e2de' }}>
            <Heading style={{ fontSize: '24px', fontWeight: 700, color: '#1a1916', margin: '0 0 8px' }}>
              Sign in to SaasStarter
            </Heading>
            <Text style={{ fontSize: '16px', color: '#6b6a66', lineHeight: '1.6', margin: '0 0 24px' }}>
              Click the button below to sign in. This link expires in 10 minutes and can only be used once.
            </Text>
            <Button
              href={url}
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
              Sign in
            </Button>
            <Hr style={{ borderColor: '#e4e2de', margin: '32px 0 24px' }} />
            <Text style={{ fontSize: '13px', color: '#9b9a97' }}>
              If you didn't request this, ignore this email. Sent to {email}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
