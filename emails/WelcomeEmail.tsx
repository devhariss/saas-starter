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

interface WelcomeEmailProps {
  name: string
  email: string
}

export function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://yourapp.com'
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to SaasStarter — let&apos;s build something great</Preview>
      <Body style={{ backgroundColor: '#0d0d12', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161620', borderRadius: '12px' }}>
          <Heading style={{ color: '#e8e8f0', fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
            Welcome, {name} 👋
          </Heading>
          <Text style={{ color: '#8888a8', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
            Your account (<strong style={{ color: '#e8e8f0' }}>{email}</strong>) is ready.
            SaasStarter gives you everything wired up: auth, billing, analytics, and compliance.
            Ship faster.
          </Text>
          <Button
            href={`${appUrl}/dashboard`}
            style={{
              backgroundColor: '#7c6ff7',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Go to your dashboard
          </Button>
          <Hr style={{ borderColor: '#2a2a3a', margin: '32px 0' }} />
          <Text style={{ color: '#55556a', fontSize: '12px' }}>
            You&apos;re receiving this because you created an account at SaasStarter.
            If this was not you, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail
