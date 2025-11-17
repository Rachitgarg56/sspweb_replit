export {};

declare global {
  interface Window {
    Sanscript: {
      t: (text: string, from: string, to: string) => string;
    };
  }
}