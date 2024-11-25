"use client";

import { cn } from "@/utils/tailwind-merge";
import * as React from "react";
import { PiCaretCircleRight, PiCaretUpDownBold, PiCheckBold } from "react-icons/pi";
import { Button } from "./button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const inputExtension = [
  { value: "jpg", label: "JPG" },
  { value: "JPEG", label: "JPEG" },
  { value: "png", label: "PNG" }
];

type ComboboxChildrenProps = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setComboboxState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ComboboxFormat() {
  const [inputOpen, setInputOpen] = React.useState(false);
  const [outputOpen, setOutputOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [outputValue, setOutputValue] = React.useState("");

  return (
    <div className="mb-8 flex gap-2 items-center justify-center">
      <Popover open={inputOpen} onOpenChange={setInputOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={inputOpen} className="w-[200px] justify-between">
            {inputValue
              ? inputExtension.find(framework => framework.value === inputValue)?.label
              : "Select extension..."}
            <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <InputExtension setComboboxState={setInputOpen} setState={setInputValue} state={inputValue} />
      </Popover>

      <PiCaretCircleRight className="text-accent-9" />

      <Popover open={outputOpen} onOpenChange={setOutputOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={outputOpen} className="w-[200px] justify-between">
            {outputValue
              ? inputExtension.find(framework => framework.value === outputValue)?.label
              : "Select extension..."}
            <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <OutputExtension setComboboxState={setOutputOpen} setState={setOutputValue} state={outputValue} />
      </Popover>
    </div>
  );
}

function InputExtension({ setState, state, setComboboxState }: ComboboxChildrenProps) {
  return (
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Search extension..." />
        <CommandList>
          <CommandEmpty>No extension found.</CommandEmpty>
          <CommandGroup>
            {inputExtension.map(framework => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={currentValue => {
                  setState(currentValue === state ? "" : currentValue);
                  setComboboxState(false);
                }}
              >
                <PiCheckBold className={cn("mr-2 h-4 w-4", state === framework.value ? "opacity-100" : "opacity-0")} />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
}

function OutputExtension({ setState, state, setComboboxState }: ComboboxChildrenProps) {
  return (
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Search extension..." />
        <CommandList>
          <CommandEmpty>No extension found.</CommandEmpty>
          <CommandGroup>
            {inputExtension.map(framework => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={currentValue => {
                  setState(currentValue === state ? "" : currentValue);
                  setComboboxState(false);
                }}
              >
                <PiCheckBold className={cn("mr-2 h-4 w-4", state === framework.value ? "opacity-100" : "opacity-0")} />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
}
