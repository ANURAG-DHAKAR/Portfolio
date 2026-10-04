import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, LogOut, Pencil, Plus, Trash2, Upload, X } from 'lucide-react';
import type { Project } from '../data/projects';
import {
  PROJECTS_PATH,
  REPO_BRANCH,
  REPO_NAME,
  REPO_OWNER,
  commitFiles,
  fetchProjectsFile,
  jsonFile,
  verifyToken,
} from '../lib/github';

const TOKEN_KEY = 'portfolio-admin-token';
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const TEXT_FIELDS: { key: keyof Project; label: string; long?: boolean }[] = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'description', label: 'Short description' },
  { key: 'live', label: 'Live URL' },
  { key: 'github', label: 'GitHub URL' },
  { key: 'problem', label: 'Problem', long: true },
  { key: 'research', label: 'Research', long: true },
  { key: 'solution', label: 'Solution', long: true },
  { key: 'impact', label: 'Impact', long: true },
];

const emptyProject = (id: number): Project => ({
  id,
  title: '',
  category: '',
  description: '',
  problem: '',
  solution: '',
  impact: '',
  image: '',
  live: '',
  github: '',
  research: '',
});

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? '';
  } catch {
    return '';
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project';
}

interface AdminPanelProps {
  onClose: () => void;
  /** Called after a successful publish so the live page updates without waiting for the redeploy. */
  onPublished: (projects: Project[]) => void;
}

