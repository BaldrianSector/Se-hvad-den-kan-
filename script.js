// TO DO LIST:

 /* Hover on button before click 
 mand som taster på sit tastatur
 write text on typewriter effect
 flertal?
 loading prikker
 sound of clicks
 add link to ref */

// Hook for DOM

const textEl = document.querySelector("#text-el")
const manEl = document.querySelector("#man-el")

manEl.src = "./img/man-sitting.png"

// Initialise priceCatalog

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
populatePriceCatalog("iPad Pro", 9999, undefined, undefined, true)
populatePriceCatalog("iPhone 14 Pro", 10499, undefined, "📱", true)
populatePriceCatalog("Spids af en jetjager", 16000, "https://hvadkoster.dk/hvad-koster-spidsen-af-en-jetjager/", "🛩️", true)
populatePriceCatalog("Tesla Model 3", 1185000, undefined, "⚡", true)
populatePriceCatalog("Bondegård", 2500000, "https://hvadkoster.dk/hvad-koster-en-bondegaard/", "🚜", true)
populatePriceCatalog("F-16 fly", 14000000, undefined, "✈", false)
populatePriceCatalog("Store bededag", 3000000000, undefined, "⛪", true)
populatePriceCatalog("Danmarks Radio", 3885000000, "https://www.dr.dk/om-dr/moeddr/tag-et-kig-i-drs-oekonomi-0", "📻", true)

function logPriceCatalog() {
    for (const [key, value] of Object.entries(priceCatalog)) {
        const {name, price, source, emoji, gender} = value; // Destructure the value object
        console.log(`Item Key: ${key}, Name: ${name}, Price: ${price}, Source: ${source}, Emoji: ${emoji}, Gender: ${gender}`)
    }
}

// Returns the value of an item with the given parameter
function readValue(itemKey, parameter) {
    console.log(`Reading ${parameter} of "${itemKey}" to value ${priceCatalog[itemKey][parameter]}`);
    return priceCatalog[itemKey][parameter];
}

// Returns value of price by itemKey
function readPrice(itemKey) {
    return priceCatalog[itemKey].price
}



// Formats numbers with dots for readability and commas as separators for decimal numbers
function formatNumber(number) {
    if (number > 0.01) {
        const formattedNumber = number.toLocaleString('da-DK', {
            minimumFractionDigits: 2, // Always show at least 2 decimal places
            maximumFractionDigits: 2, // Show a maximum of 2 decimal places
            useGrouping: true, // Use grouping separators (commas)
        });
        return formattedNumber;
    } else {
        return number.toLocaleString('da-DK', { maximumFractionDigits: 20 }); // Format smaller numbers without decimals to return the full number
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

// Compares and divides 2 items
function compareItems(item1, item2) {
    const value1 = readValue(convertNameToKey(item1), "price");
    const value2 = readValue(convertNameToKey(item2), "price");
    
    const itemName1 = readValue(item1,"name");
    const itemName2 = readValue(item2,"name");

    const link1 = readValue(item1,"source");
    const link2 = readValue(item2,"source");
    
    // Clear the previous comparisonResult
    comparisonResult = "";
    
    console.log(`${article(item1)} ${itemName1} svarer til ${formatNumber(value1/value2)} ${itemName2}`);

    // Build the new comparisonResult
    comparisonResult = (`${article(item1)} ${itemName1} svarer til ${formatNumber(value1/value2)} ${itemName2} * \n Det betyder at ${article(item2).toLowerCase()} ${itemName2} svarer til ${formatNumber(value2/value1)} ${itemName1} *`);
    
    // Call the typeWriter function to display the comparisonResult with a typing effect
    typeWriter(comparisonResult, link1, link2);
    
    return "compareItems() has been completed";
}

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

let comparisonResult = ""

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

// Function to display text with a loading animation and typing effect
function typeWriter(text, link1, link2) {
    let i = 0;

    const speed = 65; // Typing speed in milliseconds
    const loadingDelay = 500; // Delay before typing starts in milliseconds

    let typingTimeout; // Store the timeout ID
    let asteriskCounter = 0; // Declare asteriskCounter outside of typeCharacter

    function typeCharacter() {
        if (i < text.length) {
            
            let character = text.charAt(i);
            
            // Handle special characters
            if (character === "*" && asteriskCounter === 0) {
                
                // If the character is "*" and asteriskCounter is 0 and link2 is not missing
                link2 !== "missing" ? character = `<a href="${link2}" target="_blank">*</a>`: character = ""
                asteriskCounter++
            } else if (character === "*" && asteriskCounter === 1) {

                // If the character is "*" and asteriskCounter is 1 and link1 is not missing
                link1 !== "missing" ? character = `<a href="${link1}" target="_blank">*</a>`: character = ""
            } 
            if (character === "\n") {
                // If the character is a newline, add a line break
                character = `<br>`;
            }
            // Append the new character to the existing content
            document.getElementById("text-el").innerHTML += character;
            i++;
            typingTimeout = setTimeout(typeCharacter, speed);
        }
    }

    // Clear the previous text
    function clearPreviousText() {
        document.getElementById("text-el").innerHTML = "";
    }

    clearPreviousText();

    // Display loading animation with three dots
    document.getElementById("text-el").innerHTML = "";
    setTimeout(() => {
        document.getElementById("text-el").innerHTML = ".";
    }, 600);
    setTimeout(() => {
        document.getElementById("text-el").innerHTML = "..";
    }, 1200);
    setTimeout(() => {
        document.getElementById("text-el").innerHTML = "...";

        // Start typing animation after the loading delay
        setTimeout(() => {
            clearPreviousText(); // Clear the previous text one more time
            typeCharacter(); // Start typing animation
        }, loadingDelay);
    }, 1800);
}