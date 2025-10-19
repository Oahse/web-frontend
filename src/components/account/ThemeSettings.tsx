import { ThemeToggle } from '../ui/ThemeToggle';

export const ThemeSettings = () => {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-main">Theme Settings</h2>
      <div className="flex items-center justify-between">
        <p className="text-copy-light">Change the appearance of the application.</p>
        <ThemeToggle />
      </div>
    </div>
  );
};