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

interface MagicLinkEmailProps {
  url: string
  email: string
}

export function MagicLinkEmail({ url, email }: MagicLinkEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your sign-in link for SaasStarter</Preview>
      <Body style={{ backgroundColor: '#0d0d12', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161620', borderRadius: '12px' }}>
          <Heading style={{ color: '#e8e8f0', fontSize: '22px', fontWeight: 600, marginBottom: '12px' }}>
            Sign in to SaasStarter
          </Heading>
          <Text style={{ color: '#8888a8', fontSize: '16px', lineHeight: '1.6', marginBottom: '8px' }}>
            Click the button below to sign in as <strong style={{ color: '#e8e8f0' }}>{email}</strong>.
            This link expires in 10 minutes and can only be used once.
          </Text>
          <Button
            href={url}
            style={{
              backgroundColor: '#7c6ff7',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
              marginTop: '16px',
            }}
          >
            Sign in now
          </Button>
          <Hr style={{ borderColor: '#2a2a3a', margin: '32px 0' }} />
          <Text style={{ color: '#55556a', fontSize: '12px' }}>
            If you did not request this email, you can safely ignore it.
            This link will expire automatically.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default MagicLinkEmail
