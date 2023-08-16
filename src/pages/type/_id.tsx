import { PlusIcon } from "@heroicons/react/20/solid";
import { IconButton } from "../../components/commons/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Machine,
  addNewMachine,
  updateMachine,
  removeMachine,
} from "../../store/machine";
import { generateUniqueId } from "../../utils/generateId";
import { CreateMachineForm } from "../../components/forms/CreateMachineForm";
import { useDeviceWidth } from "../../hooks/useDeviceWidth";
import { useScrollToBottom, useScrollToEnd } from "../../hooks/useScroll";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const MachinePage = () => {
  const machines = useSelector((state: RootState) => state.machine.machines);
  const dispatch = useDispatch();
  const { id: machineTypeId } = useParams();

  const deviceWidth = useDeviceWidth();
  const scrollToEndRef = useScrollToEnd();
  const scrollToBottomRef = useScrollToBottom();

  if (!machineTypeId) return null;

  const handleAddNewMachine = () => {
    const newMachineId = generateUniqueId();
    dispatch(addNewMachine({ id: newMachineId, machineTypeId }));
  };

  const handleMachineSubmit = (
    machineId: string,
    updatedMachine: Omit<Machine, "id">
  ) => {
    const machineWithId = { ...updatedMachine, id: machineId };
    dispatch(updateMachine({ id: machineId, machine: machineWithId }));
    toast.success("Machine add successfully");
  };

  const handleRemoveMachine = (machineId: string) => {
    dispatch(removeMachine(machineId));
  };

  return (
    <div
      className="flex relative gap-5 sm:flex-row flex-col pb-60 overflow-x-auto min-h-full  w-full mx-auto px-2 sm:px-6 lg:px-8 mt-7"
      ref={deviceWidth > 650 ? scrollToEndRef : scrollToBottomRef}
    >
      {machines
        ?.filter((machine) => machine.machineTypeId === machineTypeId)
        .map((machine) => (
          <div key={machine.id}>
            <CreateMachineForm
              values={machine}
              onSubmit={(updatedMachine) =>
                handleMachineSubmit(machine.id, updatedMachine)
              }
              onRemove={() => handleRemoveMachine(machine.id)}
            />
          </div>
        ))}

      <div className="flex justify-end ">
        <IconButton className="h-max" onClick={handleAddNewMachine}>
          <PlusIcon className="w-5 h-5" />
        </IconButton>
      </div>
    </div>
  );
};

export default MachinePage;
