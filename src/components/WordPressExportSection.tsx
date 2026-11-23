import React, { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileCode2,
  FolderArchive,
  GitBranch,
} from 'lucide-react';
import { PLATFORM_LINKS } from '../data/menuData';
import {
  buildGitHubStaticFiles,
  buildWordPressThemeFiles,
  generateGitHubSourceZipBlob,
  generateWordPressThemeZipBlob,
  type WordPressThemeFile,
} from '../utils/wordpressExport';

type ExportMode = 'github' | 'wordpress';

export const WordPressExportSection: React.FC = () => {
  const [mode, setMode] = useState<ExportMode>('github');
  const [downloadingWp, setDownloadingWp] = useState(false);
  const [downloadedWp, setDownloadedWp] = useState(false);
  const [downloadingGh, setDownloadingGh] = useState(false);
  const [downloadedGh, setDownloadedGh] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const ghFiles = buildGitHubStaticFiles();
  const wpFiles = buildWordPressThemeFiles();

  const activeFiles: WordPressThemeFile[] =
    mode === 'github'
      ? ghFiles.filter((f) => !f.path.endsWith('.nojekyll'))
      : wpFiles;

  const [selectedPath, setSelectedPath] = useState<string>(
    ghFiles[0]?.path ?? ''
  );

  useEffect(() => {
    const exists = activeFiles.some((f) => f.path === selectedPath);
    if (!exists && activeFiles[0]) {
      setSelectedPath(activeFiles[0].path);
    }
  }, [mode, activeFiles, selectedPath]);

  const selectedFile =
    activeFiles.find((f) => f.path === selectedPath) ?? activeFiles[0];

  const handleDownloadWpZip = async () => {
    setDownloadingWp(true);
    try {
      const blob = await generateWordPressThemeZipBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'geprek-aja-wp-theme.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloadedWp(true);
    } finally {
      setDownloadingWp(false);
    }
  };

  const handleDownloadGitHubZip = async () => {
    setDownloadingGh(true);
    try {
      const blob = await generateGitHubSourceZipBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'geprek-aja-github-final.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloadedGh(true);
    } finally {
      setDownloadingGh(false);
    }
  };

  const handleCopyCode = async () => {
    if (!selectedFile || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopiedPath(selectedFile.path);
      setTimeout(() => setCopiedPath(null), 2000);
    } catch {
      // Clipboard blocked in restricted contexts
    }
  };

  const handleDownloadSingleFile = () => {
    if (!selectedFile) return;
    const filename = selectedFile.path.split('/').pop() || 'file.txt';
    const blob = new Blob([selectedFile.content], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const lineCount = selectedFile ? selectedFile.content.split('\n').length : 0;

  return (
    <section
      id="wordpress-export"
      aria-labelledby="wp-export-heading"
      className="py-16 border-t border-zinc-200 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold text-[#15803D]">
              Repository Final GitHub Pages &amp; Tema WordPress (v1.2.0)
            </p>
            <h2
              id="wp-export-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-zinc-900"
            >
              Coding Final Siap Push GitHub &amp; Upload WordPress
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Seluruh source code final sudah lengkap berisi menu 13 item, level
              pedas 0–4, add-ons olahan ayam, encoder barcode Code-39, peta 3
              cabang Wonogiri, Open Mitra WhatsApp{' '}
              <span className="font-semibold text-zinc-900">0838-2184-6574</span>
              , aset logo maskot, serta workflow GitHub Actions otomatis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadGitHubZip}
              disabled={downloadingGh}
              className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-[#166534] disabled:opacity-60 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer"
            >
              {downloadedGh ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <GitBranch className="w-4 h-4" aria-hidden="true" />
              )}
              <span>
                {downloadingGh
                  ? 'Menyiapkan ZIP GitHub...'
                  : downloadedGh
                    ? 'ZIP GitHub Final Diunduh'
                    : 'Unduh ZIP GitHub Final (.zip)'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleDownloadWpZip}
              disabled={downloadingWp}
              className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-60 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer"
            >
              {downloadedWp ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Download className="w-4 h-4" aria-hidden="true" />
              )}
              <span>
                {downloadingWp
                  ? 'Menyiapkan ZIP WordPress...'
                  : downloadedWp
                    ? 'ZIP WordPress Diunduh'
                    : 'Unduh ZIP WordPress (.zip)'}
              </span>
            </button>

            <a
              href={PLATFORM_LINKS.githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 hover:border-zinc-900 text-zinc-900 font-semibold text-sm px-4 py-3 rounded-lg transition-colors"
            >
              <span>Buka GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Interactive Code Viewer for GitHub & WordPress Final Files */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="px-4 sm:px-6 py-3.5 border-b border-zinc-200 bg-[#FAFAFA] flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Pilih paket file coding"
              className="inline-flex bg-zinc-200/70 p-1 rounded-lg gap-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'github'}
                onClick={() => setMode('github')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  mode === 'github'
                    ? 'bg-white text-[#15803D] shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Coding GitHub Pages ({ghFiles.length} File)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'wordpress'}
                onClick={() => setMode('wordpress')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  mode === 'wordpress'
                    ? 'bg-white text-[#DC2626] shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Tema WordPress PHP ({wpFiles.length} File)
              </button>
            </div>

            {selectedFile && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-zinc-200 hover:border-[#EA580C] text-zinc-800 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedPath === selectedFile.path ? (
                    <Check className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-[#EA580C]" aria-hidden="true" />
                  )}
                  <span>
                    {copiedPath === selectedFile.path
                      ? 'Kode Tersalin'
                      : 'Salin Kode'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSingleFile}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Unduh File Ini</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* File Tree */}
            <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-[#FAFAFA] p-3 sm:p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 pb-2.5 mb-2 border-b border-zinc-200">
                <FolderArchive
                  className={`w-4 h-4 ${
                    mode === 'github' ? 'text-[#15803D]' : 'text-[#DC2626]'
                  }`}
                  aria-hidden="true"
                />
                <span>
                  {mode === 'github'
                    ? 'geprek-aja-github/'
                    : 'geprek-aja/ (WordPress)'}
                </span>
              </div>
              <ul className="space-y-1 max-h-72 lg:max-h-96 overflow-y-auto">
                {activeFiles.map((file) => {
                  const isSelected = selectedFile?.path === file.path;
                  const shortName = file.path
                    .replace(/^geprek-aja-github\//, '')
                    .replace(/^geprek-aja\//, '');
                  return (
                    <li key={file.path}>
                      <button
                        type="button"
                        onClick={() => setSelectedPath(file.path)}
                        className={`w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white border border-zinc-300 text-zinc-900 font-semibold shadow-xs'
                            : 'text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 border border-transparent'
                        }`}
                      >
                        <FileCode2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isSelected ? 'text-[#EA580C]' : 'text-zinc-400'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="truncate">{shortName}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {mode === 'github' && (
                <p className="mt-3 pt-3 border-t border-zinc-200 text-xs text-zinc-500 leading-relaxed">
                  File ZIP juga otomatis menyertakan folder{' '}
                  <span className="font-mono text-zinc-800">wordpress-theme/</span>{' '}
                  dan gambar{' '}
                  <span className="font-mono text-zinc-800">
                    assets/img/logo-ayam-geprek-aja.png
                  </span>
                  .
                </p>
              )}
            </aside>

            {/* Code Preview */}
            <div className="lg:col-span-8 bg-zinc-950 text-zinc-100 flex flex-col">
              {selectedFile && (
                <>
                  <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between gap-2 text-xs font-mono text-zinc-400">
                    <span className="truncate text-zinc-200">
                      {selectedFile.path}
                    </span>
                    <span className="shrink-0 tabular-nums">
                      {lineCount} baris
                    </span>
                  </div>
                  <pre className="p-4 text-xs leading-relaxed font-mono overflow-auto max-h-96 m-0 text-zinc-100">
                    <code>{selectedFile.content}</code>
                  </pre>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
