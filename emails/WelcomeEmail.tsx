import {
  Body, Button, Container, Head, Heading,
  Html, Preview, Section, Text, Hr,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  email: string
}

export function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaasStarter — you're in.</Preview>
      <Body style={{ backgroundColor: '#f7f6f2', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#fff', borderRadius: '12px', padding: '40px', border: '1px solid #e4e2de' }}>
            <Heading style={{ fontSize: '24px', fontWeight: 700, color: '#1a1916', margin: '0 0 8px' }}>
              Welcome, {name}
            </Heading>
            <Text style={{ fontSize: '16px', color: '#6b6a66', lineHeight: '1.6', margin: '0 0 24px' }}>
              Your account is all set. You're now ready to build and ship your SaaS product faster than ever.
            </Text>
            <Button
              href={`${appUrl}/dashboard`}
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
              Go to Dashboard
            </Button>
            <Hr style={{ borderColor: '#e4e2de', margin: '32px 0 24px' }} />
            <Text style={{ fontSize: '13px', color: '#9b9a97' }}>
              You're receiving this because you signed up with {email}. If this wasn't you,
              you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
