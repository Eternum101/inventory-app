
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
  
    const category = await Category.findOneAndUpdate(categoryDetail, categoryDetail, { upsert: true, new: true });
  
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
  
    const item = await Item.findOneAndUpdate(itemDetail, itemDetail, { upsert: true, new: true });
  
    items[index] = item;
    console.log(`Added item: ${name}`);
}
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Electronics", "All kinds of electronic items", "www.example.com/electronics"),
      categoryCreate(1, "Computers", "Desktops, laptops, and accessories", "www.example.com/computers"),
      categoryCreate(2, "Software", "Operating systems and applications", "www.example.com/software"),
      categoryCreate(3, "Mobile Devices", "Smartphones, tablets, and accessories", "www.example.com/mobiledevices"),
      categoryCreate(4, "Networking Equipment", "Routers, switches, and modems", "www.example.com/networking"),
      categoryCreate(5, "Audio & Video", "TVs, projectors, speakers, and audio devices", "www.example.com/av"),
      categoryCreate(6, "Wearables", "Smartwatches and fitness trackers", "www.example.com/wearables"),
      categoryCreate(7, "Smart Home Devices", "Home automation and security devices", "www.example.com/smarthome"),
      categoryCreate(8, "Drones & Robotics", "Consumer drones and robotic devices", "www.example.com/drones-robotics")
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
      itemCreate(3,
        "iPhone 13",
        "The latest iPhone model",
        categories[3]._id,
        999,
        100,
        "www.example.com/mobiledevices/iphone13"
      ),
      itemCreate(4,
        "Netgear Router",
        "High-speed wireless router",
        categories[4]._id,
        199.99,
        50,
        "www.example.com/networking/netgearrouter"
      ),
      itemCreate(5,
        "Samsung TV",
        "4K Ultra HD Smart TV",
        categories[5]._id,
        599.99,
        25,
        "www.example.com/av/samsungtv"
      ),
      itemCreate(6,
        "Apple Watch Series 7",
        "The latest Apple Watch model",
        categories[6]._id,
        399.99,
        30,
         "www.example.com/wearables/applewatchseries7"
       ),
       itemCreate(7, 
         "Amazon Echo Dot", 
         "Smart speaker with Alexa", 
         categories[7]._id, 
         49.99, 
         100, 
         "www.example.com/smarthome/amazonechodot"
       ),
       itemCreate(8, 
         "DJI Mavic Air 2", 
         "Compact drone with high-resolution camera", 
         categories[8]._id, 
         799.99, 
         15, 
         "www.example.com/drones-robotics/djimavicair2"
       )
    ]);
}
  