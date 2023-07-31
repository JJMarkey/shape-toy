import { render } from '@utils'
import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { ElementIds } from '@constants'
import Footer from '../footer'

function renderFooter(children = <></>) {
    render(<Footer>{children}</Footer>)
}

describe('Footer', () => {
    test('renders without children', () => {
        renderFooter()

        const footer = screen.getByTestId(ElementIds.Footer)

        expect(footer).toBeDefined()
        expect(footer.childElementCount).toBe(0)
    })

    test('renders with children', () => {
        const testId = 'hi'
        renderFooter(<div id={testId}></div>)

        const footer = screen.getByTestId(ElementIds.Footer)

        expect(footer).toBeDefined()
        expect(footer.childElementCount).toBe(1)
        expect(screen.getByTestId(testId)).toBeDefined()
    })
})
