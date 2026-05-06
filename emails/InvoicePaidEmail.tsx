import {
  Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr,
} from '@react-email/components'

interface InvoicePaidEmailProps {
  name: string
  email: string
  amount: number
  invoiceId: string
  invoiceUrl: string
  periodEnd: string
}

export function InvoicePaidEmail({ name, email, amount, invoiceId, invoiceUrl, periodEnd }: InvoicePaidEmailProps) {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100)
  return (
    <Html>
      <Head />
      <Preview>Payment confirmed — {formatted}</Preview>
      <Body style={{ backgroundColor: '#0d0d10', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161618', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Heading style={{ color: '#f5f5f5', fontSize: '22px', fontWeight: 700 }}>Payment confirmed ✓</Heading>
          <Text style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6' }}>
            Hi {name}, we received your payment of <strong style={{ color: '#f5f5f5' }}>{formatted}</strong> for {email}.
          </Text>
          <Section style={{ backgroundColor: '#1e1e22', borderRadius: '8px', padding: '16px', margin: '16px 0' }}>
            <Text style={{ color: '#a1a1aa', fontSize: '14px', margin: '4px 0' }}>Invoice ID: <span style={{ color: '#f5f5f5' }}>{invoiceId}</span></Text>
            <Text style={{ color: '#a1a1aa', fontSize: '14px', margin: '4px 0' }}>Amount paid: <span style={{ color: '#f5f5f5' }}>{formatted}</span></Text>
            <Text style={{ color: '#a1a1aa', fontSize: '14px', margin: '4px 0' }}>Next billing: <span style={{ color: '#f5f5f5' }}>{periodEnd}</span></Text>
          </Section>
          <Link
            href={invoiceUrl}
            style={{ display: 'inline-block', backgroundColor: '#6366f1', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}
          >
            View Invoice
          </Link>
          <Hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />
          <Text style={{ color: '#71717a', fontSize: '13px' }}>SaasStarter · Questions? Email <Link href="mailto:support@yourcompany.com" style={{ color: '#6366f1' }}>support@yourcompany.com</Link></Text>
        </Container>
      </Body>
    </Html>
  )
}

export default InvoicePaidEmail
