// Self-Executing Anonymous Function to properly scope the mod (i.e. inaccessible in the console and to other mods)
(() => {
    const Mod = {
        /** cookie count from the previous tick */
        previousTickValue: null,
    
        /** last tick time in miliseconds  */
        previousTickTime: Date.now(),
    
        /** current calculated cps */
        currentCps: null,
    
        /** display div */
        displayElement: null,
    
        /** Target refresh rate for CPS tracker in miliseconds, acts as logic tick interval */
        updateTargetTime: 333,

		/** object which hold the data that is saved */
        saveData: {},
    
        // Runs as soon as the mod is loaded (may be before UI exists)
        init: () => {
            // Every in-mod 'tick'
            setInterval(() => {
                // Calculate delta time in miliseconds
                const time=Date.now();
                const deltaMiliseconds = time - Mod.previousTickTime;
                Mod.previousTickTime = time;
                
                // Call logic with delta
                if(deltaMiliseconds > 0)
                    Mod.onLogic(deltaMiliseconds);
            }, Mod.updateTargetTime);
    
            // Draw and initial creation hooks
            Game.registerHook('draw', Mod.onDraw);
            Game.registerHook('create', () => {
                Mod.displayElement = document.createElement('div');
                Mod.displayElement.style.fontSize = '50%';
                Mod.displayElement.style.paddingTop = '3%';
            })
            
        },
        onLogic: (deltaMiliseconds) => {
            // Calculate the CPS if this is not the first tick
            if(null !== Mod.previousTickValue)
                Mod.currentCps = (Game.cookiesd - Mod.previousTickValue) * (1000/deltaMiliseconds); // (CurrentCookies - PreviousCookies) x (1s / delta ms)
            
            // Keep track of previous' tick count
            Mod.previousTickValue = Game.cookiesd;
        },
        onDraw: () => {                
            // Set text content and append tracker
            if(null === Mod.currentCps) 
				return;
			
			Mod.displayElement.textContent = "realtime cps: " + Beautify(Mod.currentCps);                 
            l('cookies').append(Mod.displayElement);
        },
        save: () => JSON.stringify(Mod.saveData),
        load: (str) => {
            Mod.saveData = str === '' ? {initialLaunch: true} : JSON.parse(str);
            
            if(false !== Mod.saveData?.initialLaunch) {
                Game.Notify("Realtime CPS enabled!","Measuring is knowing!",[1,33]); // Game.Notify(title: string, subtitle: string, spriteIndex: [x, y])
                Mod.saveData.initialLaunch = false;
            }
        },
    };
    
    Game.registerMod("hugomgwtf_realtime_cps", Mod);
})();