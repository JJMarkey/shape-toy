import { useEffect } from 'react'

export default function useComponentFirstMount(eventHandler) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(eventHandler, [])
}
