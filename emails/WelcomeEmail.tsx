import {
  Body, Button, Container, Head, Heading,
  Hr, Html, Preview, Section, Text
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaasStarter, {name}!</Preview>
      <Body style={{ backgroundColor: '#f9f8f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#ffffff', borderRadius: 12, padding: '40px 36px', border: '1px solid #e8e6e1' }}>
            <Heading style={{ fontSize: 24, fontWeight: 700, color: '#1a1916', marginBottom: 8 }}>
              Welcome, {name} 👋
            </Heading>
            <Text style={{ color: '#5c5a55', lineHeight: 1.7, marginBottom: 24 }}>
              You&apos;re now part of SaasStarter. Your account is ready — jump in and start building.
            </Text>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
              style={{
                background: 'oklch(0.52 0.22 285)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              Go to dashboard
            </Button>
            <Hr style={{ borderColor: '#e8e6e1', margin: '32px 0' }} />
            <Text style={{ color: '#9e9c98', fontSize: 13 }}>
              SaasStarter · Jaipur, India · <a href={`${process.env.NEXT_PUBLIC_APP_URL}/privacy`} style={{ color: '#9e9c98' }}>Privacy Policy</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail
