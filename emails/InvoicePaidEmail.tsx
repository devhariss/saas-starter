import {
  Body, Container, Head, Heading,
  Hr, Html, Preview, Section, Text, Row, Column
} from '@react-email/components'

interface InvoicePaidEmailProps {
  name: string
  amount: string
  invoiceId: string
  date: string
  plan: string
}

export function InvoicePaidEmail({ name, amount, invoiceId, date, plan }: InvoicePaidEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Receipt from SaasStarter — {amount}</Preview>
      <Body style={{ backgroundColor: '#f9f8f5', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#ffffff', borderRadius: 12, padding: '40px 36px', border: '1px solid #e8e6e1' }}>
            <Heading style={{ fontSize: 22, fontWeight: 700, color: '#1a1916', marginBottom: 8 }}>
              Payment confirmed ✓
            </Heading>
            <Text style={{ color: '#5c5a55', lineHeight: 1.7 }}>
              Hi {name}, your payment of <strong>{amount}</strong> for the <strong>{plan}</strong> plan has been processed.
            </Text>
            <Section style={{ background: '#f9f8f5', borderRadius: 8, padding: '16px 20px', margin: '24px 0' }}>
              <Row>
                <Column><Text style={{ color: '#9e9c98', fontSize: 13, margin: 0 }}>Invoice ID</Text></Column>
                <Column align="right"><Text style={{ color: '#1a1916', fontSize: 13, fontWeight: 600, margin: 0 }}>{invoiceId}</Text></Column>
              </Row>
              <Row>
                <Column><Text style={{ color: '#9e9c98', fontSize: 13, margin: 0 }}>Date</Text></Column>
                <Column align="right"><Text style={{ color: '#1a1916', fontSize: 13, fontWeight: 600, margin: 0 }}>{date}</Text></Column>
              </Row>
              <Row>
                <Column><Text style={{ color: '#9e9c98', fontSize: 13, margin: 0 }}>Amount</Text></Column>
                <Column align="right"><Text style={{ color: '#1a1916', fontSize: 14, fontWeight: 700, margin: 0 }}>{amount}</Text></Column>
              </Row>
            </Section>
            <Hr style={{ borderColor: '#e8e6e1', margin: '24px 0' }} />
            <Text style={{ color: '#9e9c98', fontSize: 13 }}>
              Questions? Email <a href="mailto:billing@saas-starter.com" style={{ color: '#5c5a55' }}>billing@saas-starter.com</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default InvoicePaidEmail
