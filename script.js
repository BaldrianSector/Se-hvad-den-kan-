let priceCatalog = {}

// Adds objects into priceCatalog as objects with key, itemName, price and a source if avaliable 
function populatePriceCatalog(itemName, price, source = "missing", emoji = undefined, gender = undefined) {
    
    // Define key to be itemName with all lowercase and replace whitespace with "-"
    const key = itemName.replace(/\s+/g, '-').toLowerCase()
 
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
        const { name, price, source, emoji, gender} = value; // Destructure the value object
        console.log(`Item Key: ${key}, Name: ${name}, Price: ${price}, Source: ${source}, Emoji: ${emoji}, Gender: ${gender}`)
    }
}

// Isert all items into a dropdown list
// Let user select items
// add Eventlistener to check when items has been chosen
// calculate difference bewteen items 


// Returns the value of an item with the given parameter
function readValue(itemKey, parameter) {
    console.log(priceCatalog[itemKey][parameter]);
    return priceCatalog[itemKey][parameter];
}

// Returns value of price
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
    const value1 = readPrice(item1)
    const value2 = readPrice(item2)

    const itemName1 = readValue(item1,"name")
    const itemName2 = readValue(item2,"name")
        
    console.log(`${article(item1)} ${itemName1} svarer til ${formatNumber(value1/value2)} ${itemName2}`);
}

compareItems("liter-letmælk", "tesla-model-3")

// Output: En item1 svarter til x item2. Det vil sige at en 1 koster en 1/x'ne del af en item2. En item1 koster x gange så meget som en item2.
// Game, equalize the money on the weight left side = right side