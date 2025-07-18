use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use serde::Deserialize;

#[derive(Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

async fn login(data: web::Json<LoginRequest>) -> impl Responder {
    // In a real app, you would validate against a database
    if data.username == "user" && data.password == "password" {
        HttpResponse::Ok().json({"status": "success"})
    } else {
        HttpResponse::Unauthorized().json({"status": "fail"})
    }
}

// This is the entry point for Vercel
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/api/auth", web::post().to(login))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
