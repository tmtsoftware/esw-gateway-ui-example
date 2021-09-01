import {
  CommandService,
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
  Typography,
  Form,
  Alert,
  AlertProps,
  Badge
} from 'antd'
import type {
  PresetColorType,
  PresetStatusColorType
} from 'antd/lib/_util/colors'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const getResultType = (
  resultType: SubmitResponse['_type']
): PresetColorType => {
  switch (resultType) {
    case 'Started':
      return 'yellow'
    case 'Completed':
      return 'green'
    case 'Cancelled':
      return 'yellow'
    default:
      return 'red'
  }
}

export const SubmitCommand = ({
  _commandService
}: {
  _commandService?: CommandService
}): JSX.Element => {
  const [prefix, setPrefix] = useState<string>('')
  const [command, setCommand] = useState<string>('')
  const [sleepTime, setSleepTime] = useState<number>()
  const [result, setResult] = useState<SubmitResponse>()
  const [commandType, setCommandType] = useState<'Setup' | 'Observe'>('Setup')
  const [componentType, setComponentType] = useState<'HCD' | 'Assembly'>(
    'Assembly'
  )
  const { auth } = useAuth()

  const authData = { tokenFactory: () => auth?.token() }

  const submit = async () => {
    try {
      const sleepInMs = longKey('sleep').set([sleepTime ? sleepTime : 0])
      const commandService = _commandService
        ? _commandService
        : await CommandService(
            new ComponentId(Prefix.fromString(prefix), componentType),
            authData
          )

      const _command =
        commandType === 'Observe'
          ? new Observe(Prefix.fromString(prefix), command, [sleepInMs])
          : new Setup(Prefix.fromString(prefix), command, [sleepInMs])

      const result = await commandService.submit(_command)

      switch (result._type) {
        case 'Started':
          setResult(result)
          const res = await commandService.queryFinal(result.runId, 5)
          setResult(res)
          break
        default:
          setResult(result)
          break
      }
    } catch (e) {
      message.error((e as Error).message)
      setResult(undefined)
    }
  }

  if (auth === undefined) return <div>...loading</div>

  return (
    <Card
      style={{
        maxWidth: '30rem',
        maxHeight: '40rem'
      }}
      title={
        <Typography.Title level={2}>Submit Command Example</Typography.Title>
      }>
      <Form>
        <Form.Item label='Command Type' required>
          <Select
            id='commandType'
            value={commandType}
            onChange={(e) => setCommandType(e)}>
            <Select.Option value='Setup'>Setup</Select.Option>
            <Select.Option value='Observe'>Observe</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Component Type' required>
          <Select
            id='componentType'
            value={componentType}
            onChange={(e) => setComponentType(e)}>
            <Select.Option value='HCD'>HCD</Select.Option>
            <Select.Option value='Assembly'>Assembly</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Prefix' required>
          <Input
            role='Prefix'
            value={prefix}
            placeholder='ESW.defaultAssembly'
            onChange={(e) => setPrefix(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Command Name' required>
          <Input
            role='commandName'
            value={command}
            placeholder='noop'
            onChange={(e) => setCommand(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Sleep' hidden={command !== 'sleep'}>
          <Input
            role='sleep'
            value={sleepTime}
            placeholder='Enter value in terms of milliseconds'
            type='number'
            onChange={(e) => setSleepTime(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button
            role='Submit'
            type='primary'
            onClick={submit}
            disabled={prefix === '' || command === ''}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Typography.Title level={2}>Result</Typography.Title>
      <Typography.Paragraph>
        {result && (
          <Badge.Ribbon
            color={getResultType(result._type)}
            style={{ width: '0.75rem', height: '0.75rem' }}>
            <pre role='result'>{JSON.stringify(result, null, 4)}</pre>
          </Badge.Ribbon>
        )}
      </Typography.Paragraph>
    </Card>
  )
}
