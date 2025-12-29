import { renderHook, act } from '@testing-library/react'
import { useBroadcast } from '@/hooks/useBroadcast'

describe('useBroadcast', () => {
    it('should initialize with empty message and inactive state', () => {
        const { result } = renderHook(() => useBroadcast())

        expect(result.current.isBroadcasting).toBe(false)
        expect(result.current.message).toBe('')
    })

    it('should update message and set broadcasting to true', () => {
        const { result } = renderHook(() => useBroadcast())

        act(() => {
            result.current.startBroadcast('모두 조용히 하세요')
        })

        expect(result.current.isBroadcasting).toBe(true)
        expect(result.current.message).toBe('모두 조용히 하세요')
    })

    it('should stop broadcasting and clear message', () => {
        const { result } = renderHook(() => useBroadcast())

        act(() => {
            result.current.startBroadcast('Test')
            result.current.stopBroadcast()
        })

        expect(result.current.isBroadcasting).toBe(false)
        expect(result.current.message).toBe('')
    })
})
