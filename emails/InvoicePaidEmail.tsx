import {
  Body, Container, Head, Heading,
  Html, Preview, Section, Text, Hr, Row, Column,
} from '@react-email/components'

interface InvoicePaidEmailProps {
  name: string
  amount: string
  invoiceId: string
  date: string
  planName: string
}

export function InvoicePaidEmail({ name, amount, invoiceId, date, planName }: InvoicePaidEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Receipt for your {planName} subscription — {amount}</Preview>
      <Body style={{ backgroundColor: '#f7f6f2', fontFamily: 'Inter, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', padding: '0 20px' }}>
          <Section style={{ background: '#fff', borderRadius: '12px', padding: '40px', border: '1px solid #e4e2de' }}>
            <Heading style={{ fontSize: '24px', fontWeight: 700, color: '#1a1916', margin: '0 0 8px' }}>
              Payment confirmed
            </Heading>
            <Text style={{ fontSize: '16px', color: '#6b6a66', lineHeight: '1.6', margin: '0 0 24px' }}>
              Hi {name}, your payment of <strong>{amount}</strong> for the {planName} plan was successful.
            </Text>
            <Section style={{ background: '#f7f6f2', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
              <Row>
                <Column><Text style={{ fontSize: '13px', color: '#9b9a97', margin: 0 }}>Invoice ID</Text></Column>
                <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: '13px', color: '#1a1916', margin: 0 }}>{invoiceId}</Text></Column>
              </Row>
              <Row>
                <Column><Text style={{ fontSize: '13px', color: '#9b9a97', margin: 0 }}>Date</Text></Column>
                <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: '13px', color: '#1a1916', margin: 0 }}>{date}</Text></Column>
              </Row>
              <Row>
                <Column><Text style={{ fontSize: '13px', color: '#9b9a97', margin: 0 }}>Plan</Text></Column>
                <Column style={{ textAlign: 'right' }}><Text style={{ fontSize: '13px', color: '#1a1916', margin: 0 }}>{planName}</Text></Column>
              </Row>
            </Section>
            <Hr style={{ borderColor: '#e4e2de', margin: '0 0 24px' }} />
            <Text style={{ fontSize: '13px', color: '#9b9a97' }}>
              Thank you for being a SaasStarter customer. Questions? Email us at support@yourcompany.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
