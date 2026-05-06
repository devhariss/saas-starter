import {
  Html, Head, Body, Container, Section, Heading, Text, Button, Hr, Preview
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  name: string
  email: string
}

export function WelcomeEmail({ name, email }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to SaasStarter — your account is ready</Preview>
      <Body style={{ backgroundColor: '#f7f7f8', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e4e4e7' }}>
          <Heading style={{ fontSize: '24px', fontWeight: '600', color: '#0f0f11', marginBottom: '8px' }}>
            Welcome, {name}!
          </Heading>
          <Text style={{ color: '#71717a', fontSize: '16px', lineHeight: '1.6' }}>
            Your SaasStarter account for <strong>{email}</strong> is ready. You can now start building your SaaS product.
          </Text>
          <Section style={{ marginTop: '32px' }}>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
              style={{ backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}
            >
              Go to Dashboard
            </Button>
          </Section>
          <Hr style={{ borderColor: '#e4e4e7', margin: '32px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px' }}>
            If you didn\'t create this account, you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default WelcomeEmail
