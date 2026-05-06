import {
  Html, Head, Body, Container, Section, Text, Button, Hr, Img
} from '@react-email/components'

interface WelcomeEmailProps {
  userName: string
}

export default function WelcomeEmail({ userName }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e6ebf1' }}>
          <Section>
            <Text style={{ fontSize: '24px', fontWeight: '700', color: '#0d0d12', margin: '0 0 8px' }}>
              Welcome to SaasStarter, {userName}!
            </Text>
            <Text style={{ fontSize: '16px', color: '#4a5568', lineHeight: '1.6', margin: '0 0 24px' }}>
              You&apos;re now part of a community of builders shipping faster. Your account is ready — here&apos;s what to do next.
            </Text>
          </Section>
          <Section style={{ backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '20px', marginBottom: '24px' }}>
            <Text style={{ fontSize: '14px', fontWeight: '600', color: '#0d0d12', margin: '0 0 12px' }}>Get started in 3 steps:</Text>
            <Text style={{ fontSize: '14px', color: '#4a5568', margin: '0 0 8px' }}>1. Set up your first project</Text>
            <Text style={{ fontSize: '14px', color: '#4a5568', margin: '0 0 8px' }}>2. Invite your team members</Text>
            <Text style={{ fontSize: '14px', color: '#4a5568', margin: '0' }}>3. Connect your domain and go live</Text>
          </Section>
          <Button
            href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
            style={{ backgroundColor: '#5b4cf5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}
          >
            Go to your dashboard
          </Button>
          <Hr style={{ borderColor: '#e6ebf1', margin: '32px 0 24px' }} />
          <Text style={{ fontSize: '12px', color: '#8898aa', margin: '0' }}>
            You received this email because you signed up at SaasStarter. If you didn&apos;t create an account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
