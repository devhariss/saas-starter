import {
  Html, Head, Body, Container, Section, Text, Button, Hr
} from '@react-email/components'

interface InvoicePaidEmailProps {
  userName: string
  amount: number
  currency: string
  invoiceUrl: string
  planName: string
  periodEnd: string
}

export default function InvoicePaidEmail({
  userName,
  amount,
  currency,
  invoiceUrl,
  planName,
  periodEnd,
}: InvoicePaidEmailProps) {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100)

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e6ebf1' }}>
          <Section>
            <Text style={{ fontSize: '24px', fontWeight: '700', color: '#0d0d12', margin: '0 0 8px' }}>
              Payment confirmed
            </Text>
            <Text style={{ fontSize: '16px', color: '#4a5568', lineHeight: '1.6', margin: '0 0 24px' }}>
              Hi {userName}, your payment of <strong>{formatted}</strong> for the <strong>{planName}</strong> plan has been processed successfully.
            </Text>
          </Section>
          <Section style={{ backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '20px', marginBottom: '24px' }}>
            <Text style={{ fontSize: '14px', color: '#4a5568', margin: '0 0 8px' }}><strong>Plan:</strong> {planName}</Text>
            <Text style={{ fontSize: '14px', color: '#4a5568', margin: '0 0 8px' }}><strong>Amount:</strong> {formatted}</Text>
            <Text style={{ fontSize: '14px', color: '#4a5568', margin: '0' }}><strong>Next billing date:</strong> {periodEnd}</Text>
          </Section>
          <Button
            href={invoiceUrl}
            style={{ backgroundColor: '#5b4cf5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}
          >
            View invoice
          </Button>
          <Hr style={{ borderColor: '#e6ebf1', margin: '32px 0 24px' }} />
          <Text style={{ fontSize: '12px', color: '#8898aa', margin: '0' }}>
            Questions? Contact us at billing@yourcompany.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
