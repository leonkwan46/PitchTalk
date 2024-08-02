type ErrorWithMessage = {
    message: string
}

type ErrorWithCustomedMessage = {
    response: {
        data: {
            message: string
        }
    }
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as ErrorWithMessage).message === 'string'
    )
}

const isErrorWithCustomedMessage = (error: unknown): error is ErrorWithCustomedMessage => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as ErrorWithCustomedMessage).response === 'object' &&
        'data' in (error as ErrorWithCustomedMessage).response &&
        typeof ((error as ErrorWithCustomedMessage).response.data) === 'object' &&
        'message' in ((error as ErrorWithCustomedMessage).response.data) &&
        typeof ((error as ErrorWithCustomedMessage).response.data.message) === 'string'
    )
}

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage | ErrorWithCustomedMessage => {
    if (isErrorWithMessage(maybeError) || isErrorWithCustomedMessage(maybeError)) return maybeError

    try {
        return new Error(JSON.stringify(maybeError))
    } catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references for example.
        return new Error(String(maybeError))
    }
}

export const getErrorMessage = (error: unknown) => {
    const errMessage = toErrorWithMessage(error)

    if ('response' in errMessage && 'data' in errMessage.response) return errMessage.response.data.message
    if ('message' in errMessage) return errMessage.message
}

