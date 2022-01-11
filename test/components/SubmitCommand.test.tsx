import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CommandService, TestUtils } from '@tmtsoftware/esw-ts'
import type { SubmitResponse } from '@tmtsoftware/esw-ts'
import { expect } from 'chai'
import React from 'react'
import { anything, instance, mock, when } from 'ts-mockito'
import { SubmitCommand } from '../../src/components/SubmitCommand'

describe('Submit command example', () => {
  const commandServiceMock = mock<CommandService>(TestUtils.CommandServiceImpl)
  const commandServiceInstance = instance(commandServiceMock)

  it('should successfully send command and render result', async () => {
    render(<SubmitCommand _commandService={commandServiceInstance} />)

    const prefixInput = (await screen.findByRole('Prefix')) as HTMLInputElement
    const commandInput = (await screen.findByRole(
      'commandName'
    )) as HTMLInputElement

    userEvent.type(prefixInput, 'ESW.sample')
    userEvent.type(commandInput, 'noop')
    when(commandServiceMock.submit(anything())).thenResolve({
      _type: 'Completed',
      runId: 'fce332f8-25ab-4faa-b85e-bf9f71639956',
      result: {
        paramSet: []
      }
    } as SubmitResponse)

    const submitButton = (await screen.findByRole(
      'Submit'
    )) as HTMLButtonElement

    await waitFor(() => userEvent.click(submitButton))

    const result = await screen.findByRole('result')

    await waitFor(() => {
      const expectedResult = {
        _type: 'Completed',
        runId: 'fce332f8-25ab-4faa-b85e-bf9f71639956',
        result: {
          paramSet: []
        }
      }
      expect(result.innerHTML).equal(JSON.stringify(expectedResult, null, 4))
    })
  })
})
