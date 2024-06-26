"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, max = 0, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="group cursor-pointer relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={max}
      step={0.1}
      aria-label="volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[4px]">
        <RadixSlider.Range className="left-1 absolute bg-white rounded-full max-w-[calc(100%-8px)] h-full group-hover:bg-[#22c55e] after:content-[''] after:block after:absolute after:top-[-4px] after:right-[-10px] after:size-3 after:rounded-full after:bg-white" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
