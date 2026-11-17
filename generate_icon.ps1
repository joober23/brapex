Add-Type -AssemblyName System.Drawing

$logoPath = Resolve-Path "public\brapex-logo.png"
$outputPath = Join-Path (Get-Location) "public\app-icon.png"

$logo = [System.Drawing.Image]::FromFile($logoPath.Path)

function Generate-Icon([int]$targetSize, [string]$destPath) {
    $bmp = New-Object System.Drawing.Bitmap $targetSize, $targetSize
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)

    $padding = [int]($targetSize * 0.12)
    $maxW = $targetSize - ($padding * 2)
    $maxH = $targetSize - ($padding * 2)
    $scale = [Math]::Min($maxW / $logo.Width, $maxH / $logo.Height)
    $destW = [int]($logo.Width * $scale)
    $destH = [int]($logo.Height * $scale)
    $destX = [int](($targetSize - $destW) / 2)
    $destY = [int](($targetSize - $destH) / 2)

    $g.DrawImage($logo, $destX, $destY, $destW, $destH)
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Generate-Icon 512 $outputPath

$sizes = @{
    "mdpi" = 48
    "hdpi" = 72
    "xhdpi" = 96
    "xxhdpi" = 144
    "xxxhdpi" = 192
}

foreach ($density in $sizes.Keys) {
    $s = $sizes[$density]
    $dir = "android\app\src\main\res\mipmap-$density"
    if (Test-Path $dir) {
        Generate-Icon $s (Join-Path $dir "ic_launcher.png")
        Generate-Icon $s (Join-Path $dir "ic_launcher_round.png")
        Generate-Icon $s (Join-Path $dir "ic_launcher_foreground.png")
    }
}

$splash = "android\app\src\main\res\drawable\splash.png"
if (Test-Path "android\app\src\main\res\drawable") {
    Copy-Item $outputPath $splash -Force
}

$logo.Dispose()
Write-Output "All Android app icons updated with uncropped BRAPEX logo!"
