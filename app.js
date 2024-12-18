let energy = 0;
let energyPerSec = 0;
let energyPerClick = 1;
let idleIncomeMultiplier = 0.1;
let btn = document.getElementById("clickButton");
let energyE = document.getElementById("energy");
let energyPerSecE = document.getElementById("eps");
let energyPerClickE = document.getElementById("epc");
let upgradeBtn = document.getElementById("upgrades");
let popup = document.getElementById("popup");
let popupClose = document.getElementById("popup-close");
let upgradeBtns = document.querySelectorAll(".upgrade-btn");
let up1 = document.getElementById("up1");
let up2 = document.getElementById("up2");
let up3 = document.getElementById("up3");
let progress = localStorage.getItem("atomic-survival-progress");
let goldAtomE = document.getElementById("gold-atom");
let resetBtn = document.getElementById("reset");
let maxAmount = [10, 30, 10];
let priceGrowthRates = [1.6, 1.2, 2];
let initialPrices = [200, 1000, 5000];

if (progress) {
  let savedArray = progress.split(",");
  let loadGameTime = new Date().getTime();
  let saveGameTime = parseInt(savedArray[0]);
  let timeDifference = loadGameTime - saveGameTime;
  let secondDifference = timeDifference / 1000;
  energy = parseInt(savedArray[1]);
  energyPerSec = parseFloat(savedArray[2]);
  energyPerClick = parseInt(savedArray[3]);
  if (savedArray[4] !== "Max") {
    up1.innerHTML = parseInt(savedArray[4]);
  } else {
    up1.innerHTML = "Max";
    up1.style.backgroundColor = "black";
    up1.style.cursor = "default";
  }
  if (savedArray[5] !== "Max") {
    up2.innerHTML = parseInt(savedArray[5]);
  } else {
    up2.innerHTML = "Max";
    up2.style.backgroundColor = "black";
    up2.style.cursor = "default";
  }
  if (savedArray[6] !== "Max") {
    up3.innerHTML = parseInt(savedArray[6]);
  } else {
    up3.innerHTML = "Max";
    up3.style.backgroundColor = "black";
    up3.style.cursor = "default";
  }
  idleIncomeMultiplier = parseFloat(savedArray[7]);
  let totalIdleIncome = Math.floor(
    secondDifference * energyPerSec * idleIncomeMultiplier
  );
  energy += totalIdleIncome;
  energyE.innerHTML = `Energy: ${Math.floor(energy)}`;
  energyPerClickE.innerHTML = `Energy/click: ${Math.floor(energyPerClick)}`;
  alert(`While you were away, you earned ${totalIdleIncome} new energy!`);
}

up1.addEventListener("click", () => {
  if (energy >= up1.innerHTML) {
    energy -= up1.innerHTML;
    up1.innerHTML = Math.floor(priceGrowthRates[0] * up1.innerHTML);
    energyPerClick++;
    energyPerClickE.innerHTML = `Energy/click: ${energyPerClick}`;
    checkUpgradable();
    checkMax(up1, 0);
  }
});

up2.addEventListener("click", () => {
  if (energy >= up2.innerHTML) {
    energy -= up2.innerHTML;
    up2.innerHTML = Math.floor(priceGrowthRates[1] * up2.innerHTML);
    energyPerSec++;
    energyPerSecE.innerHTML = `Energy/sec: ${energyPerSec}`;
  }
  checkUpgradable();
  checkMax(up2, 1);
});

up3.addEventListener("click", () => {
  if (energy >= up3.innerHTML) {
    energy -= up3.innerHTML;
    up3.innerHTML *= priceGrowthRates[2];
    idleIncomeMultiplier += 0.1;
  }
  checkUpgradable();
  checkMax(up3, 2);
});

btn.addEventListener("mousedown", function () {
  btn.style.transform = "translate(1px, 1px)";
  btn.style.boxShadow = "none";
});

document.addEventListener("mouseup", function (e) {
  if (e.target === btn) {
    energy += energyPerClick;
    energyE.innerHTML = `Energy: ${Math.floor(energy)}`;
    btn.style.transform = "translate(0px, 0px)";
    btn.style.boxShadow = "3px 3px 5px green";
  } else {
    if ((btn.style.transform = "translate(-1px, -1px)")) {
      btn.style.transform = "translate(0px, 0px)";
      btn.style.boxShadow = "3px 3px 5px green";
    }
  }
});

upgradeBtn.addEventListener("click", () => {
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-drop") || e.target === popupClose) {
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  }
});

resetBtn.addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to reset your progress on Atomic Survival? This is NOT a prestige and will wipe everything from the game!"
    )
  ) {
    clearInterval(progressSaving);
    localStorage.removeItem("atomic-survival-progress");
    window.location.reload();
  }
});

function newEnergy() {
  energy += energyPerSec;
  energyPerSecE.innerHTML = `Energy/sec: ${energyPerSec.toFixed(1)}`;
  energyE.innerHTML = `Energy: ${Math.floor(energy)}`;
  checkUpgradable();
}

function checkUpgradable() {
  upgradeBtns.forEach((item) => {
    if (energy >= item.innerHTML) {
      item.style.backgroundColor = "green";
    } else if (item.innerHTML !== "Max") {
      item.style.backgroundColor = "rgb(40,40,40)";
    }
  });
}

function checkMax(element, index) {
  let sum = initialPrices[index];
  for (let i = 0; i < maxAmount[index]; i++) {
    sum *= priceGrowthRates[index];
    sum = Math.floor(sum);
  }
  if (element.innerHTML - sum === 0) {
    element.innerHTML = "Max";
    element.style.backgroundColor = "black";
    element.style.cursor = "default";
  }
}

function saveProgress() {
  let time = new Date().getTime();
  let progressArray = [
    time,
    energy,
    energyPerSec,
    energyPerClick,
    up1.innerHTML,
    up2.innerHTML,
    up3.innerHTML,
    idleIncomeMultiplier,
  ];
  localStorage.setItem("atomic-survival-progress", progressArray.join(","));
}

function goldAtom() {
  let onOff = Math.round(Math.random() * 2);
  let screenWidth = window.innerWidth - 200;
  let screenHeight = window.innerHeight - 200;
  let randomWidth = Math.round(Math.random() * screenWidth) + 100;
  let randomHeight = Math.round(Math.random() * screenHeight) + 100;
  if (onOff === 0) {
    goldAtomE.style.visibility = "visible";
    goldAtomE.style.top = randomHeight + "px";
    goldAtomE.style.left = randomWidth + "px";
    let clicked = false;
    goldAtomE.onclick = () => {
      if (!clicked) {
        clicked = true;
        if (energyPerSec === 0) {
          energy += 100;
          goldAtomE.innerHTML = `Energy +100`;
        } else {
          energy += Math.floor(energyPerSec * 100);
          goldAtomE.innerHTML = `Energy +${Math.floor(energyPerSec * 100)}`;
        }
        setTimeout(() => {
          goldAtomE.style.visibility = "hidden";
          goldAtomE.innerHTML = `<img src="assets/golden-atom.png" class="gold-atom" />`;
        }, 1500);
      }
      setTimeout(() => {
        goldAtomE.style.visibility = "hidden";
      }, 2000);
    };
  }
}

let progressSaving = setInterval(saveProgress, 5000);
setInterval(newEnergy, 1000);
setInterval(goldAtom, 10000);
