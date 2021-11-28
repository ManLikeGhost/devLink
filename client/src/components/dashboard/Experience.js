import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'


const Experience = ({ experience }) => {
    return (
        <div>
            
        </div>
    )
}

Experience.propTypes = {
    experience: propTypes.func.isRequired,

}

export default connect( null)(Experience)
