import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview, Section, Row, Column,
} from '@react-email/components'

interface InvoicePaidEmailProps {
  customerName: string
  amount: string
  invoiceId: string
  invoiceUrl: string
  planName: string
  periodEnd: string
}

export function InvoicePaidEmail({ customerName, amount, invoiceId, invoiceUrl, planName, periodEnd }: InvoicePaidEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Payment received: {amount} for {planName}</Preview>
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', backgroundColor: '#ffffff', borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          <Section style={{ backgroundColor: '#0f0f13', padding: '32px 40px' }}>
            <Heading style={{ color: '#ffffff', fontSize: 24, margin: 0, fontWeight: 600 }}>SaasStarter</Heading>
          </Section>
          <Section style={{ padding: '32px 40px' }}>
            <Heading as="h2" style={{ fontSize: 20, fontWeight: 600, color: '#111827', marginTop: 0 }}>
              Payment confirmed
            </Heading>
            <Text style={{ color: '#4b5563', lineHeight: 1.6, fontSize: 15 }}>
              Hi {customerName}, your payment of <strong>{amount}</strong> for the <strong>{planName}</strong> plan has been received. Your subscription is active until {periodEnd}.
            </Text>
            <Section style={{ backgroundColor: '#f9fafb', borderRadius: 6, padding: '16px 20px', margin: '16px 0', border: '1px solid #e5e7eb' }}>
              <Row>
                <Column><Text style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>Invoice ID</Text></Column>
                <Column><Text style={{ color: '#111827', fontSize: 13, margin: 0, textAlign: 'right' }}>{invoiceId}</Text></Column>
              </Row>
              <Row>
                <Column><Text style={{ color: '#6b7280', fontSize: 13, margin: 0 }}>Amount</Text></Column>
                <Column><Text style={{ color: '#111827', fontSize: 13, margin: 0, textAlign: 'right' }}>{amount}</Text></Column>
              </Row>
            </Section>
            <Button
              href={invoiceUrl}
              style={{ backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: 6, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 8 }}
            >
              View Invoice
            </Button>
            <Hr style={{ borderColor: '#e5e7eb', margin: '32px 0' }} />
            <Text style={{ color: '#9ca3af', fontSize: 13 }}>
              Questions? Contact us at <a href="mailto:billing@yourcompany.com" style={{ color: '#4f46e5' }}>billing@yourcompany.com</a>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default InvoicePaidEmail
