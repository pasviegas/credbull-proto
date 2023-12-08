import create from "zustand";

type PointState = {
  point: number;
  set: (param: number) => void;
};

export const usePointState = create<PointState>(set => ({
  point: 0,
  set: param => set(() => ({ point: param })),
}));
