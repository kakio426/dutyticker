import { render, screen } from '@testing-library/react'
import DashboardLayout from '@/components/layout/DashboardLayout'

describe('DashboardLayout', () => {
    it('renders header and main content area', () => {
        // Layout should accept children
        render(
            <DashboardLayout>
                <div data-testid="test-child">Child Content</div>
            </DashboardLayout>
        )

        // Should render the child
        expect(screen.getByTestId('test-child')).toBeInTheDocument()

        // Should have a main role structure
        const main = screen.getByRole('main')
        expect(main).toBeInTheDocument()
    })

    it('has a split structure for large screens', () => {
        const { container } = render(
            <DashboardLayout>
                <div>Content</div>
            </DashboardLayout>
        )

        // Check for grid classes implementation (High coverage requirement)
        // We expect a grid layout for the dashboard
        const gridContainer = container.querySelector('.grid')
        expect(gridContainer).toBeInTheDocument()
    })
})
