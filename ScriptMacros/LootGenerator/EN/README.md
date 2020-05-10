# LOOT Generator macro #

This Macro can be used to generate random loot using tables with some additional syntax available to support random rolls on multiple tables at once.
I started the project to be able to roll on "Treasure Hoard" Tables from the DMG but will expand to support more use cases.

## Features ##

* Roll on multiple tables with roll formulas
* Auto create a loot actor to store generated loot
* Auto roll random spells when a scroll is selected as loot
* A table can specify multiple currencies to always award in the table description

### Requirements ###

* Strongly suggest to use loot sheet NPC (https://github.com/jopeek/fvtt-loot-sheet-npc-5e)
* I am using The furnace (https://github.com/kakaroto/fvtt-module-furnace) for advanced macro. it might not be needed but I have not tested it without.

### How do I set it up? ###

1. Copy the loot-generator.js macro in your game
2. Create a template Loot sheet. if you have Loot sheet NPC, create a new actor -> npc and then change the sheet to the Lootsheet
3. Have the main RollTable to generate your loot

![loot-generator-1](ScriptMacros\LootGenerator\EN\img\loot-generator-1.png)

* In the Table Description you can add some currency that will always be awarded when generating the loot. The schema is, as shown in the image above: `|` to divide currencies; a roll formula and the currency type in `()`
* You can setup your table to roll random dices on multiple other tables. Just set an entry as text and use the following syntax

```
2d6 [10 gp gemstones] | Roll 1d6 times on [Magic Item Table A].
```
* `|` divides rolls in different tables
* 2d6 or any other valid roll, will roll that amount on the table provided
* in square braket the name of the table to be rolled
* the above example line will roll 2d6 on a table named "10 gp gemstones" and then another 1d6 on a table named "Magic Item Table A"

4. Have some additional rolltables setup if needed (the one that are references by the main rolltable).
Here an example of "Magic Item Table A", loot table entries can contain link to compendium items, items or text

![loot-generator-4](/img/loot-generator-4.png)

5. Execute the macro.
	* In Table Name, put the name of the main rolltable, as per step 3.
	* In Loot Sheet Template put the name of the npc actor loot sheet, as per step 2.
	* New Loot Name can be any name you like, this will be the name of the loot actor that will be created by the script. It will be created in the same folder as the template sheet.
	* Click generate loot
	
![loot-generator-2](/img/loot-generator-2.png)
	
6. A new npc actor will be created containing random loot generated using the provided table

It might look something like this:

![loot-generator-3](/img/loot-generator-3.png)

### Roll Random Spells for scrolls ###

In the loot generator view you can select a compendium to use to randomly pick spells (default is set to dnd5e.spells)
When a loot scroll is found with the syntax "Spell Scroll Cantrip Level", "Spell Scroll 1st Level", ... a random spell is picked for the scroll and the loot is generated as shown in the image below

![loot-generator-5](/img/loot-generator-5.png)

### Contacts ###

* Ultrakorne#6240 on discord