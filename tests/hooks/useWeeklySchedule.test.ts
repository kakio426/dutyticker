import { renderHook } from '@testing-library/react'
import { useWeeklySchedule } from '@/hooks/useWeeklySchedule'
import { mockWeeklySchedule } from '@/data/mockWeeklySchedule'

describe('useWeeklySchedule', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should return Monday schedule when today is Monday', () => {
        // 2025-12-29 is Monday
        const date = new Date(2025, 11, 29) // December is 11
        vi.setSystemTime(date)

        const { result } = renderHook(() => useWeeklySchedule())
        // Should match mockWeeklySchedule[1] as it loads from storage/default
        expect(result.current.schedule).toEqual(mockWeeklySchedule[1])
    })

    it('should return Tuesday schedule when today is Tuesday', () => {
        // 2025-12-30 is Tuesday
        const date = new Date(2025, 11, 30)
        vi.setSystemTime(date)

        const { result } = renderHook(() => useWeeklySchedule())
        expect(result.current.schedule).toEqual(mockWeeklySchedule[2])
    })

    it('should return Monday schedule for Sunday (demo mode)', () => {
        // 2025-12-28 is Sunday
        const date = new Date(2025, 11, 28)
        vi.setSystemTime(date)

        const { result } = renderHook(() => useWeeklySchedule())
        // Should return Monday (1) schedule because displayDay defaults to 1 on weekends
        expect(result.current.schedule).toEqual(mockWeeklySchedule[1])
    })
})
