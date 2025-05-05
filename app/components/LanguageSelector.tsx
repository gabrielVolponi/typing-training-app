'use client'

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onSnippetSelect: (index: number) => void;
  currentSnippetIndex: number;
  snippetCount: number;
}

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'csharp', name: 'C#' },
];

export default function LanguageSelector({
  selectedLanguage,
  onLanguageSelect,
  onSnippetSelect,
  currentSnippetIndex,
  snippetCount
}: LanguageSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold">Select Programming Language</h2>
        <div className="flex gap-4">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                onLanguageSelect(lang.id);
                onSnippetSelect(0);
              }}
              className={`px-6 py-3 rounded-lg transition-all ${
                selectedLanguage === lang.id
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg">Select Snippet</h3>
        <div className="flex gap-2">
          {Array.from({ length: snippetCount }, (_, i) => (
            <button
              key={i}
              onClick={() => onSnippetSelect(i)}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentSnippetIndex === i
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}