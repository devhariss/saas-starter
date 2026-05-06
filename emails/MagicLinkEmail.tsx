import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview
} from '@react-email/components'
import * as React from 'react'

interface MagicLinkEmailProps {
  url: string
  email: string
}

export function MagicLinkEmail({ url, email }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your sign-in link for SaasStarter</Preview>
      <Body style={{ backgroundColor: '#f7f7f8', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e4e4e7' }}>
          <Heading style={{ fontSize: '22px', fontWeight: '600', color: '#0f0f11' }}>
            Sign in to SaasStarter
          </Heading>
          <Text style={{ color: '#71717a', fontSize: '16px', lineHeight: '1.6' }}>
            Click the button below to sign in as <strong>{email}</strong>. This link expires in 10 minutes.
          </Text>
          <Button
            href={url}
            style={{ backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', marginTop: '24px' }}
          >
            Sign in
          </Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '32px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px' }}>
            If you didn\'t request this, you can safely ignore this email. Never share this link.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default MagicLinkEmail
