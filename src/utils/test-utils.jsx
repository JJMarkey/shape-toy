import { render } from '@testing-library/react'
import { configure } from '@testing-library/dom'

configure({
    testIdAttribute: 'id',
})

//will be updated for store
const renderWrapper = ({ children }) => {
    return children
}

const customRender = (ui, options) =>
    render(ui, { wrapper: renderWrapper, ...options })

// justification: this is straight from the testing-library/react documentation
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

export { customRender as render }
