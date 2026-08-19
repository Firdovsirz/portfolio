// Inline, blocking script that runs before paint to avoid a flash of wrong theme.
// Default is light if no stored preference exists. Only the data-theme
// attribute is set — `color-scheme` is declared in CSS, so no inline style
// attribute is written onto <html>.
const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var mode = stored === 'dark' || stored === 'light' || stored === 'system' ? stored : 'light';
    var effective = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.setAttribute('data-theme', effective);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
