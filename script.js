let priceCatalog = {}

// Adds objects into priceCatalog as objects with key, itemName, price and a source if avaliable 
function populatePriceCatalog(itemName, price, source = "missing", emoji = undefined, gender = undefined) {
    
    const key = convertNameToKey(itemName)
    
    // Create an object with the desired structure
    const itemData = {
        "key": key,
        "name": itemName,
        "price": price,
        "source": source,
        "emoji": emoji,
        "gender": gender
    };
    
    // Add the item data to the priceCatalog using the provided key
    priceCatalog[key] = itemData;
}

// Define key to be itemName with all lowercase and replace whitespace with "-"

function convertNameToKey(itemName) {
    return itemName.replace(/\s+/g, '-').toLowerCase()
}

// List of items **** Put this into JSON file ****

populatePriceCatalog("Liter Letmælk", 11, "https://www.nemlig.com/dagligvarer/mejeri/maelk-floede/letmaelk", "🥛", true)
populatePriceCatalog("Citronmåne", 20, "https://www.nemlig.com/citronmaane-904031", "🍰", true)
populatePriceCatalog("Netflix Abonnement", 114, "https://www.hvadkosterdet.dk/project/hvad-koster-netflix/", "🍿", false)
populatePriceCatalog("Parkeringsbøde", 830, "https://www.q-park.dk/da/nyheder/afgiftssats-2022/", "🅿", true)
populatePriceCatalog("iPad Pro", undefined, 9999, true)
populatePriceCatalog("iPhone 14 Pro", 10499, undefined, "📱", true)
populatePriceCatalog("F-16", 14000000, undefined, "✈", false)
populatePriceCatalog("Tesla Model 3", 1185000, undefined, "⚡", true)
populatePriceCatalog("Store bededag", 4300000, undefined, "⛪", true)
populatePriceCatalog("Danmarks Radio", 3885000000, "https://www.dr.dk/om-dr/moeddr/tag-et-kig-i-drs-oekonomi-0", "📻", true)

function logPriceCatalog() {
    for (const [key, value] of Object.entries(priceCatalog)) {
        const {name, price, source, emoji, gender} = value; // Destructure the value object
        console.log(`Item Key: ${key}, Name: ${name}, Price: ${price}, Source: ${source}, Emoji: ${emoji}, Gender: ${gender}`)
    }
}

// Isert all items into a dropdown list
// Let user select items
// add Eventlistener to check when items has been chosen
// calculate difference bewteen items 


// Returns the value of an item with the given parameter
function readValue(itemKey, parameter) {
    console.log(`Reading ${parameter} of "${itemKey}" to value ${priceCatalog[itemKey][parameter]}`);
    return priceCatalog[itemKey][parameter];
}

// Returns value of price by itemKey
function readPrice(itemKey) {
    return priceCatalog[itemKey].price
}



// Formats numbers to 2 decimals **** Needs edgecase protection against values less than 0.00 ****
function formatNumber(number) {
    if (number < 0.00) {
    const maximumDecimalPlaces = 2;
    const formattedNumber = number.toFixed(maximumDecimalPlaces);
    return formattedNumber
    } else {
        return number
    }
}

// Checks gender of item and returns correct article
function article(itemKey) {
    if (readValue(itemKey, "gender") === true) {
        return "En"
    } else if (readValue(itemKey, "gender") === false) {
        return "Et"
    } else return ""    
}

// Compares and devides 2 items
function compareItems(item1,item2) {
    const value1 = readValue(convertNameToKey(item1), "price")
    const value2 = readValue(convertNameToKey(item2), "price")
    
    const itemName1 = readValue(item1,"name")
    const itemName2 = readValue(item2,"name")
        
    console.log(`${article(item1)} ${itemName1} svarer til ${formatNumber(value1/value2)} ${itemName2}`);
}

// Output: En item1 svarter til x item2. Det vil sige at en 1 koster en 1/x'ne del af en item2. En item1 koster x gange så meget som en item2.
// Game, equalize the money on the weight left side = right side

// Dropdown / Searchbox

// Function to populate both lists with items from priceCatalog
function populateLists() {
    const listContainer = document.querySelector(".list-container");

    // Create ul elements for both lists
    const ul1 = document.createElement("ul");
    const ul2 = document.createElement("ul");

    // Loop through priceCatalog and populate both lists
    Object.keys(priceCatalog).forEach(key => {
        let objectInsideObject = priceCatalog[key];

        // Create li elements for each item in both lists
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");

        // Set the li's text content to the item's name
        li1.textContent = objectInsideObject.name;
        li2.textContent = objectInsideObject.name;

        // Append the li elements to the respective ul elements
        ul1.appendChild(li1);
        ul2.appendChild(li2);
    });

    // Append both ul elements to the list container
    document.getElementById("list1").appendChild(ul1);
    document.getElementById("list2").appendChild(ul2);
}

populateLists();


// Get all list items in list1 and list2
const list1Items = document.querySelectorAll("#list1 li");
const list2Items = document.querySelectorAll("#list2 li");

let selectedItems = []
let clickedItemKey1 = ""
let clickedItemKey2 = ""


// Add click event listeners to list1 items
list1Items.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove the "selected" class from all list1 items
    list1Items.forEach((li) => {
      li.classList.remove("selected");
    });

    // Add the "selected" class to the clicked list1 item
    item.classList.add("selected");

    // Log the value of the clicked item
    const clickedItemValue1 = item.textContent;
    selectedItems[0] = clickedItemValue1

    clickedItemKey1 = convertNameToKey(selectedItems[0])

    console.log(`Clicked item value: "${clickedItemValue1}" in list 1 with an itemKey of "${clickedItemKey1}"`);

    getSelectedItemCount() === 2 ? console.log(compareItems(clickedItemKey1,clickedItemKey2)) : console.log("Two items has not been selected yet.")

});
});

// Add click event listeners to list2 items
list2Items.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove the "selected" class from all list2 items
    list2Items.forEach((li) => {
      li.classList.remove("selected");
    });

    // Add the "selected" class to the clicked list2 item
    item.classList.add("selected");

    // Log the value of the clicked item
    const clickedItemValue2 = item.textContent;
    selectedItems[1] = clickedItemValue2
    
    clickedItemKey2 = convertNameToKey(selectedItems[1])

    console.log(`Clicked item value: "${clickedItemValue2}" in list 2 with an itemKey of "${clickedItemKey2}"`);
    
    getSelectedItemCount() === 2 ? console.log(compareItems(clickedItemKey1,clickedItemKey2)) : console.log("Two items has not been selected yet.")
  });
});

function getSelectedItemCount() {
    const selectedItems = document.querySelectorAll(".selected");
    return selectedItems.length;
  }