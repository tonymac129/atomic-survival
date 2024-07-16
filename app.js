let energy = 0;
let energyPerSec = 0;
let atoms = 0;
let atomValue = 0.5;
let atomsPerClick = 1;
let btn = document.getElementById("clickButton");
let atomsE = document.getElementById("atoms");
let energyE = document.getElementById("energy");
let energyPerSecE = document.getElementById("eps");
let atomsPerClickE = document.getElementById("apc");
let upgradeBtn = document.getElementById("upgrades");
let popup = document.getElementById("popup");
let popupClose = document.getElementById("popup-close");
let upgradeBtns = document.querySelectorAll(".upgrade-btn");
let up1 = document.getElementById("up1");
let up2 = document.getElementById("up2");
let progress = localStorage.getItem("atomic-survival-progress");

if (progress) {
  savedArray = progress.split(",");
  let loadGameTime = new Date().getTime();
  let saveGameTime = parseInt(savedArray[0]);
  let timeDifference = loadGameTime - saveGameTime;
  let secondDifference = timeDifference / 1000;
  energy = parseInt(savedArray[1]);
  energyPerSec = parseFloat(savedArray[2]);
  let totalIdleIncome = Math.floor(secondDifference * energyPerSec);
  energy += totalIdleIncome;
  alert(`While you were away, you earned ${totalIdleIncome} energy!`);
  atoms = parseInt(savedArray[3]);
  atomValue = parseFloat(savedArray[4]);
  atomsPerClick = parseInt(savedArray[5]);
  up1.innerHTML = parseInt(savedArray[6]);
  up2.innerHTML = parseInt(savedArray[7]);
  atomsPerClickE.innerHTML = `Atoms/click: ${atomsPerClick}`;
  energyPerSecE.innerHTML = `Energy/sec: ${energyPerSec.toFixed(1)}`;
  energyE.innerHTML = `Energy: ${Math.floor(energy)}`;
  atomsE.innerHTML = `Atoms: ${atoms}`;
  if (atomsPerClick > 1) {
    btn.innerHTML = `<img src="assets/atom.svg" />Get Atoms`;
  }
}

up1.addEventListener("click", () => {
  if (energy >= up1.innerHTML) {
    energy -= up1.innerHTML;
    up1.innerHTML *= 5;
    energyPerSec += (atoms * 0.1) / 2;
    atomValue *= 1.1;
  }
  checkUpgradable();
});

up2.addEventListener("click", () => {
  if (energy >= up2.innerHTML) {
    energy -= up2.innerHTML;
    up2.innerHTML *= 5;
    atomsPerClick++;
    btn.innerHTML = `<img src="assets/atom.svg" />Get Atoms`;
  }
  checkUpgradable();
});

document.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    btn.style.transform = "translate(1px, 1px)";
    btn.style.boxShadow = "none";
  }
});
document.addEventListener("keyup", function (e) {
  if (e.key === " ") {
    newAtom();
    btn.style.transform = "translate(0px, 0px)";
    btn.style.boxShadow = "3px 3px 5px green";
  }
});
btn.addEventListener("mousedown", function () {
  btn.style.transform = "translate(1px, 1px)";
  btn.style.boxShadow = "none";
});
document.addEventListener("mouseup", function (e) {
  if (e.target === btn) {
    newAtom();
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

function newAtom() {
  atoms += atomsPerClick;
  energyPerSec += atomValue * atomsPerClick;
  atomsE.innerHTML = `Atoms: ${atoms}`;
}

function newEnergy() {
  energy += energyPerSec;
  atomsPerClickE.innerHTML = `Atoms/click: ${atomsPerClick}`;
  energyPerSecE.innerHTML = `Energy/sec: ${energyPerSec.toFixed(1)}`;
  energyE.innerHTML = `Energy: ${Math.floor(energy)}`;
  checkUpgradable();
}

function checkUpgradable() {
  upgradeBtns.forEach((item) => {
    if (energy >= item.innerHTML) {
      item.style.backgroundColor = "green";
    } else {
      item.style.backgroundColor = "rgb(40,40,40)";
    }
  });
}

function saveProgress() {
  let time = new Date().getTime();
  let progressArray = [
    time,
    energy,
    energyPerSec,
    atoms,
    atomValue,
    atomsPerClick,
    up1.innerHTML,
    up2.innerHTML,
  ];
  localStorage.setItem("atomic-survival-progress", progressArray.join(","));
}

setInterval(newEnergy, 1000);
setInterval(saveProgress, 1000);
