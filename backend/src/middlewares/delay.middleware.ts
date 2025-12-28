export function delayMiddleware(ms = 1000) {
  return async (ctx: any, next: () => Promise<void>) => {
    if (process.env.NODE_ENV === "development") {
      await new Promise(resolve => setTimeout(resolve, ms));
    }
    await next();
  };
}
