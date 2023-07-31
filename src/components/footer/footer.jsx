import { PropTypes } from 'prop-types'
import styled from '@emotion/styled'
import { ElementIds } from '@constants'

const FooterDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

export default function Footer({ children }) {
    return <FooterDiv id={ElementIds.Footer}>{children}</FooterDiv>
}

Footer.propTypes = {
    children: PropTypes.node,
}
