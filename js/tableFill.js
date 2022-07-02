import { player } from "./module/player.js";

//localStorage.removeItem("fruitCount");

const enemies = [
    { name: "Nagibator2000", fruitCount: 400 },
    { name: "LusterBunny", fruitCount: 300 },
    { name: "BBGun", fruitCount: 150 },
    { name: "RumpleThump", fruitCount: 65 },
    { name: "PowerGrab", fruitCount: 34 },
    { name: "Demonologist", fruitCount: 32 },
    { name: "Dreadlight", fruitCount: 28 },
    { name: "Daybreak", fruitCount: 15 },
    { name: "John", fruitCount: 5 }]

player.fruitCount = localStorage.getItem("fruitCount") == null ? 0 : localStorage.getItem("fruitCount");

enemies.push({ name: player.name, fruitCount: player.fruitCount });
enemies.sort((a, b) => { return a.fruitCount - b.fruitCount }).reverse();

const table = document.querySelector("#enemy");


enemies.forEach(enemy => {
    let row = table.insertRow();

    let item = row.insertCell(0);
    if (enemy.name == "YOU")
        row.children[0].style.color = "darkgreen";
    item.innerHTML = enemy.name;

    item = row.insertCell(1);
    item.innerHTML = enemy.fruitCount;
});