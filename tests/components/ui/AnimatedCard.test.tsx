import { render, screen } from '@testing-library/react'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

// Mock framer-motion since it uses web animations API not fully supported in jsdom
vi.mock('motion/react', () => ({
    motion: {
        div: ({ children, className, ...props }: any) => (
            <div className={className} data-testid="motion-div" {...props}>
                {children}
            </div>
        ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('AnimatedCard', () => {
    it('renders children correctly', () => {
        render(
            <AnimatedCard>
                <span>Test Content</span>
            </AnimatedCard>
        )
        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies additional class names', () => {
        render(
            <AnimatedCard className="bg-red-500">
                <span>Test Content</span>
            </AnimatedCard>
        )
        const card = screen.getByTestId('motion-div')
        expect(card).toHaveClass('bg-red-500')
    })

    it('passes layout prop to motion element', () => {
        render(
            <AnimatedCard layout>
                <span>Test Content</span>
            </AnimatedCard>
        )
        const card = screen.getByTestId('motion-div')
        expect(card).toBeInTheDocument()
    })
})
