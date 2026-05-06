import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Hr,
  Preview,
  Row,
  Column,
} from '@react-email/components'

interface InvoicePaidEmailProps {
  name: string
  email: string
  amount: number
  currency: string
  invoiceUrl: string
  periodEnd: string
}

export function InvoicePaidEmail({ name, email, amount, currency, invoiceUrl, periodEnd }: InvoicePaidEmailProps) {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100)
  return (
    <Html lang="en">
      <Head />
      <Preview>Payment confirmed — {formatted}</Preview>
      <Body style={{ backgroundColor: '#0d0d12', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '40px', backgroundColor: '#161620', borderRadius: '12px' }}>
          <Heading style={{ color: '#e8e8f0', fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>
            Payment confirmed
          </Heading>
          <Text style={{ color: '#8888a8', fontSize: '16px', marginBottom: '24px' }}>
            Hi {name}, we&apos;ve received your payment of{' '}
            <strong style={{ color: '#e8e8f0' }}>{formatted}</strong>.
            Your subscription is active through{' '}
            <strong style={{ color: '#e8e8f0' }}>{periodEnd}</strong>.
          </Text>
          <Row style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#1e1e2e', borderRadius: '8px' }}>
            <Column><Text style={{ color: '#8888a8', fontSize: '13px', margin: 0 }}>Amount paid</Text><Text style={{ color: '#e8e8f0', fontSize: '20px', fontWeight: 700, margin: 0 }}>{formatted}</Text></Column>
            <Column><Text style={{ color: '#8888a8', fontSize: '13px', margin: 0 }}>Account</Text><Text style={{ color: '#e8e8f0', fontSize: '14px', margin: 0 }}>{email}</Text></Column>
          </Row>
          <Button
            href={invoiceUrl}
            style={{ backgroundColor: '#7c6ff7', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}
          >
            View invoice
          </Button>
          <Hr style={{ borderColor: '#2a2a3a', margin: '32px 0' }} />
          <Text style={{ color: '#55556a', fontSize: '12px' }}>
            Questions? Contact us at billing@yourcompany.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default InvoicePaidEmail
