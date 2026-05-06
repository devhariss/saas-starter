import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview, Row, Column
} from '@react-email/components'
import * as React from 'react'

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
    <Html>
      <Head />
      <Preview>Payment confirmed — {formatted}</Preview>
      <Body style={{ backgroundColor: '#f7f7f8', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e4e4e7' }}>
          <Heading style={{ fontSize: '22px', fontWeight: '600', color: '#0f0f11' }}>Payment confirmed</Heading>
          <Text style={{ color: '#71717a', fontSize: '16px', lineHeight: '1.6' }}>
            Hi {name}, your payment of <strong>{formatted}</strong> for SaasStarter has been processed successfully.
          </Text>
          <Row style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f4f4f5', borderRadius: '6px' }}>
            <Column><Text style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Account</Text><Text style={{ margin: 0, fontWeight: '600', color: '#0f0f11' }}>{email}</Text></Column>
            <Column><Text style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Amount</Text><Text style={{ margin: 0, fontWeight: '600', color: '#0f0f11' }}>{formatted}</Text></Column>
            <Column><Text style={{ margin: 0, color: '#71717a', fontSize: '14px' }}>Next renewal</Text><Text style={{ margin: 0, fontWeight: '600', color: '#0f0f11' }}>{periodEnd}</Text></Column>
          </Row>
          <Button
            href={invoiceUrl}
            style={{ backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', marginTop: '24px' }}
          >View Invoice</Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '32px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px' }}>SaasStarter · 1 Infinite Loop, Wilmington, DE 19801</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default InvoicePaidEmail
