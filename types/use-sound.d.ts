declare module "use-sound" {
  type Options = {
    volume?: number;
    onplay?: () => void;
    onend?: () => void;
    onpause?: () => void;
    format?: string[];
    preload?: boolean;
  };

  type ReturnedValue = [
    () => void,
    {
      pause: () => void;
      sound: {
        on: (event: string, callback: () => void) => void;
        play: () => void;
        pause: () => void;
        seek: (time?: number) => number;
        duration: () => number;
        unload: () => void;
      };
    }
  ];

  function useSound(url: string, options?: Options): ReturnedValue;

  export default useSound;
}
