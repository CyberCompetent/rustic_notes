#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")] // DO NOT REMOVE

mod database;     // Imports database.rs so the database can be initialised
mod insert_data;  // Imports insert_data.rs to insert test records
mod fetch_data;   // Imports fetch_data.rs to retrieve and display data

use rustic_notes_lib;

fn main() {
    // Initialise the database connection
    match database::init_db() {
        Ok(conn) => {
            println!("Database initialised successfully.");

            // Insert test data
            match insert_data::insert_test_data(&conn) {
                Ok(_) => println!("Test data inserted successfully."),
                Err(e) => eprintln!("Failed to insert test data: {}", e),
            }

            // Fetch and print data to the terminal
            match fetch_data::fetch_and_display_data() {
                Ok(_) => println!("Fetched data displayed above."),
                Err(e) => eprintln!("Failed to fetch data: {}", e),
            }

            // Proceed with running the app
            rustic_notes_lib::run();
        }

        Err(e) => {
            eprintln!("Failed to initialise the database: {}", e);
            // Exit or handle the failure gracefully
        }
    }
}