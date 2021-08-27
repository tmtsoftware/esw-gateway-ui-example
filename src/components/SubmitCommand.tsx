import {
  CommandService,
  CommandType,
  ComponentId,
  longKey,
  Observe,
  Prefix,
  Setup,
  SubmitResponse
} from '@tmtsoftware/esw-ts'
import {
  Button,
  Card,
  Divider,
  Input,
  message,
  Select,
  Space,
  Typography
} from 'antd'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const SubmitCommand = (): JSX.Element => {
  const [prefix, setPrefix] = useState<string>('')
  const [command, setCommand] = useState<string>('')
  const [result, setResult] = useState<SubmitResponse>()
  const [commandType, setCommandType] = useState<'Setup' | 'Observe'>('Setup')
  const [componentType, setComponentType] = useState<'HCD' | 'Assembly'>(
    'Assembly'
  )
  const { auth } = useAuth()

  const authData = { tokenFactory: () => auth?.token() }
  const submit = async (prefix: string, command: string) => {
    try {
      const sleepInMs = longKey('timeInMs').set([3000])
      const commandService = await CommandService(
        new ComponentId(Prefix.fromString(prefix), componentType),
        authData
      )
      const _command =
        commandType === 'Observe'
          ? new Observe(Prefix.fromString(prefix), command, [sleepInMs])
          : new Setup(Prefix.fromString(prefix), command, [sleepInMs])

      const result = await commandService.submit(_command)
      setResult(result)
      switch (result._type) {
        case 'Started':
          const res = await commandService.queryFinal(result.runId, 5)
          console.log('res', res)
          setResult(res)
          break
        case 'Completed':
          setResult(result)
          break
      }
    } catch (e) {
      message.error(e.message)
      setResult(undefined)
    }
  }

  if (auth === undefined) return <div>...loading</div>

  return (
    <Card
      style={{
        minWidth: '30rem',
        minHeight: '12.5rem'
      }}
      title={
        <Typography.Title level={2}>Submit Command Example</Typography.Title>
      }>
      <Space direction={'vertical'}>
        <label htmlFor='commandType'>Command Type</label>
        <Select
          id='commandType'
          value={commandType}
          onChange={(e) => setCommandType(e)}>
          <Select.Option value='Setup'>Setup</Select.Option>
          <Select.Option value='Observe'>Observe</Select.Option>
        </Select>
        <label htmlFor='componentType'>Component Type</label>
        <Select
          id='componentType'
          value={componentType}
          onChange={(e) => setComponentType(e)}>
          <Select.Option value='HCD'>HCD</Select.Option>
          <Select.Option value='Assembly'>Assembly</Select.Option>
        </Select>
        <label>Prefix</label>
        <Input
          value={prefix}
          placeholder='ESW.assembly123'
          onChange={(e) => setPrefix(e.target.value)}
        />
        <label>Command Name</label>
        <Input
          value={command}
          placeholder='noop'
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button
          type='primary'
          disabled={prefix === '' || command === ''}
          onClick={() => submit(prefix, command)}>
          Submit
        </Button>
        <Divider />
        <Typography.Title level={2}>Result</Typography.Title>
        <Typography.Paragraph>
          {result && <pre>{JSON.stringify(result, null, 4)}</pre>}
        </Typography.Paragraph>
      </Space>
    </Card>
  )
}
