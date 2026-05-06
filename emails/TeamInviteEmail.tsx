import {
  Html, Head, Body, Container, Heading, Text, Button, Hr, Preview
} from '@react-email/components'
import * as React from 'react'

interface TeamInviteEmailProps {
  inviterName: string
  teamName: string
  inviteUrl: string
}

export function TeamInviteEmail({ inviterName, teamName, inviteUrl }: TeamInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{inviterName} invited you to join {teamName} on SaasStarter</Preview>
      <Body style={{ backgroundColor: '#f7f7f8', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '40px', border: '1px solid #e4e4e7' }}>
          <Heading style={{ fontSize: '22px', fontWeight: '600', color: '#0f0f11' }}>You\'ve been invited</Heading>
          <Text style={{ color: '#71717a', fontSize: '16px', lineHeight: '1.6' }}>
            <strong>{inviterName}</strong> has invited you to join the <strong>{teamName}</strong> team on SaasStarter.
          </Text>
          <Button
            href={inviteUrl}
            style={{ backgroundColor: '#4f46e5', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', textDecoration: 'none', display: 'inline-block', marginTop: '24px' }}
          >Accept Invitation</Button>
          <Hr style={{ borderColor: '#e4e4e7', margin: '32px 0' }} />
          <Text style={{ color: '#a1a1aa', fontSize: '12px' }}>This invitation expires in 7 days. If you didn\'t expect this, ignore this email.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default TeamInviteEmail
