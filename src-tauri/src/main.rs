#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")] // DO NOT REMOVE

mod commands;   // Imports fetch_data.rs to retrieve and display data
mod database;     // Imports database.rs so the database can be initialised
mod fetch_data;

use tauri::Builder; // Import the Builder for the Tauri app

fn main() {
    // Initialise the database connection
    match database::init_db() {
        Ok(_) => {
            println!("Database initialised successfully.");

            // Start the Tauri app with the new `create_workspace` command
            Builder::default()
            .invoke_handler(tauri::generate_handler![commands::create_workspace::create_workspace])
                .run(tauri::generate_context!())
                .expect("error while running tauri application");

        }

        Err(e) => {
            eprintln!("Failed to initialise the database: {}", e);
            // Exit or handle the failure gracefully
        }
    }
}