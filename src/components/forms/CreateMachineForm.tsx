import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Machine } from "../../store/machine";
import { RootState } from "../../store";
import { Input, Select, Button, IconButton, Checkbox } from "../commons";

export type ICreateMachineForm = {
  [key: string]: string;
};

type CreateMachineFormProps = {
  values?: Machine;
  onSubmit: (value: Omit<Machine, "id">) => void;
  onRemove?: () => void;
};

export const CreateMachineForm = ({
  values,
  onSubmit,
  onRemove,
}: CreateMachineFormProps) => {
  const [machineTypeId, setMachineTypeId] = useState(values?.machineTypeId);
  const machineTypes = useSelector((state: RootState) => state.machine.types);

  const selectedMachineType = useMemo(() => {
    const selectedMachineType = machineTypes.find(
      ({ id }) => id === machineTypeId
    );
    return selectedMachineType;
  }, [machineTypeId, machineTypes]);

  const { register, handleSubmit, watch } = useForm<ICreateMachineForm>({
    defaultValues: values?.fields,
  });

  const handleFormSubmit = (value: ICreateMachineForm) => {
    onSubmit({ fields: value, machineTypeId });
  };

  return (
    <div className="rounded-md border max-w-full border-gray-200 w-96">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-sm font-medium leading-6 text-gray-900">
          {watch(selectedMachineType?.objectTitle || "")}
        </div>
        <IconButton
          className="!rounded-full ml-auto"
          kind="normal"
          onClick={onRemove}
        >
          <XMarkIcon className="w-4 h-4" />
        </IconButton>
      </div>
      {!machineTypeId && (
        <div className="space-y-5 py-4 px-4">
          <Select
            label="Machine Type"
            options={machineTypes.map(({ objectType, id }) => ({
              label: objectType || "",
              value: id,
            }))}
            onChange={setMachineTypeId}
            value={machineTypeId}
          />
        </div>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {machineTypeId && (
          <div className="space-y-5 py-4 px-4">
            {selectedMachineType?.fields?.map(({ type, name }) =>
              type === "checkbox" ? (
                <Checkbox label={name} {...register(name)} key={name} />
              ) : (
                <Input
                  label={name}
                  type={type}
                  {...register(name)}
                  key={name}
                />
              )
            )}
            <div className="w-max ml-auto">
              <Button type="submit" kind="secondary">
                Save
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
