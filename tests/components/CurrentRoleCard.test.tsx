import { render, screen } from '@testing-library/react'
import CurrentRoleCard from '@/components/dashboard/CurrentRoleCard'
import { Role } from '@/types/role'

const mockRole: Role = {
    id: '1',
    name: '칠판 지우기',
    assignee: '김철수',
    status: 'pending',
    description: '쉬는시간마다 지우기',
    timeSlot: '쉬는시간'
}

describe('CurrentRoleCard', () => {
    it('displays role name and assignee prominently', () => {
        render(<CurrentRoleCard role={mockRole} />)

        // Role name should be large
        const roleName = screen.getByText(/칠판 지우기/i)
        expect(roleName).toBeInTheDocument()
        // Check for large font class (6xl, 7xl, 8xl, 9xl)
        // AutoFitText puts the font class on a wrapper div
        expect(roleName.closest('div')?.className).toMatch(/text-(6|7|8|9)xl/)

        // Assignee should be visible
        expect(screen.getByText(/김철수/)).toBeInTheDocument()
    })

    it('renders time slot info', () => {
        render(<CurrentRoleCard role={mockRole} />)
        expect(screen.getByText('쉬는시간')).toBeInTheDocument()
    })

    it('handles empty state when no role is active', () => {
        render(<CurrentRoleCard role={null} />)
        expect(screen.getByText(/현재 예정된 역할이 없습니다/i)).toBeInTheDocument()
    })
})
