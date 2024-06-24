import { atom } from "recoil";

export const registerRoleStateAtom = atom({
  key: "registerRoleStateAtom",
  default: 2,
});
export const resetStateAtom = atom({
  key: "resetState",
  default: false,
});

export const idStateAtom = atom({
  key: "idState",
  default: "",
});

export const passwordStateAtom = atom({
  key: "passwordState",
  default: "",
});

export const emailStateAtom = atom({
  key: "emailState",
  default: "",
});

export const nameStateAtom = atom({
  key: "nameState",
  default: "",
});

export const nicknameStateAtom = atom({
  key: "nicknameState",
  default: "",
});

export const genderStateAtom = atom({
  key: "genderState",
  default: "",
});

export const yearStateAtom = atom({
  key: "yearState",
  default: "",
});
export const monthStateAtom = atom({
  key: "monthState",
  default: "",
});
export const dayStateAtom = atom({
  key: "dayState",
  default: "",
});

export const methodStateAtom = atom({
  key: "methodState",
  default: [],
});

export const ageStateAtom = atom({
  key: "ageState",
  default: "",
});

export const locationStateAtom = atom({
  key: "locationState",
  default: [],
});

export const subjectStateAtom = atom({
  key: "subjectState",
  default: [],
});

export const maxfeeStateAtom = atom({
  key: "maxfeeState",
  default: "",
});

export const minfeeStateAtom = atom({
  key: "minfeeState",
  default: "",
});

export const roleStateAtom = atom({
  key: "roleState",
  default: 2,
});

export const answerStateAtom = atom({
  key: "answerState",
  default: "",
});

export const questionStateAtom = atom({
  key: "questionState",
  default: "",
});

export const dualRoleStateAtom = atom({
  key: "dualRoleState",
  default: false,
});

export const emailVerifiedStateAtom = atom({
  key: 'emailVerifiedState',
  default: null,
});

export const nicknameCheckedStateAtom = atom({
  key: 'nicknameCheckedState',
  default: null,
});

export const passwordMatchStateAtom = atom({
  key: 'passwordMatchState',
  default: null,
});