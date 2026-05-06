import {
  Html, Head, Body, Container, Section, Text, Button, Hr
} from '@react-email/components'

interface MagicLinkEmailProps {
  magicLink: string
}

export default function MagicLinkEmail({ magicLink }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e6ebf1' }}>
          <Section>
            <Text style={{ fontSize: '24px', fontWeight: '700', color: '#0d0d12', margin: '0 0 8px' }}>
              Sign in to SaasStarter
            </Text>
            <Text style={{ fontSize: '16px', color: '#4a5568', lineHeight: '1.6', margin: '0 0 24px' }}>
              Click the button below to sign in. This link expires in 10 minutes and can only be used once.
            </Text>
          </Section>
          <Button
            href={magicLink}
            style={{ backgroundColor: '#5b4cf5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}
          >
            Sign in to SaasStarter
          </Button>
          <Section style={{ marginTop: '24px' }}>
            <Text style={{ fontSize: '13px', color: '#8898aa', margin: '0 0 8px' }}>Or copy and paste this URL into your browser:</Text>
            <Text style={{ fontSize: '12px', color: '#5b4cf5', wordBreak: 'break-all', margin: '0' }}>{magicLink}</Text>
          </Section>
          <Hr style={{ borderColor: '#e6ebf1', margin: '32px 0 24px' }} />
          <Text style={{ fontSize: '12px', color: '#8898aa', margin: '0' }}>
            If you didn&apos;t request this email, you can safely ignore it. Your account is secure.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
