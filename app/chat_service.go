// chat_service.go
package main

import (
    "log"
    "net/http"
    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool { return true },
}

func handleChat(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    defer conn.Close()

    for {
        _, message, err := conn.ReadMessage()
        if err != nil {
            log.Println("Read error:", err)
            break
        }
        log.Printf("Received: %s", message)
        // Echo message back to client
        conn.WriteMessage(websocket.TextMessage, message)
    }
}

func main() {
    http.HandleFunc("/ws", handleChat)
    log.Fatal(http.ListenAndServe(":5002", nil))
}
