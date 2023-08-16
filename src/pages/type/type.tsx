import { PlusIcon } from "@heroicons/react/20/solid";
import { IconButton } from "../../components/commons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  MachineType,
  addMachineType,
  removeMachineType,
  updateMachineType,
} from "../../store/machine";
import { generateUniqueId } from "../../utils/generateId";
import { CreateMachineTypeForm } from "../../components/forms/CreateMachineTypeForm";
import { useDeviceWidth } from "../../hooks/useDeviceWidth";
import { useScrollToBottom, useScrollToEnd } from "../../hooks/useScroll";
import { toast } from "react-hot-toast";

const TypePage = () => {
  const machineTypes = useSelector((state: RootState) => state.machine.types);
  const dispatch = useDispatch();
  const deviceWidth = useDeviceWidth();
  const scrollToEndRef = useScrollToEnd();
  const scrollToBottomRef = useScrollToBottom();

  const handleAddNewMachineType = () => {
    const newMachineTypeId = generateUniqueId();
    dispatch(addMachineType({ id: newMachineTypeId, objectType: "untitled" }));
  };

  const handleMachineTypeSubmit = (
    machineTypeId: string,
    updatedMachineType: Omit<MachineType, "id">
  ) => {
    const machineTypeWithId = { ...updatedMachineType, id: machineTypeId };
    if (machineTypeWithId.objectType === "untitled") {
      toast.error(`Can't save a machine type with no title`);
      return null;
    }
    dispatch(
      updateMachineType({ id: machineTypeId, machineType: machineTypeWithId })
    );
    toast.success("Machine type save successfully");
  };

  const handleRemoveMachineType = (machineTypeId: string) => {
    dispatch(removeMachineType({ id: machineTypeId }));
  };

  return (
    <div
      className="flex relative gap-5 sm:flex-row flex-col pb-60 overflow-x-auto min-h-full  w-full mx-auto px-2 sm:px-6 lg:px-8 mt-7"
      ref={deviceWidth > 650 ? scrollToEndRef : scrollToBottomRef}
    >
      {machineTypes.map((machineType) => (
        <div key={machineType.id}>
          <CreateMachineTypeForm
            values={machineType}
            onSubmit={(updatedMachineType) =>
              handleMachineTypeSubmit(machineType.id, updatedMachineType)
            }
            onRemove={() => handleRemoveMachineType(machineType.id)}
          />
        </div>
      ))}

      <div className="flex justify-end">
        <IconButton className="h-max" onClick={handleAddNewMachineType}>
          <PlusIcon className="w-5 h-5" />
        </IconButton>
      </div>
    </div>
  );
};

export default TypePage;
