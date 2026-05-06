import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview, Section,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  email: string
}

export function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to SaasStarter, {name}!</Preview>
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', backgroundColor: '#ffffff', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <Section style={{ backgroundColor: '#0f0f13', padding: '32px 40px' }}>
            <Heading style={{ color: '#ffffff', fontSize: 24, margin: 0, fontWeight: 600 }}>
              SaasStarter
            </Heading>
          </Section>
          <Section style={{ padding: '32px 40px' }}>
            <Heading as="h2" style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginTop: 0 }}>
              Welcome aboard, {name}!
            </Heading>
            <Text style={{ color: '#4b5563', lineHeight: 1.6, fontSize: 15 }}>
              Your account for <strong>{email}</strong> is ready. You can now create projects, invite team members, and start shipping your SaaS.
            </Text>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
              style={{ backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: 6, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}
            >
              Go to Dashboard
            </Button>
            <Hr style={{ borderColor: '#e5e7eb', margin: '32px 0' }} />
            <Text style={{ color: '#9ca3af', fontSize: 13 }}>
              If you didn&apos;t create this account, please ignore this email or contact us at{' '}
              <a href="mailto:support@yourcompany.com" style={{ color: '#4f46e5' }}>support@yourcompany.com</a>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail
