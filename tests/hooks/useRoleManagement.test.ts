import { renderHook, act } from '@testing-library/react'
import { useRoleManagement } from '@/hooks/useRoleManagement'
import { Role } from '@/types/role'

const mockInitialRoles: Role[] = [
    { id: '1', name: '청소', assignee: '김철수', status: 'pending', timeSlot: '12:00' },
    { id: '2', name: '우유', assignee: '이영희', status: 'completed', timeSlot: '09:00' }
]

describe('useRoleManagement', () => {
    it('should initialize with provided roles', () => {
        const { result } = renderHook(() => useRoleManagement(mockInitialRoles))
        expect(result.current.roles).toEqual(mockInitialRoles)
    })

    it('should update assignee for a given role id', () => {
        const { result } = renderHook(() => useRoleManagement(mockInitialRoles))

        act(() => {
            result.current.updateAssignee('1', '박지민')
        })

        const updatedRole = result.current.roles.find((r: Role) => r.id === '1')
        expect(updatedRole?.assignee).toBe('박지민')
    })

    it('should not change other roles', () => {
        const { result } = renderHook(() => useRoleManagement(mockInitialRoles))

        act(() => {
            result.current.updateAssignee('1', '박지민')
        })

        const otherRole = result.current.roles.find((r: Role) => r.id === '2')
        expect(otherRole?.assignee).toBe('이영희')
    })
})
