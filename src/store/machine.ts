import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MachineType = {
  id: string;
  objectType?: string;
  objectTitle?: string;
  fields?: { name: string; type: string }[];
};

export type Machine = {
  id: string;
  machineTypeId?: string;
  fields?: {
    [key: string]: string;
  };
};

export type MachineState = {
  types: MachineType[];
  machines: Machine[];
};

const initialState: MachineState = {
  types: [],
  machines: [],
};

const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    addMachineType: (state, action: PayloadAction<MachineType>) => {
      state.types = [...state.types, { ...action.payload }];
    },

    addNewMachine: (state, action: PayloadAction<Machine>) => {
      state.machines = [...state.machines, { ...action.payload }];
    },

    updateMachineType: (
      state,
      action: PayloadAction<{ id: string; machineType: MachineType }>
    ) => {
      state.types = state.types.map((type) =>
        type.id === action.payload.id
          ? { ...type, ...action.payload.machineType }
          : type
      );
    },

    updateMachine: (
      state,
      action: PayloadAction<{ id: string; machine: Machine }>
    ) => {
      state.machines = state.machines.map((machine) =>
        machine.id === action.payload.id
          ? { ...machine, ...action.payload.machine }
          : machine
      );
    },

    removeMachineType: (state, action: PayloadAction<{ id: string }>) => {
      state.types = state.types.filter((type) => type.id !== action.payload.id);
    },

    removeMachine: (state, action: PayloadAction<string>) => {
      state.machines = state.machines.filter(
        (machine) => machine.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addMachineType,
  updateMachineType,
  removeMachineType,
  addNewMachine,
  updateMachine,
  removeMachine,
} = machineSlice.actions;

export default machineSlice.reducer;
