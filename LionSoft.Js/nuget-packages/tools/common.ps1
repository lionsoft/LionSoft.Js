#Common helper functions

# Finds folder ProjectItem in the project
function Find-Folder($path) 
{
    $pathParts = $path.replace('\', '/').Split('/', [System.StringSplitOptions]::RemoveEmptyEntries)
    $root = $project
    foreach ($folderName in $pathParts) 
    {
        $found = '0'
        foreach ($item in $root.ProjectItems) 
        {
           if ($item.ProjectItems.Count -gt 0 -and $item.Name -eq $folderName) {
                $found = '1'
                $root = $item;
                break
           }
        }
        if ($found -eq '0') { return $null }
    }
    return $root
}

# Group several files under the defined $baseFileName
function Group-Files($baseFileName, $subFileNames) 
{
    $fileFolderProjectItem = Find-Folder ([System.IO.Path]::GetDirectoryName($baseFileName))
    $baseFileName = [System.IO.Path]::GetFileName($baseFileName)

    if ($fileFolderProjectItem -eq $null -or $baseFileName -eq $null) { return }
	if ($subFileNames -eq $null) {
		$baseFileExt = [System.IO.Path]::GetExtension($baseFileName)
		if ($baseFileExt -eq ".ts") {
		    $jsFile = [System.IO.Path]::ChangeExtension($baseFileName, ".js")
		    $jsMapFile = [System.IO.Path]::ChangeExtension($baseFileName, ".js.map")
			$subFileNames = ($jsFile, $jsMapFile);
		}
		else
		{
			return
		}
	}
    $baseFile = $fileFolderProjectItem.ProjectItems | where { $_.Name -eq $baseFileName }

    if($baseFile -eq $null) { 
        Write-Host '1: Not Found' $baseFileName 'in' $fileFolderProjectItem.Name
        return 
    }
    
    foreach ($subFileName in $subFileNames) {
        $subFile = $fileFolderProjectItem.ProjectItems | where { $_.Name -eq $subFileName }
        if($subFile -ne $null) { 
            $baseFile.ProjectItems.AddFromFile($subFile.Properties.Item("FullPath").Value)
        }
        else {
            Write-Host '2: Not Found' $subFileName 'in' $fileFolderProjectItem.Name
        }
    }
}
