import {
  CommandService,
  ComponentId,
  Prefix,
  Setup,
  SubmitResponse
} from '@tmtsoftware/esw-ts'
import { Button, Card, Divider, Input, message, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const SubmitCommand = (): JSX.Element => {
  const [prefix, setPrefix] = useState<string>('')
  const [command, setCommand] = useState<string>('')
  const [result, setResult] = useState<SubmitResponse>()
  const { auth } = useAuth()

  const authData = { tokenFactory: () => auth?.token() }
  const submit = async (prefix: string, command: string) => {
    try {
      const commandService = await CommandService(
        new ComponentId(Prefix.fromString(prefix), 'Assembly'),
        authData
      )
      commandService
        .submitAndWait(new Setup(Prefix.fromString(prefix), command), 300)
        .then((result) => {
          setResult(result)
        })
        .catch((e) => {
          message.error(e.message)
          setResult(undefined)
        })
    } catch (e) {
      message.error(e.message)
      setResult(undefined)
    }
  }

  if (auth === undefined) return <div>...loading</div>

  return (
    <div
      style={{
        display: 'flex',
        placeContent: 'center',
        paddingTop: '2rem'
      }}>
      <Card
        title={<Typography.Title level={2}>Submit Command</Typography.Title>}>
        <Space direction={'vertical'}>
          <label>Prefix</label>
          <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
          <label>Command</label>
          <Input value={command} onChange={(e) => setCommand(e.target.value)} />
          <Button
            type='primary'
            disabled={prefix === '' || command === ''}
            onClick={() => submit(prefix, command)}>
            Submit
          </Button>
          <Divider />
          <Typography.Title level={2}>Result</Typography.Title>
          <Typography.Paragraph
            style={{
              minWidth: '29rem',
              minHeight: '12.5rem'
            }}>
            {result && (
              <pre>
                <code>{JSON.stringify(result, null, 4)}</code>
              </pre>
            )}
          </Typography.Paragraph>
        </Space>
      </Card>
    </div>
  )
}
