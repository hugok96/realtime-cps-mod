# realtime-cps-mod
A simple mod for the steam version of Cookie Clicker that adds a "realtime cookies per second" counter. This allows you to see how much your own clicking contributes to the CPS.

![example](https://github.com/hugomgwtf/realtime-cps-mod/blob/main/example.png?raw=true)

# How to use
Download the code and copy the files main.js, info.txt and thumbnail.png into the folder `<steam>\SteamApps\common\Cookie Clicker\resources\app\mods\local\realtimeCpsMod`.
You should then be able to active the mod in-game at Options -> Mods -> Manage mods. Note: You'll have to click the button "Restart with new changes" for the mod to take effect.

# What it does
Every 333 miliseconds the mod keeps track of what the current cookie count is. On the next tick it will then compare this to the current count and calculate how many cookies per second were created.