# Runs every time a package is installed in a project

param($installPath, $toolsPath, $package, $project)
. (Join-Path $toolsPath common.ps1)

Group-Files '/Scripts/LionSoft.Js/LionSoft.Js-0.1.1.ts'
Group-Files '/Scripts/LionSoft.Js/js.net-0.1.1/js.net.string.js' ('string.format-1.0.js')
