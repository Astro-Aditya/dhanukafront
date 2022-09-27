import {useSelector} from 'react-redux'
import {Alert} from 'react-bootstrap'

import React from 'react'

function Alerts() {
    const alerts = useSelector(state => state.alert)
    return (
        <div>
            {alerts.map( alert => 
            <Alert key={alert.id} variant={alert.alertType} >
                {alert.msg}
            </Alert> )}            
        </div>
    )
}

export default Alerts
