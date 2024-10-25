export interface Loop {
  id: string;
  title: string;
  placeholder: string;
  notes: string;
  file: string | null;
}

export interface Track {
  id: string;
  title: string;
  placeholder: string;
  loops: Loop[];
}

export interface Set {
  id: string;
  title: string;
  isComplete: boolean;
  tracks: Track[];
}
