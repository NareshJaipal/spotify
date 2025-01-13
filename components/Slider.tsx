"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { twMerge } from "tailwind-merge";

interface SliderProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  bufferedProgress?: number;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  value = 1,
  max = 0,
  onChange,
  bufferedProgress,
  className = "relative",
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className={twMerge(
        "group cursor-pointer flex items-center select-none touch-none w-full h-10",
        className
      )}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={max}
      step={0.1}
      aria-label="volume"
    >
      <RadixSlider.Track className="bg-neutral-700 relative grow rounded-full h-[4px]">
        {bufferedProgress != 0 && (
          <div
            className="absolute h-full bg-neutral-500 rounded-full"
            style={{ width: `${bufferedProgress}%` }}
          />
        )}
        <RadixSlider.Range className="left-1 absolute bg-white rounded-full max-w-[calc(100%-8px)] h-full group-hover:bg-[#22c55e] after:content-[''] after:block after:absolute after:top-[-4px] after:right-[-10px] after:size-3 after:rounded-full after:bg-white" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
