import React from 'react';

interface KnownFactsPanelProps {
  knownTopics: string[];
  knownDifficulty?: string;
  knownRuntime?: string;
}

export const KnownFactsPanel: React.FC<KnownFactsPanelProps> = ({
  knownTopics,
  knownDifficulty,
  knownRuntime,
}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-md mb-4 text-sm">
      <h3 className="text-zinc-400 font-semibold mb-2 uppercase text-xs tracking-wider">
        Known Clues
      </h3>
      <div className="flex flex-wrap gap-2">
        {knownDifficulty && (
          <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs border border-green-700">
            Difficulty: {knownDifficulty}
          </span>
        )}
        {knownRuntime && (
          <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs border border-green-700">
            Runtime: {knownRuntime}
          </span>
        )}
        {knownTopics.map((topic) => (
          <span key={topic} className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs border border-green-700">
            Topic: {topic}
          </span>
        ))}
        {!knownDifficulty && !knownRuntime && knownTopics.length === 0 && (
          <span className="text-zinc-500 text-xs">Make a guess to discover clues!</span>
        )}
      </div>
    </div>
  );
};