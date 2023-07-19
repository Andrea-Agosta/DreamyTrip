export = async () => {
  if ((global as any).environment) {
    await (global as any).environment.down();
  }
};