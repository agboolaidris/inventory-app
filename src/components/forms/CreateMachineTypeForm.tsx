import {
  Controller,
  useFieldArray,
  useForm,
  SubmitHandler,
} from "react-hook-form";
import { Input } from "../commons/Input";
import { Select } from "../commons/Select";
import { Button } from "../commons/Button";
import { IconButton } from "../commons/IconButton";
import { TrashIcon } from "@heroicons/react/24/solid";
import { MachineType } from "../../store/machine";
import { XMarkIcon } from "@heroicons/react/20/solid";

const fieldTypeOptions = [
  { label: "Text", value: "text" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Date", value: "date" },
  { label: "Number", value: "number" },
];

type CreateMachineTypeFormProps = {
  values?: MachineType;
  onSubmit: SubmitHandler<Omit<MachineType, "id">>;
  onRemove?: () => void;
};

export const CreateMachineTypeForm = ({
  values,
  onSubmit,
  onRemove,
}: CreateMachineTypeFormProps) => {
  const { control, register, watch, handleSubmit } = useForm<
    Omit<MachineType, "id">
  >({
    defaultValues: values,
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const objectTypeOptions =
    watch("fields")?.map(({ name }) => ({
      label: name,
      value: name,
    })) || [];

  const handleRemoveField = async (index: number) => {
    remove(index);
    setTimeout(handleSubmit(onSubmit), 1000);
  };
  return (
    <div className="rounded-md border max-w-full border-gray-200 w-96">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-sm font-medium leading-6 text-gray-900">
          {watch("objectType")}
        </div>
        <IconButton
          className="!rounded-full ml-auto"
          kind="normal"
          onClick={onRemove}
        >
          <XMarkIcon className="w-4 h-4" />
        </IconButton>
      </div>

      <form onBlur={handleSubmit(onSubmit)}>
        <div className="space-y-5 py-4 px-4">
          <Input label="Object Type" {...register("objectType")} />
          <Controller
            control={control}
            name={`objectTitle`}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Object title"
                options={objectTypeOptions}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {fields?.map((_, index) => (
            <div className="flex gap-x-3" key={index}>
              <div className="flex-1">
                <Input {...register(`fields.${index}.name`)} />
              </div>
              <div className="w-32">
                <Controller
                  control={control}
                  name={`fields.${index}.type`}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={fieldTypeOptions}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div className="flex items-center mt-2">
                <IconButton
                  type="button"
                  onClick={() => handleRemoveField(index)}
                >
                  <TrashIcon className="w-4 h-4 fill-white" />
                </IconButton>
              </div>
            </div>
          ))}
          <div className="flex gap-x-4 !mt-10">
            <Button
              type="button"
              onClick={() => append({ name: "", type: "text" })}
            >
              Add Field
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