export function AdminPanel({ onClose, onPublished }: AdminPanelProps) {
  const [token, setToken] = useState(readToken);
  const [tokenInput, setTokenInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  // repo path -> base64, for images chosen but not yet committed
  const [pendingImages, setPendingImages] = useState<Record<string, string>>({});
  // site path (./Images/x.png) -> data URL, so new images preview before deploy
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const unlock = async (t: string) => {
    setError('');
    setBusy('Checking token…');
    try {
      await verifyToken(t);
      const data = await fetchProjectsFile<Project[]>(t);
      try {
        localStorage.setItem(TOKEN_KEY, t);
      } catch {
        // Not fatal: the user will just have to paste the token again next time.
      }
      setToken(t);
      setProjects(data);
      setUnlocked(true);
    } catch (e) {
      setError((e as Error).message);
      setToken('');
    } finally {
      setBusy('');
    }
  };

  useEffect(() => {
    if (token) unlock(token);
    // Only auto-unlock once with a remembered token.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !editing && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editing, onClose]);

  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
    setToken('');
    setUnlocked(false);
    setProjects([]);
  };

  const saveEditing = () => {
    if (!editing) return;
    if (!editing.title.trim() || !editing.image) {
      setError('Title and image are required.');
      return;
    }
    setError('');
    setProjects((list) =>
      list.some((p) => p.id === editing.id)
        ? list.map((p) => (p.id === editing.id ? editing : p))
        : [...list, editing],
    );
    setEditing(null);
    setDirty(true);
  };

  const remove = (id: number) => {
    const p = projects.find((x) => x.id === id);
    if (!p || !confirm(`Delete "${p.title}"?`)) return;
    setProjects((list) => list.filter((x) => x.id !== id));
    setDirty(true);
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= projects.length) return;
    setProjects((list) => {
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setDirty(true);
  };

  const onImageFile = (file: File) => {
    if (!editing) return;
    if (!file.type.startsWith('image/')) return setError('Please choose an image file.');
    if (file.size > MAX_IMAGE_BYTES) return setError('Image must be under 5 MB.');
    setError('');
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const ext = (file.name.split('.').pop() || 'png').toLowerCase();
      const name = `${slugify(editing.title || file.name)}-${Date.now()}.${ext}`;
      const sitePath = `./Images/${name}`;
      setPendingImages((m) => ({ ...m, [`public/Images/${name}`]: dataUrl.split(',')[1] }));
      setPreviews((m) => ({ ...m, [sitePath]: dataUrl }));
      setEditing({ ...editing, image: sitePath });
    };
    reader.readAsDataURL(file);
  };

  const publish = async () => {
    setError('');
    setNotice('');
    setBusy('Publishing…');
    try {
      const used = new Set(projects.map((p) => p.image.replace('./Images/', 'public/Images/')));
      const images = Object.entries(pendingImages)
        .filter(([path]) => used.has(path))
        .map(([path, base64]) => ({ path, base64 }));
      await commitFiles(token, 'Update projects from admin panel', [
        jsonFile(PROJECTS_PATH, projects),
        ...images,
      ]);
      onPublished(projects.map((p) => ({ ...p, image: previews[p.image] ?? p.image })));
      setPendingImages({});
      setDirty(false);
      setNotice('Published! Your site will update after the host redeploys (usually 1–2 min).');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy('');
    }
  };

  const close = () => {
    if (dirty && !confirm('You have unpublished changes. Close anyway?')) return;
    onClose();
  };

  const inputCls =
    'w-full bg-white/5 border border-white/20 px-3 py-2 text-white text-sm focus:outline-none focus:border-green-400';
  const btn = 'px-4 py-2 text-sm tracking-wider uppercase transition-all flex items-center gap-2 disabled:opacity-50';

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-900/95 border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
          <h2 className="text-white text-xl">Admin · Projects</h2>
          <div className="flex items-center gap-2">
            {unlocked && !editing && (
              <>
                <button
                  onClick={publish}
                  disabled={!dirty || !!busy}
                  className={`${btn} bg-green-500 hover:bg-green-600 text-white`}
                >
                  <Upload className="w-4 h-4" />
                  Publish
                </button>
                <button onClick={logout} title="Forget token" className={`${btn} border border-white/30 text-white`}>
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
            <button onClick={close} className="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {busy && <p className="text-white/70 text-sm">{busy}</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {notice && <p className="text-green-400 text-sm">{notice}</p>}

          {/* Login */}
          {!unlocked && !busy && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (tokenInput.trim()) unlock(tokenInput.trim());
              }}
              className="space-y-4"
            >
              <p className="text-white/70 text-sm leading-relaxed">
                Paste a GitHub fine-grained token with <b>Contents: Read and write</b> access to only{' '}
                <code className="text-green-400">{REPO_OWNER}/{REPO_NAME}</code>. Changes are committed to the{' '}
                <code className="text-green-400">{REPO_BRANCH}</code> branch.{' '}
                <a
                  href="https://github.com/settings/personal-access-tokens/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white"
                >
                  Create token
                </a>
              </p>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="github_pat_…"
                className={inputCls}
                autoFocus
              />
              <button type="submit" className={`${btn} bg-white text-black`}>
                Unlock
              </button>
            </form>
          )}

          {/* Project list */}
          {unlocked && !editing && (
            <>
              <button
                onClick={() => setEditing(emptyProject(Math.max(0, ...projects.map((p) => p.id)) + 1))}
                className={`${btn} border border-green-400 text-green-400 hover:bg-green-400/10`}
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
              <ul className="divide-y divide-white/10 border border-white/10">
                {projects.map((p, i) => (
                  <li key={p.id} className="flex items-center gap-3 p-3">
                    <img
                      src={previews[p.image] ?? p.image}
                      alt=""
                      className="w-16 h-12 object-cover bg-white/5 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm truncate">{p.title}</div>
                      <div className="text-white/50 text-xs truncate">{p.category}</div>
                    </div>
                    <div className="flex items-center gap-1 text-white/70">
                      <button onClick={() => move(i, -1)} className="p-2 hover:text-white" title="Move up">
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => move(i, 1)} className="p-2 hover:text-white" title="Move down">
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditing(p)} className="p-2 hover:text-white" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(p.id)} className="p-2 hover:text-red-400" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Edit form */}
          {unlocked && editing && (
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">Image</label>
                <div className="flex items-center gap-4">
                  {editing.image && (
                    <img
                      src={previews[editing.image] ?? editing.image}
                      alt=""
                      className="w-32 h-24 object-cover bg-white/5"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && onImageFile(e.target.files[0])}
                      className="block text-white/70 text-sm file:mr-3 file:px-3 file:py-1.5 file:border-0 file:bg-white file:text-black"
                    />
                    <input
                      value={editing.image}
                      onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                      placeholder="…or paste an image URL"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {TEXT_FIELDS.map(({ key, label, long }) => (
                <div key={key}>
                  <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">{label}</label>
                  {long ? (
                    <textarea
                      rows={3}
                      value={editing[key] as string}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                      className={inputCls}
                    />
                  ) : (
                    <input
                      value={editing[key] as string}
                      onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
                      className={inputCls}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3">
                <button onClick={saveEditing} className={`${btn} bg-green-500 hover:bg-green-600 text-white`}>
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(null);
                    setError('');
                  }}
                  className={`${btn} border border-white/30 text-white`}
                >
                  Cancel
                </button>
              </div>
              <p className="text-white/40 text-xs">Save adds it to the list — click Publish to push it live.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
