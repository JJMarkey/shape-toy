import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import styled from '@emotion/styled'

const FlexContainer = styled.div(({ flexDirection }) => ({
    display: 'flex',
    flexDirection,
}))

function FlexGrid({ spacing, columns, flexDirection, children }) {
    return (
        <Grid container spacing={spacing} columns={columns}>
            <FlexContainer flexDirection={flexDirection}></FlexContainer>
            {children}
        </Grid>
    )
}

function GridItem({ columnWidth, children }) {
    return (
        <Grid item xs={columnWidth}>
            {children}
        </Grid>
    )
}

FlexGrid.Item = GridItem

export default FlexGrid

FlexGrid.propTypes = {
    spacing: PropTypes.number,
    columns: PropTypes.number,
    flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column']),
    children: PropTypes.node,
}

GridItem.propTypes = { columnWidth: PropTypes.number, children: PropTypes.node }
