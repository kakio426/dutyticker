import { render, screen } from '@testing-library/react'
import TimelineView from '@/components/dashboard/TimelineView'
import { Role } from '@/types/role'

const mockRoles: Role[] = [
    { id: '1', name: '아침 청소', assignee: '김철수', status: 'completed', timeSlot: '08:30' },
    { id: '2', name: '우유 급식', assignee: '이영희', status: 'pending', timeSlot: '10:30' },
    { id: '3', name: '점심 배식', assignee: '박민수', status: 'pending', timeSlot: '12:00' },
]

describe('TimelineView', () => {
    it('renders list of roles', () => {
        render(<TimelineView roles={mockRoles} />)
        expect(screen.getByText('아침 청소')).toBeInTheDocument()
        expect(screen.getByText('우유 급식')).toBeInTheDocument()
    })

    it('distinguishes completed roles', () => {
        render(<TimelineView roles={mockRoles} />)
        // Select the card container
        const completedRoleText = screen.getByText('아침 청소')
        // The card is a div with padding 6 (p-6)
        const card = completedRoleText.closest('div[class*="p-6"]')

        expect(card?.className).toMatch(/opacity-/)
    })
})
