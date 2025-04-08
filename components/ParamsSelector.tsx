import { Radio, RadioGroup } from "@headlessui/react";

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
  range: string;
  handleSetRange: (range: string) => void;
}

export default function ParamsSelector({ range, handleSetRange }: ParamsSelectorProps) {
  return (
    <div className="flex flex-row gap-x-4">
      <span className="font-semibold text-6xl py-10">Time Range</span>
      <RadioGroup value={range} onChange={(e) => handleSetRange(e)} aria-label="Time Range" className="flex flex-row gap-x-4 items-center">
        {ranges.map((range) => (
          <Radio
            key={range.term}
            value={range.term}
            className="flex cursor-pointer rounded-lg bg-white/5 justify-center py-4 px-5 w-60"
          >
            <p className="font-semibold text-3xl">{range.label}</p>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
