import { render, screen, fireEvent } from '@testing-library/react'
import AlertOverlay from '@/components/dashboard/AlertOverlay'

describe('AlertOverlay', () => {
    it('renders nothing when alert is null', () => {
        const { container } = render(<AlertOverlay alert={null} onDismiss={() => { }} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders alert message when present', () => {
        const alert = { message: '수업 시작 5분 전!', type: 'warning' as const }
        render(<AlertOverlay alert={alert} onDismiss={() => { }} />)

        expect(screen.getByText('수업 시작 5분 전!')).toBeInTheDocument()
    })

    it('calls onDismiss when close button clicked', () => {
        const alert = { message: 'Test Msg', type: 'warning' as const }
        const mockDismiss = vi.fn()

        render(<AlertOverlay alert={alert} onDismiss={mockDismiss} />)

        const closeBtn = screen.getByRole('button') // Assuming a button exists
        fireEvent.click(closeBtn)

        expect(mockDismiss).toHaveBeenCalled()
    })
})
