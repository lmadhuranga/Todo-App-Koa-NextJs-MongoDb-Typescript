export default async function errorMiddleware(ctx: any, next: any) {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
  }
}
