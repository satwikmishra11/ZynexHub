use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

async fn login(data: web::Json<LoginRequest>) -> impl Responder {
    // Perform validation here (e.g., database query)
    if data.username == "user" && data.password == "password" {
        HttpResponse::Ok().json({"status": "success"})
    } else {
        HttpResponse::Unauthorized().json({"status": "fail"})
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/login", web::post().to(login))
    })
    .bind("127.0.0.1:5003")?
    .run()
    .await
}
