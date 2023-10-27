
// Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const { Item } = require("./models/items");
  const { Category }= require("./models/category");
  
  const items = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function categoryCreate(index, name, description, url) {
    const categoryDetail = { name: name, description: description, url: url };
  
    const category = new Category(categoryDetail);
  
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(index, name, description, category, price, numberInStock, url) {
    const itemDetail = {
      name: name,
      description: description,
      category: category,
      price: price,
      numberInStock: numberInStock,
      url: url
    };
  
    const item = new Item(itemDetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Electronics", "All kinds of electronic items", "www.example.com/electronics"),
      categoryCreate(1, "Computers", "Desktops, laptops, and accessories", "www.example.com/computers"),
      categoryCreate(2, "Software", "Operating systems and applications", "www.example.com/software"),
      // Add more categories here...
    ]);
}

async function createItems() {
    console.log("Adding items");
    await Promise.all([
      itemCreate(0,
        "Laptop",
        "A high quality laptop",
        categories[0]._id,
        1200,
        50,
        "www.example.com/electronics/laptop"
      ),
      itemCreate(1,
        "Desktop",
        "A powerful desktop computer",
        categories[1]._id,
        1500,
        30,
        "www.example.com/computers/desktop"
      ),
      itemCreate(2,
        "Windows 10",
        "The latest version of Microsoft's operating system",
        categories[2]._id,
        200,
        100,
        "www.example.com/software/windows10"
      ),
      // Add more items here...
    ]);
}
  