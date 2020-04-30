![](https://img.shields.io/badge/Foundry-v0.5.5-informational)
## LumenVision

* **Author**: MisterHims, Foundry VTT Community
* **Version**: 1.0.1
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [Minor Quality of Life](https://gitlab.com/tposney/minor-qol/tree/master), [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

### Description
LumenVision est une collection de macros permettant d'initialiser rapidement la vision et/ou lumière issue d'un token ou d'un objet. Elle permet également la consommation automatique de ressources (bougies, flasques d'huile, etc.). Elle est en partie issue de la communauté Foundry VTT et a par la suite été traduite en français, modifiée puis convertie au système métrique européen.

## Collection de Macros

### LV-Initialiser
Permet de rapidement définir un type de vision et une source de lumière utilisée pour un ou plusieurs tokens actuellement sélectionnés. Une notification apparaît si aucun token n'est sélectionné. Un exemple avec les différentes sources de lumières disponibles :

![alt text](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/images/dem_01.gif)

### LV-Bougie
Permet d'utiliser une Bougie dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix entre l'allumer ou l'éteindre. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de Bougie(s) restante(s).

### LV-Lampe
Permet d'utiliser une Lampe dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix entre l'allumer ou l'éteindre. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

### LV-Lanterne-a-capote
Permet d'utiliser une Lanterne à capote dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix d'éteindre ou d'allumer la lanterne à lumière vive ou lumière forte, ce qui néccesite alors 1 Huile. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

![alt text](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/images/dem_02.gif)

### LV-Lanterne-de-revelation
Permet d'utiliser une Lanterne de révélation dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix d'allumer la lanterne de deux façons différentes - à lumière vive ou à lumière forte - dont chacune de ces actions néccesitent 1 Huile ou bien de l'éteindre. Un message apparaît également dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

### LV-Lanterne-sourde
Permet d'utiliser une Lanterne sourde dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix d'éteindre ou d'allumer la lanterne à lumière vive ou lumière forte, ce qui néccesite alors 1 Huile. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

### LV-Torche

Permet d'utiliser une Torche Lanterne sourde dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix entre l'allumer, l'éteindre ou ne rien faire. Un message apparaît également dans la fenêtre de chat vous permettant d'utiliser l'action qui est associée à l'objet.

## Installation
1. Accédez à la [Collection](https://github.com/MisterHims/FoundryVTT/tree/master/ScriptMacros/LumenVision/FR/Collection) et copiez la macro de votre choix.
2. Allez sur Foundry VTT, puis cliquez sur un des boutons de la barre de macros afin d'en créer une nouvelle.
3. Sélectionnez "Script" comme type de macro utilisé
4. Collez alors le code précédement copié dans la zone prévue à cet effet
5. Répetez l'opération pour les macros que vous souhaitez installés

Attention à bien vérifier le nom de votre objet "Huile". Si vous avez par exemple utilisé le compendium AideDD Items pour ajouter ces flasques d'huile, renommez l'objet en "Huile". Vérifiez également la valeur Quantité sur la fiche de l'objet.

## Améliorations à venir

* Création de la collection sous forme de modules, permettant l'ajout automatique de toute la collection LumenVision dans un compendium unique.
