import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Event,
  EventName,
  EventService,
  IntKey,
  intKey,
  Parameter,
  Prefix,
  SystemEvent,
  TestUtils
} from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import React from 'react'
import { anything, instance, mock, when } from 'ts-mockito'
import { SubscribeEvent } from '../../src/components/SubscribeEvent'
describe('Subscribe event example', () => {
  const eventServiceMock = mock<EventService>(TestUtils.EventServiceImpl)
  const eventServiceInstance = instance(eventServiceMock)
  let publish: (event: Event) => void = () => ({})
  when(eventServiceMock.subscribe(anything(), anything())).thenReturn(
    (event: (event: Event) => void) => {
      publish = event
      return {
        cancel: () => undefined
      }
    }
  )

  it('should subscribe to an particular event keyname', async () => {
    render(<SubscribeEvent _eventService={eventServiceInstance} />)

    const prefixInput = (await screen.findByRole(
      'SourcePrefix'
    )) as HTMLInputElement
    const keyNameInput = (await screen.findByRole(
      'keyName'
    )) as HTMLInputElement

    userEvent.type(prefixInput, 'ESW.sample')
    userEvent.type(keyNameInput, 'counterEvent')

    const subscribeButton = (await screen.findByRole(
      'subscribe'
    )) as HTMLButtonElement
    await waitFor(() => userEvent.click(subscribeButton))

    //simulate publishing event
    const counterParam: Parameter<IntKey> = intKey('counter').set([123])
    const event = SystemEvent.make(
      Prefix.fromString('ESW.sample'),
      new EventName('counterEvent'),
      [counterParam]
    )
    publish(event)

    const row = await screen.findByRole('row', {
      name: 'counterEvent 123'
    })
    expect(row).to.exist
    const unSubscribeButton = (await screen.findByText(
      'UnSubscribe'
    )) as HTMLButtonElement

    await waitFor(() => userEvent.click(unSubscribeButton))
    await screen.findByRole('subscribe')
  })
})
