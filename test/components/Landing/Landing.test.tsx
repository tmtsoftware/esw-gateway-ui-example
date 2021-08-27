import { screen, render } from '@testing-library/react'
import { expect } from 'chai'
import React from 'react'
import { Landing } from '../../../src/components'

describe('Landing', () => {
  it('should render', async () => {
    render(<Landing />)

    expect(screen.queryByText('Update src/App.tsx and save to reload.')).to
      .exist
  })
})
