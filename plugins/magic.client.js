import { Magic } from "magic-sdk";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const createMagic = (key) => {
    return typeof window != "undefined" && new Magic(key);
  };
  const magic = createMagic(`${config.public.magicPublishableKey}`);

  return {
    provide: {
      magic: magic,
    },
  };
});
