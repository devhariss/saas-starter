import {
  Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr,
} from '@react-email/components'

interface WelcomeEmailProps {
  name: string
  email: string
}

export function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaasStarter, {name}!</Preview>
      <Body style={{ backgroundColor: '#0d0d10', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161618', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Section>
            <Heading style={{ color: '#f5f5f5', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
              Welcome to SaasStarter 👋
            </Heading>
            <Text style={{ color: '#a1a1aa', fontSize: '16px', lineHeight: '1.6', marginTop: '0' }}>
              Hi {name}, your account for <strong style={{ color: '#f5f5f5' }}>{email}</strong> is ready.
            </Text>
            <Text style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6' }}>
              You now have access to:
            </Text>
            <ul style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '2' }}>
              <li>Unlimited projects on the Free plan</li>
              <li>Auth, analytics, and team management</li>
              <li>Stripe billing — upgrade anytime</li>
            </ul>
          </Section>
          <Hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />
          <Section>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL ?? 'https://yourapp.com'}/dashboard`}
              style={{ display: 'inline-block', backgroundColor: '#6366f1', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}
            >
              Go to Dashboard
            </Link>
          </Section>
          <Hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />
          <Text style={{ color: '#71717a', fontSize: '13px' }}>
            SaasStarter · If you didn't sign up, ignore this email.{' '}
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/privacy`} style={{ color: '#6366f1' }}>Privacy Policy</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail
