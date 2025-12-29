import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';
import { mockStudents } from '@/data/mockStudents';
import { mockWeeklySchedule } from '@/data/mockWeeklySchedule';
import { ClassSession } from '@/types/schedule';

export function useStudentSettings() {
    const [students, setStudents] = useState<string[]>(() =>
        loadFromStorage(STORAGE_KEYS.STUDENTS, mockStudents)
    );

    useEffect(() => {
        saveToStorage(STORAGE_KEYS.STUDENTS, students);
    }, [students]);

    const addStudent = (name: string) => {
        if (!students.includes(name)) {
            setStudents([...students, name]);
        }
    };

    const removeStudent = (name: string) => {
        setStudents(students.filter(s => s !== name));
    };

    const reorderStudents = (newOrder: string[]) => {
        setStudents(newOrder);
    };

    return { students, addStudent, removeStudent, reorderStudents };
}

export function useScheduleSettings() {
    const [schedule, setSchedule] = useState<Record<number, ClassSession[]>>(() =>
        loadFromStorage(STORAGE_KEYS.SCHEDULE, mockWeeklySchedule)
    );

    useEffect(() => {
        saveToStorage(STORAGE_KEYS.SCHEDULE, schedule);
    }, [schedule]);

    const updateDaySchedule = (day: number, sessions: ClassSession[]) => {
        setSchedule(prev => ({
            ...prev,
            [day]: sessions
        }));
    };

    return { schedule, updateDaySchedule };
}

import { mockRoles } from '@/data/mockRoles';
import { Role } from '@/types/role';

export function useRoleSettings() {
    const [roles, setRoles] = useState<Role[]>(() =>
        loadFromStorage(STORAGE_KEYS.ROLES, mockRoles)
    );

    useEffect(() => {
        saveToStorage(STORAGE_KEYS.ROLES, roles);
    }, [roles]);

    const addRole = (role: Role) => {
        setRoles([...roles, role]);
    };

    const updateRole = (updatedRole: Role) => {
        setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
    };

    const removeRole = (roleId: string) => {
        setRoles(roles.filter(r => r.id !== roleId));
    };

    const setAllRoles = (newRoles: Role[]) => {
        setRoles(newRoles);
    };

    return { roles, addRole, updateRole, removeRole, setAllRoles };
}
