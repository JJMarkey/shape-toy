import { PropTypes } from 'prop-types'
import styled from '@emotion/styled'

const FooterDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

export default function Footer({ children }) {
    return <FooterDiv>{children}</FooterDiv>
}

Footer.propTypes = {
    children: PropTypes.node,
}
