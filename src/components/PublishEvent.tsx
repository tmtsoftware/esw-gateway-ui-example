import {
  Event,
  EventKey,
  EventName,
  EventService,
  intKey,
  Prefix
} from '@tmtsoftware/esw-ts'
import {
  Button,
  Card,
  Divider,
  Input,
  message,
  Space,
  Table,
  Typography
} from 'antd'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const PublishEvent = (): JSX.Element => {
  const [prefix, setPrefix] = useState('')
  const [keyName, setKeyName] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const { auth } = useAuth()
  const authData = { tokenFactory: () => auth?.token() }

  const handleEvent = (event: Event) => {
    if (event.eventId !== '-1') {
      setEvents((events) => [...events, event])
    } else {
      message.error(`Event: ${event.eventName.name} is invalid`)
    }
  }

  const subscribe = async () => {
    const eventService = await EventService(authData)
    eventService.subscribe(
      new Set([
        new EventKey(Prefix.fromString(prefix), new EventName(keyName))
      ]),
      1
    )(handleEvent)
  }

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      render: (eventName: EventName) => eventName.name
    },
    {
      title: 'Values',
      // eslint-disable-next-line react/display-name
      render: (_: string, event: Event) => {
        const counterParam = event.get(intKey('counter')) ?? { values: [] }
        return <span>{counterParam.values.join(',')}</span>
      }
    }
  ]

  return (
    <Card
      style={{
        minWidth: '30rem',
        minHeight: '12.5rem'
      }}
      title={
        <Typography.Title level={2}>Subscribe Event Example</Typography.Title>
      }>
      <Space direction={'vertical'}>
        <label>Source Prefix</label>
        <Input
          value={prefix}
          placeholder='ESW.assembly123'
          onChange={(e) => setPrefix(e.target.value)}
        />
        <label>Event KeyName</label>
        <Input
          value={keyName}
          placeholder='counterEvent'
          onChange={(e) => setKeyName(e.target.value)}
        />
        <Button
          type='primary'
          disabled={keyName === ''}
          onClick={() => subscribe()}>
          Subscribe
        </Button>
        <Divider />
        <Table pagination={false} dataSource={events} columns={columns} />
      </Space>
    </Card>
  )
}
