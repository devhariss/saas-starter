import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaasStarter — you're ready to ship</Preview>
      <Body style={{ background: '#f7f6f2', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', background: '#fff', borderRadius: 12, padding: '40px 48px' }}>
          <Heading style={{ fontSize: 24, fontWeight: 700, color: '#12100e', marginBottom: 8 }}>
            Welcome, {name} 👋
          </Heading>
          <Text style={{ fontSize: 16, color: '#4a4845', lineHeight: 1.6 }}>
            Your SaasStarter account is ready. You can now create projects, invite team members, and start building.
          </Text>
          <Button
            href={process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}
            style={{ display: 'inline-block', background: '#4a3aff', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', marginTop: 24 }}
          >
            Go to Dashboard
          </Button>
          <Hr style={{ borderColor: '#e8e6e2', margin: '32px 0' }} />
          <Text style={{ fontSize: 13, color: '#8a8885' }}>
            If you didn't create this account, ignore this email. Questions? Email us at{' '}
            <a href="mailto:support@saas-starter.com" style={{ color: '#4a3aff' }}>support@saas-starter.com</a>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail
