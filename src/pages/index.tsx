import { PlusIcon } from "@heroicons/react/20/solid";
import { IconButton } from "../components/commons/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  Machine,
  addNewMachine,
  updateMachine,
  removeMachine,
} from "../store/machine";
import { generateUniqueId } from "../utils/generateId";
import { CreateMachineForm } from "../components/forms/CreateMachineForm";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const machines = useSelector((state: RootState) => state.machine.machines);
  const machinesTypes = useSelector((state: RootState) => state.machine.types);
  const dispatch = useDispatch();

  const handleAddNewMachine = (machineTypeId: string) => {
    const newMachineId = generateUniqueId();
    dispatch(addNewMachine({ id: newMachineId, machineTypeId }));
  };

  const handleMachineSubmit = (
    machineId: string,
    updatedMachine: Omit<Machine, "id">
  ) => {
    const machineWithId = { ...updatedMachine, id: machineId };
    dispatch(updateMachine({ id: machineId, machine: machineWithId }));
  };

  const handleRemoveMachine = (machineId: string) => {
    dispatch(removeMachine(machineId));
  };

  if (machinesTypes.length < 1)
    return (
      <div className="text-gray-500 h-full flex justify-center items-center">
        <div>
          <img
            src="/empty.svg"
            className="w-96 h-96 max-w-full fill-gray-600"
          />
          <NavLink
            to="/type"
            className="underline text-center mt-4 block mx-auto"
          >
            Click to create machine type
          </NavLink>
        </div>
      </div>
    );
  return (
    <div className="flex relative gap-5 sm:flex-row flex-col pb-60  !overflow-auto  min-h-full  w-full mx-auto px-2 sm:px-6 lg:px-8 mt-7 sm:pb-10">
      {machinesTypes.map(({ id, objectType }) => (
        <div key={id} className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="w-80 max-w-full">{objectType}</h3>
            <IconButton
              className="h-max"
              onClick={() => handleAddNewMachine(id)}
            >
              <PlusIcon className="w-5 h-5" />
            </IconButton>
          </div>
          <div className="flex flex-col-reverse">
            {machines?.map(
              (machine) =>
                machine.machineTypeId === id && (
                  <div key={machine.id} className="pb-5">
                    <CreateMachineForm
                      values={machine}
                      onSubmit={(updatedMachine) =>
                        handleMachineSubmit(machine.id, updatedMachine)
                      }
                      onRemove={() => handleRemoveMachine(machine.id)}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      ))}

      {machines?.map(
        (machine) =>
          !machine?.machineTypeId && (
            <div key={machine.id}>
              <CreateMachineForm
                values={machine}
                onSubmit={(updatedMachine) =>
                  handleMachineSubmit(machine.id, updatedMachine)
                }
                onRemove={() => handleRemoveMachine(machine.id)}
              />
            </div>
          )
      )}
    </div>
  );
};

export default HomePage;
