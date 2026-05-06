import { Html, Head, Body, Container, Heading, Text, Button, Hr, Preview } from '@react-email/components'

interface InvoicePaidEmailProps {
  name: string
  amount: string
  date: string
  invoiceUrl: string
}

export function InvoicePaidEmail({ name, amount, date, invoiceUrl }: InvoicePaidEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your invoice of {amount} has been paid</Preview>
      <Body style={{ background: '#f7f6f2', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', background: '#fff', borderRadius: 12, padding: '40px 48px' }}>
          <Heading style={{ fontSize: 24, fontWeight: 700, color: '#12100e', marginBottom: 8 }}>Payment confirmed ✓</Heading>
          <Text style={{ fontSize: 16, color: '#4a4845', lineHeight: 1.6 }}>Hi {name}, your payment of <strong>{amount}</strong> was received on {date}.</Text>
          <Button href={invoiceUrl} style={{ display: 'inline-block', background: '#4a3aff', color: '#fff', padding: '12px 24px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', marginTop: 24 }}>View Invoice</Button>
          <Hr style={{ borderColor: '#e8e6e2', margin: '32px 0' }} />
          <Text style={{ fontSize: 13, color: '#8a8885' }}>Thank you for your subscription. Questions? <a href="mailto:billing@saas-starter.com" style={{ color: '#4a3aff' }}>billing@saas-starter.com</a></Text>
        </Container>
      </Body>
    </Html>
  )
}

export default InvoicePaidEmail
