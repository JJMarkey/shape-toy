import { render } from '@testing-library/react'

//will be updated for store
const renderWrapper = ({ children }) => {
    return { children }
}

const customRender = (ui, options) =>
    render(ui, { wrapper: renderWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
