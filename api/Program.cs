var builder = WebApplication.CreateBuilder(args);
builder.Services.AddServiceCollection(builder.Configuration);

var app = builder.Build();
app.Services.AddCustomService(builder.Configuration);
app.UseSwagger();
app.UseSwaggerUI();

app.UseConfigMiddleware();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToController("Index", "FallBack");

app.MapControllers();
app.UseCors("CorsPolicy");
app.Run();