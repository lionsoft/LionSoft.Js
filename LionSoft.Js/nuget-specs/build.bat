set ProjectDir=%~1
"%ProjectDir%..\.nuget\nuget" pack "%ProjectDir%nuget-specs\Lionsoft.Js.nuspec" /OutputDirectory "%ProjectDir%nuget-packages"
"%ProjectDir%..\.nuget\nuget" pack "%ProjectDir%nuget-specs\LionSoft.Js.TypeScript.DefinitelyTyped.nuspec" /OutputDirectory "%ProjectDir%nuget-packages"
copy "%ProjectDir%nuget-packages\*.*" "%ProjectDir%..\..\..\.NuGet Repository" 


