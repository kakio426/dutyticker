import { render, screen, fireEvent } from '@testing-library/react'
import BroadcastModal from '@/components/dashboard/BroadcastModal'

describe('BroadcastModal', () => {
    it('does not render when not open', () => {
        const { container } = render(<BroadcastModal isOpen={false} onClose={() => { }} onBroadcast={() => { }} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders input and buttons when open', () => {
        render(<BroadcastModal isOpen={true} onClose={() => { }} onBroadcast={() => { }} />)

        expect(screen.getByPlaceholderText(/메시지를 입력하세요/i)).toBeInTheDocument()
        expect(screen.getByText(/Broadcast to Dashboard/i)).toBeInTheDocument()
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument()
    })

    it('submits message when Broadcast button clicked', () => {
        const mockBroadcast = vi.fn()
        render(<BroadcastModal isOpen={true} onClose={() => { }} onBroadcast={mockBroadcast} />)

        const input = screen.getByPlaceholderText(/메시지를 입력하세요/i)
        fireEvent.change(input, { target: { value: '긴급 공지사항입니다' } })

        const submitBtn = screen.getByText(/Broadcast to Dashboard/i)
        fireEvent.click(submitBtn)

        expect(mockBroadcast).toHaveBeenCalledWith('긴급 공지사항입니다')
    })
})
