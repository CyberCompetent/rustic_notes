use rusqlite::{params, Connection, Result};
use crate::fetch_data;

#[tauri::command]
pub fn delete_workspace(workspace_name: String) -> Result<String, String> {
    // Open the database connection
    let conn = Connection::open("rustic_notes.db").map_err(|e| e.to_string())?;

    // Prepare the DELETE statement to remove the workspace by name
    let rows_deleted = conn.execute(
        "DELETE FROM workspaces WHERE workspace_name = ?1",
        params![workspace_name],
    )
    .map_err(|e| e.to_string())?;

    // Check if a workspace was deleted
    if rows_deleted > 0 {
        println!("Workspace '{}' deleted successfully!", workspace_name);
        if let Err(e) = fetch_data::fetch_and_display_data() {
            eprintln!("Failed to fetch and display data: {}", e);
        }
        Ok(format!("Workspace '{}' deleted successfully!", workspace_name))
    } else {
        Err(format!("Workspace '{}' not found.", workspace_name))
    }

}
