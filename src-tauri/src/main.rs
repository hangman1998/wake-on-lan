// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod wol;
use tauri_plugin_sql::{Migration, MigrationKind};
use wol::MagicPacket;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn send_magic_packet(mac_address: &str) -> Result<(), String> {
    let mac_bytes: Vec<u8> = mac_address
        .split(':')
        .filter_map(|s| u8::from_str_radix(s, 16).ok())
        .collect();

    if mac_bytes.len() != 6 {
        return Err("Invalid MAC address".into());
    }
    let magic_packet = MagicPacket::new(&mac_bytes);

    let _ = magic_packet.send();
    return Ok(());
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, send_magic_packet])
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:main.db",
                    vec![Migration {
                        version: 1,
                        description: "create machines table",
                        sql: include_str!("./migrations/init.sql"),
                        kind: MigrationKind::Up,
                    }],
                )
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
