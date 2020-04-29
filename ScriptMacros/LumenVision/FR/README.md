![](https://img.shields.io/badge/Foundry-v0.5.5-informational)
## LumenVision

* **Author**: MisterHims, Foundry VTT Community
* **Version**: 1.0.0
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: None

### Description
LumenVision est une collection de macros regroupée en une seule. Elle est en partie issue de la communauté Foundry VTT. Cette version a été traduite en français, modifiée puis convertie au système métrique européen. Elle permet d'initialiser rapidement la vision et/ou lumière issue d'un token ou d'un objet.

## Installation

* Accédez à la Collection et copiez la macro souhaitée
* Sur Foundry VTT, cliquez sur un des bouton de la barre de macros
* Sélectionnez le type de macro "Script"
* Collez le code précédement copié dans le champ prévu à cet effet

## Collection de Macros

### LV-Initialiser

Permet de rapidement définir un type de vision ainsi qu'une source de lumière utilisée pour un ou plusieurs tokens actuellement sélectionnés.

![alt text](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/images/01.jpg?raw=true)

![alt text](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/images/02.jpg?raw=true)

### LV-Bougie

Permet d'utiliser une Bougie dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix entre l'allumer ou l'éteindre. Un message apparaît également dans le chat indiquant le nombre de Bougie(s) restante(s).

### LV-Lampe

Permet d'utiliser une Lampe dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix entre l'allumer ou l'éteindre. Un message apparaît également dans le chat indiquant le nombre de Bougie(s) restante(s).

### LV-Lanterne-a-capote

Permet d'utiliser une Lanterne à capote dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix d'allumer la lanterne de deux façons différentes - à lumière vive ou à lumière forte -  dont chacune de ces actions néccesitent 1 Huile ou bien de l'éteindre. Un message apparaît également dans le chat indiquant le nombre de flasques d'Huile(s) restante(s).

#### Notes d'Installation

Attention à bien vérifier le nom de votre objet "Huile". Si vous avez par exemple utilisé le compendium AideDD Items pour ajouter ces flasques d'huile, renommez l'objet en "Huile". Vérifiez également la valeur Quantité sur la fiche de l'objet.

### LV-Lanterne-de-revelation

Permet d'utiliser une Lanterne de révélation dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix d'allumer la lanterne de deux façons différentes - à lumière vive ou à lumière forte - dont chacune de ces actions néccesitent 1 Huile ou bien de l'éteindre. Un message apparaît également dans le chat indiquant le nombre de flasques d'Huile(s) restante(s).

![alt text](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/images/07.jpg?raw=true)

#### Notes d'Installation

Attention à bien vérifier le nom de votre objet "Huile". Si vous avez par exemple utilisé le compendium AideDD Items pour ajouter ces flasques d'huile, renommez l'objet en "Huile". Vérifiez également la valeur Quantité sur la fiche de l'objet.

### LV-Lanterne-sourde

Permet d'utiliser une Lanterne sourde dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix entre l'allumer ou l'éteindre. Un message apparaît également dans le chat indiquant le nombre de flasques d'Huile(s) restante(s).

### LV-Torche

Permet d'utiliser une Torche Lanterne sourde dans l'inventaire du token sélectionné. Cette utilisation vous offrera le choix entre l'allumer, l'éteindre ou ne rien faire. Un message apparaît également dans le chat vous permettant d'utiliser l'action associée à l'objet.

## Problèmes connus

* L'utilisation d'un objet est possible même sans consommable(s). Néanmoins, une notification apparaît pour l'utilisateur lui indiquant qu'il ne disposait pas assez de composants.
