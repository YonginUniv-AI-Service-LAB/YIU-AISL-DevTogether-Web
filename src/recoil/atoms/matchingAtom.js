import { atom } from "recoil";

export const selectedsubjectStateAtom = atom({
    key: 'subjectState',
    default: [],
});

export const selectedlocationStateAtom = atom({
    key: 'selectedlocationState',
    default: [],
});

export const selectedminageStateAtom = atom({
    key: 'selectedminageState',
    default: '',
});

export const selectedmaxageStateAtom = atom({
    key: 'selectedmaxageState',
    default: '',
});

export const selectedminfeeStateAtom = atom({
    key: 'selectedminamountState',
    default: '',
});

export const selectedmaxfeeStateAtom = atom({
    key: 'selectedmaxamountState',
    default: '',
});

export const selectedgenderStateAtom = atom({
    key: 'selectedgenderState',
    default: '',
});

export const selectedmethodStateAtom = atom({
    key: 'selectedmethodState',
    default: [],
});

