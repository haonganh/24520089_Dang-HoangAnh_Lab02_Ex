export type Item = {
  id: number;
  title: string;
};

export type ViewState<T> =
  | { status: "IDLE" }
  | { status: "LOADING" }
  | { status: "SUCCESS"; data: T[] }
  | { status: "ERROR"; error: string };