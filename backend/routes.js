function establishRoutes(app) {
    app.get('/', (request, response, next) => {
        response.json({ status: 200, message: "ToList API" });
    });

    
}
exports.establishRoutes = establishRoutes;