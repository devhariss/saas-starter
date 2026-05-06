import {
  Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr,
} from '@react-email/components'

interface MagicLinkEmailProps {
  url: string
  email: string
}

export function MagicLinkEmail({ url, email }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your sign-in link for SaasStarter</Preview>
      <Body style={{ backgroundColor: '#0d0d10', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161618', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Heading style={{ color: '#f5f5f5', fontSize: '22px', fontWeight: 700 }}>
            Sign in to SaasStarter
          </Heading>
          <Text style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6' }}>
            Click the button below to sign in as <strong style={{ color: '#f5f5f5' }}>{email}</strong>.
            This link expires in 15 minutes and can only be used once.
          </Text>
          <Section style={{ margin: '24px 0' }}>
            <Link
              href={url}
              style={{ display: 'inline-block', backgroundColor: '#6366f1', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}
            >
              Sign in
            </Link>
          </Section>
          <Hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />
          <Text style={{ color: '#71717a', fontSize: '13px' }}>
            If you didn't request this, you can safely ignore this email. This link will expire automatically.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default MagicLinkEmail
