import React, { FC } from'react'
import StatusOverlay from './StatusOverlay'
import Loading from './Loading'
import { getRequestStatus } from '../../../redux/selectors'

const StatusContainer: FC = () => {
    const { auth, session } = getRequestStatus()

    const isLoading = auth.isLoading || session.isLoading
    const error = auth.error || session.error


    return (
        <>
            {isLoading ? <Loading /> : null}
            {error ? <StatusOverlay message={error} visible={error ? true: false} /> : null}
        </>
    )
}

export default StatusContainer
