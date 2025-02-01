public static class ConfigMiddlewareExtension
{
    public static IApplicationBuilder UseConfigMiddleware(
        this IApplicationBuilder app)
    {
        return app.UseMiddleware<ConfigMiddleware>();
    }
}