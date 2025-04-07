import { Field, Input, Label, Radio, RadioGroup } from "@headlessui/react";

export interface Range {
  label: string;
  term: string;
}

const ranges: Range[] = [
  {
    label: "1 Month",
    term: "short_term"
  },
  {
    label: "6 Months",
    term: "medium_term"
  },
  {
    label: "1 Year",
    term: "long_term"
  }
];

interface ParamsSelectorProps {
  label: string;
  limit: number;
  range: string;
  handleSetLimit: (limit: number) => void;
  handleSetRange: (range: string) => void;
}

export default function ParamsSelector({ label, limit, range, handleSetLimit, handleSetRange }: ParamsSelectorProps) {
  return (
    <div>
      <RadioGroup value={range} onChange={(e) => handleSetRange(e)} aria-label="Server size" className="space-y-2">
        {ranges.map((range) => (
          <Radio
            key={range.term}
            value={range.term}
            className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
          >
            <div className="flex w-full items-center justify-between">
              <div className="text-sm/6">
                <p className="font-semibold text-white">{range.label}</p>
              </div>
            </div>
          </Radio>
        ))}
      </RadioGroup>
      <Field className="flex flex-row gap-x-2">
        <Label>Number of {label}</Label>
        <Input
          type="number"
          min="1"
          max="50"
          value={limit}
          onChange={(e) => handleSetLimit(Number(e.target.value))}
        />
      </Field>
    </div>
  );
}
