class profile {
    level = 0;
    constructor(obj){
        this.name = obj.name;
        if (obj.xp === undefined){
            this.xp = 0;
        }else {
            this.xp = obj.xp
        }
    }

    printProfile(){
        console.log("Name: " + this.name);
        console.log("XP: " + this.xp);
        console.log("Level: " + this.level);
        console.log("Progress to next level: " + this.xp + "/" + this.nextLevelXP());
    }

    nextLevelXP(){
        return 1000 + 500 * this.level;
    }

    checkLevel(){
        let levelxp = this.nextLevelXP();
        if (this.xp >= levelxp){
            this.level++;
            this.xp = this.xp - levelxp;
            console.log("Congratulations! You've leveled up to level " + this.level);
            this.checkLevel();
        }
    }

    gainXP(xp){
        this.xp += xp;
        this.checkLevel();
    }

    displayProfile(elementID, showXP = true){
        let element = document.getElementById(elementID);
        element.innerHTML = "<h2>" + this.name + "</h2>";
        element.innerHTML += "<p>Level: " + this.level + "</p>";
        if (showXP){
            element.innerHTML += "<p>XP: " + this.xp + "/" + this.nextLevelXP() + "</p>";
        }
    }
}

let profile1 = new profile({name: "Camor"});
profile1.printProfile();
profile1.gainXP(1500);
profile1.printProfile();
profile1.gainXP(2000);
profile1.printProfile();