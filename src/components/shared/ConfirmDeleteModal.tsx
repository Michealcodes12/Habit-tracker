"use client";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({ onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Delete Habit</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Are you sure you want to delete this habit? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-600 text-white font-medium rounded-xl hover:bg-rose-500 active:bg-rose-700 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
