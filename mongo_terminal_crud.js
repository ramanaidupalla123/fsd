const { MongoClient } = require("mongodb");
const readline = require("readline-sync");

// 🔗 Your MongoDB Atlas connection string
const url = "mongodb+srv://ramanaidu:ramanaidu_palla_143@fsdlab.k5hhtm7.mongodb.net/?appName=FSDLAB";
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("college");          // Database name
    const col = db.collection("students");    // Collection name

    let choice;

    do {
      console.log("\n===== STUDENT CRUD MENU =====");
      console.log("1. Add Student");
      console.log("2. View All Students");
      console.log("3. Update Student Age");
      console.log("4. Delete Student");
      console.log("5. Exit");
      choice = readline.question("Enter your choice (1-5): ");

      switch (choice) {
        case "1":
          // CREATE
          const name = readline.question("Enter student name: ");
          const age = parseInt(readline.question("Enter age: "));
          const course = readline.question("Enter course: ");
          await col.insertOne({ name, age, course });
          console.log("✅ Student added successfully!");
          break;

        case "2":
          // READ
          const students = await col.find().toArray();
          if (students.length === 0) {
            console.log("❌ No students found.");
          } else {
            console.log("\n📘 Student Records:");
            console.table(students);
          }
          break;

        case "3":
          // UPDATE
          const upName = readline.question("Enter student name to update: ");
          const newAge = parseInt(readline.question("Enter new age: "));
          const updateResult = await col.updateOne(
            { name: upName },
            { $set: { age: newAge } }
          );
          if (updateResult.matchedCount === 0)
            console.log("⚠️ No student found with that name.");
          else
            console.log("✏️ Student age updated successfully!");
          break;

        case "4":
          // DELETE
          const delName = readline.question("Enter student name to delete: ");
          const delResult = await col.deleteOne({ name: delName });
          if (delResult.deletedCount === 0)
            console.log("⚠️ No student found with that name.");
          else
            console.log("🗑️ Student deleted successfully!");
          break;

        case "5":
          console.log("👋 Exiting program...");
          break;

        default:
          console.log("❌ Invalid choice. Please enter 1–5.");
      }

    } while (choice !== "5");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

main();

save file as mongo_terminal_crud.js
            
to run this code open vs code and check this commands 

node -v
npm -v
npm init -y
npm install mongodb
npm install mongodb readline-sync
node mongo_terminal_crud.js
