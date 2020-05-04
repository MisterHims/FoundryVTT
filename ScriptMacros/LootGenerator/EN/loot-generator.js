//#region MAIN
let generateLoot;
let chatHeader = "";
let chatContentString = "";
let itemToCreate = [];
let currenciesToAdd = {};

let tableName;
let lootTemplateName;
let newLootName;

new Dialog({
    title: `Loot Generator`,
    content: `
      <form>
        <div class="form-group">
          <label>Table Name</label>
          <input type="text" id="table-name" name="table-name" value="Treasure Hoard: Challenge 0—4">
        </div>
        <div class="form-group">
          <label>Loot Sheet Template</label>
          <input type="text" id="loot-template" name="loot-template" value="Loot Template">
        </div>
        <div class="form-group">
          <label>New Loot Name</label>
          <input type="text" id="loot-filename" name="loot-filename" value="New Loot">
        </div>
      </form>
      `,
    buttons: {
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: `Generate Loot`,
            callback: () => generateLoot = true
        },
        no: {
            icon: "<i class='fas fa-times'></i>",
            label: `Close`,
        },
    },
    default: "yes",
    close: async html => {
        tableName = html.find('[name="table-name"]')[0].value;
        lootTemplateName = html.find('[name="loot-template"]')[0].value;
        newLootName = html.find('[name="loot-filename"]')[0].value;

        if (generateLoot) {
            const tableEntry = rollOnTable(tableName);
            processTableEntry(tableEntry);
            const lootTemplate = game.actors.entities.find(t => t.name.toLowerCase() === lootTemplateName.toLowerCase());
            if (lootTemplate) {
                const newLoot = await lootTemplate.clone({ name: newLootName });
                for (const item of itemToCreate) {
                    await createLootItem(item, newLoot);
                }
                await addCurrencies(newLoot, currenciesToAdd);
            } else {
                ui.notifications.warn(`no loot template named ${lootTemplateName} found, Please create an npc sheet to use as a template for populating it with loot`);
            }
        }
    }
}).render(true);


/*
ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: chatHeader + chatContentString,
    type: CONST.CHAT_MESSAGE_TYPES.OTHER
});
*/

//#endregion MAIN

//add to actor (the loot npc) currencies 
async function addCurrencies(actor, currenciesToAdd) {
    let currencyData = actor.data.data.currency;
    for (var key in currenciesToAdd) {
        if (currencyData.hasOwnProperty(key)) {
            currencyData[key].value = (currencyData[key].value || 0) + currenciesToAdd[key];
        }
    }

    await actor.update({ "data.currency": currencyData });
}

//create an item holded by this lootNPC actor.
async function createLootItem(item, lootNPC) {
    if (item.compendium) { //item belongs to a compendium
        const compendium = game.packs.find(t => t.collection === item.compendium);
        let indexes = await compendium.getIndex();
        let entry = indexes.find(e => e.name.toLowerCase() === item.item.text.toLowerCase());
        const itemEntity = await compendium.getEntity(entry._id);
        await lootNPC.createOwnedItem(itemEntity.data);
    } else if (item.item) { //item is not in a compendium
        const itemEntity = game.items.entities.find(t => t.name.toLowerCase() === item.item.text.toLowerCase());
        await lootNPC.createOwnedItem(itemEntity.data);
    } else if (item.text) { //there is no item, just a text name
        let itemData = { name: item.text, type: "loot", img: "icons/svg/mystery-man.svg" };
        await lootNPC.createOwnedItem(itemData);
    }
}

function processTableEntry(tableEntry) {
    if (!tableEntry) return;

    if (tableEntry.type == 2) { //collection type
        processCollectionTableEntry(tableEntry);
        //   chatHeader += `<h3>Selected <b>1</b> item from ${tableName}</h3>`;
    } else if (tableEntry.type == 0) { //text type
        let resultText = tableEntry.text;
        let complexTextList = resultText.split("|");
        for (const complexText of complexTextList) {
            processTextTableEntry(complexText);
        }
    } else if (tableEntry.type == 1 && tableEntry.collection === "Item") { //item
        processItemTableEntry(tableEntry);
    }
}

function processCollectionTableEntry(item) {
    chatContentString += `<img src=\"${item.img}\" height="20" width="20"> @Compendium[${item.collection}.${item._id}]{${item.text}}<br>`;
    itemToCreate.push({ "compendium": item.collection, "item": item });
}

function processItemTableEntry(item) {
    chatContentString += `<img src=\"${item.img}\" height="20" width="20"> @Item[${item.text}]<br>`;
    itemToCreate.push({ "item": item });
}

function processSimpleTextEntry(text) {
    chatContentString += `${text}<br>`;
    itemToCreate.push({ "text": text });
}

function tryToRollString(textWithRollFormula) {
    try {
        return new Roll(textWithRollFormula).roll().total || 1;
    } catch (error) {
        return 1;
    }
}

//complexText is a string
function processTextTableEntry(complexText) {
    let numberItems = tryToRollString(complexText);
    const tableNameMatch = complexText.match(/\[(.*?)\]/);

    if (!tableNameMatch) {
        //no table in brakets [table] is specified, so if its text we pick that
        processSimpleTextEntry(complexText);
        return;
    }

    let tableName;
    if (tableNameMatch.length >= 2) {
        tableName = tableNameMatch[1];
    } else {
        ui.notifications.warn(`no table for complexText ${complexText} found, check that the table name is in sqaure brackets`);
        return;
    }

    for (let i = 0; i < numberItems; i++) {
        let tableEntry = rollOnTable(tableName);
        processTableEntry(tableEntry);
    }

    chatHeader += `<h3>Selected <b>${numberItems}</b> items from ${tableName}</h3>`;
}

function rollOnTable(tableName) {
    const table = game.tables.entities.find(t => t.name.toLowerCase() === tableName.toLowerCase());
    if (!table) { ui.notifications.warn(`no table named ${tableName} found, Please create a table`); return; }

    const tableDescription = table.data.description.split("|"); //using description to add gold on top of any roll 6d6*100 (cp) | 3d6*100 (sp) | 2d6*100 (gp)
    for (const currency of tableDescription) {
        const currencyMatch = currency.match(/\((.*?)\)/);
        if (currencyMatch) {
            const currencyString = currencyMatch[1];
            const amount = tryToRollString(currency);
            currenciesToAdd[currencyString] = (currenciesToAdd[currencyString] || 0) + amount;
        }
    }

    let tableTreasureRoll = table.roll();
    return tableTreasureRoll[1];
}