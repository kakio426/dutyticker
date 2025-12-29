import { renderHook } from '@testing-library/react'
import { useAutoFitText } from '@/hooks/useAutoFitText'

describe('useAutoFitText', () => {
    it('returns large font for short text', () => {
        const { result } = renderHook(() => useAutoFitText('Short'))
        expect(result.current.fontSizeClass).toBe('text-8xl')
    })

    it('returns medium font for medium text', () => {
        const { result } = renderHook(() => useAutoFitText('This is a medium length text'))
        expect(result.current.fontSizeClass).toBe('text-6xl')
    })

    it('returns small font for very long text', () => {
        const { result } = renderHook(() => useAutoFitText('This is a very very very long text that should be small'))
        expect(result.current.fontSizeClass).toBe('text-4xl')
    })
})
