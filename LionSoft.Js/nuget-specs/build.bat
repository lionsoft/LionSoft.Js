set ProjectDir=%~1
"%ProjectDir%..\.nuget\nuget" pack "%ProjectDir%nuget-specs\Lionsoft.Js.nuspec" /OutputDirectory "%ProjectDir%nuget-packages"

