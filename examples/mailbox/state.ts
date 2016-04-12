export interface State {
  mailbox: {
    selectedId: string;
  };
  message: {
    selectedId: number;
  };
};

export const state: State = {
  mailbox: {
    selectedId: null
  },
  message: {
    selectedId: null
  }
};
