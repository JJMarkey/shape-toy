import {
    useEffect
} from 'react'

export default function useComponentFirstMount(eventHandler) {
    //justification: I only want this to run on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(eventHandler, [])
}