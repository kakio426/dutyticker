import { useState, useEffect } from 'react';
import { Role } from '@/types/role';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';

export function useRoleManagement(initialRoles: Role[]) {
    // Initialize state from localStorage if available, otherwise use initialRoles
    const [roles, setRoles] = useState<Role[]>(() =>
        loadFromStorage(STORAGE_KEYS.ROLES, initialRoles)
    );

    // Save to localStorage whenever roles change
    useEffect(() => {
        saveToStorage(STORAGE_KEYS.ROLES, roles);
    }, [roles]);

    const updateAssignee = (roleId: string, newAssignee: string) => {
        setRoles(prevRoles =>
            prevRoles.map(role =>
                role.id === roleId ? { ...role, assignee: newAssignee } : role
            )
        );
    };

    return {
        roles,
        updateAssignee
    };
}
