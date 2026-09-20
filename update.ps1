$UTF8 = New-Object System.Text.UTF8Encoding $false
$htmlFiles = @(
    "contacto.html",
    "index.html",
    "libro-reclamaciones.html",
    "nosotros.html",
    "politica.html",
    "servicios.html",
    "trabajos.html",
    "videos.html"
)

foreach ($fileName in $htmlFiles) {
    $filePath = Join-Path "c:\Users\Usuario\Desktop\FABRINSUR GROUP\PAGINA WEB" $fileName
    if (Test-Path $filePath) {
        $content = [IO.File]::ReadAllText($filePath)
        
        # Remove nav link
        $content = $content -replace '(?m)^\s*<a class="nav__link nav__link--claims" href="libro-reclamaciones\.html".*?>Reclamaciones</a>\r?\n', ''
        
        # Remove footer link
        $content = $content -replace '(?m)^\s*<li><a href="libro-reclamaciones\.html">Libro de Reclamaciones</a></li>\r?\n', ''
        
        # Add button
        if ($content -notmatch 'claims-book-btn') {
            $btnHtml = "`r`n    <a href=`"libro-reclamaciones.html`" class=`"claims-book-btn`" title=`"Libro de Reclamaciones`" aria-label=`"Libro de Reclamaciones`">`r`n        <svg width=`"20`" height=`"20`" viewBox=`"0 0 24 24`" fill=`"none`" stroke=`"currentColor`" stroke-width=`"1.5`" stroke-linecap=`"round`" stroke-linejoin=`"round`"><path d=`"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20`"/></svg>`r`n    </a>`r`n"
            $content = $content -replace '(?i)</body>', ($btnHtml + '</body>')
        }
        
        [IO.File]::WriteAllText($filePath, $content, $UTF8)
        Write-Host "Updated $fileName"
    }
}
