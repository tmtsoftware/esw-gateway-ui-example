// #subscribe-event-imports
import {
  Event,
  EventKey,
  EventName,
  EventService,
  intKey,
  Prefix,
  Subscription
} from '@tmtsoftware/esw-ts'
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Table,
  Typography
} from 'antd'
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
// #subscribe-event-imports
// #subscribe-event
export const SubscribeEvent = ({
  _eventService
}: {
  _eventService?: EventService
}): JSX.Element => {
  const { auth } = useAuth()
  const authData = { tokenFactory: () => auth?.token() }
  // #subscribe-event
  // #subscribe-event-state
  const [prefix, setPrefix] = useState('')
  const [keyName, setKeyName] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [subscription, setSubscription] = useState<Subscription>()
  // #subscribe-event-state

  // #subscribe-event-subscription
  const handleEvent = (event: Event) => {
    if (event.eventId !== '-1') {
      setEvents((events) => [...events, event])
    } else {
      message.error(`Event: ${event.eventName.name} is invalid`)
    }
  }
  const unSubscribe = () => {
    subscription?.cancel()
    setSubscription(undefined)
  }
  const subscribe = async () => {
    const eventServices = _eventService
      ? _eventService
      : await EventService(authData)

    const subscription = eventServices.subscribe(
      new Set([
        new EventKey(Prefix.fromString(prefix), new EventName(keyName))
      ]),
      1
    )(handleEvent)
    setSubscription(subscription)
  }
  // #subscribe-event-subscription
  // #subscribe-event-table-columns
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
  // #subscribe-event-table-columns
  // #subscribe-event
  return (
    <Card
      style={{
        maxWidth: '30rem',
        maxHeight: '45rem'
      }}
      title={
        <Typography.Title level={2}>Subscribe Event Example</Typography.Title>
      }>
      {/* // #subscribe-event */}
      {/* // #subscribe-event-fields */}
      <Form
        onFinish={() => {
          subscription ? unSubscribe() : subscribe()
        }}>
        <Form.Item label='Source Prefix'>
          <Input
            role='SourcePrefix'
            value={prefix}
            placeholder='ESW.assembly123'
            onChange={(e) => setPrefix(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Event Keyname'>
          <Input
            role='keyName'
            value={keyName}
            placeholder='counterEvent'
            onChange={(e) => setKeyName(e.target.value)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button
            role='subscribe'
            onClick={() => (subscription ? unSubscribe() : subscribe())}
            type='primary'
            disabled={keyName === ''}>
            {subscription ? 'UnSubscribe' : 'Subscribe'}
          </Button>
        </Form.Item>
      </Form>
      {/* #subscribe-event-fields */}
      <Divider />
      {/* #subscribe-event-table */}
      <Table
        scroll={{ y: 240 }}
        pagination={false}
        rowKey={(e) => e.eventId}
        dataSource={events}
        columns={columns}
      />
      {/* #subscribe-event-table */}
      {/* #subscribe-event */}
    </Card>
  )
}
// #subscribe-event
