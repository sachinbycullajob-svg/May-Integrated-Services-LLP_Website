import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { X, Save, Plus, Loader2 } from 'lucide-react';

interface UsersCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
}

interface UserRow {
  id: string; // internal id for React keys
  usersName: string;
  emailId1: string;
  emailId2: string;
  emailId3: string;
  emailId4: string;
  mobileNumber1: string;
  mobileNumber2: string;
  department: string;
  isNew?: boolean;
}

export const UsersCredentialModal: React.FC<UsersCredentialModalProps> = ({
  isOpen,
  onClose,
  themeMode
}) => {
  const [data, setData] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch('/api/credentials/users');
      const result = await res.json();
      if (result.success) {
        const mapped = result.data.map((row: any, i: number) => ({
          id: `row-${i}-${Date.now()}`,
          usersName: row['Users Name'] || '',
          emailId1: row['Email Id 1'] || '',
          emailId2: row['Email Id 2'] || '',
          emailId3: row['Email Id 3'] || '',
          emailId4: row['Email Id 4'] || '',
          mobileNumber1: row['Mobile Number 1'] || '',
          mobileNumber2: row['Mobile Number 2'] || '',
          department: row['Department'] || '',
        }));
        setData(mapped);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Network error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (id: string, field: keyof UserRow, value: string) => {
    setData((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleAddRow = () => {
    setData((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        usersName: '',
        emailId1: '',
        emailId2: '',
        emailId3: '',
        emailId4: '',
        mobileNumber1: '',
        mobileNumber2: '',
        department: '',
        isNew: true,
      }
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      const payload = data.map(({ id, isNew, ...rest }) => ({
        'Users Name': rest.usersName,
        'Email Id 1': rest.emailId1,
        'Email Id 2': rest.emailId2,
        'Email Id 3': rest.emailId3,
        'Email Id 4': rest.emailId4,
        'Mobile Number 1': rest.mobileNumber1,
        'Mobile Number 2': rest.mobileNumber2,
        'Department': rest.department,
      }));

      const res = await fetch('/api/credentials/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload })
      });
      const result = await res.json();
      if (result.success) {
        setSuccessMsg('Data saved successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
        setData((prev) => prev.map((r) => ({ ...r, isNew: false })));
      } else {
        setError(result.error || 'Failed to save data');
      }
    } catch (err) {
      setError('Network error saving data.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className={`w-full max-w-7xl h-[85vh] flex overflow-hidden rounded-3xl border shadow-2xl relative ${
        themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="p-6 pb-0 flex items-center justify-between border-b border-slate-800/10 dark:border-slate-800 pb-4">
            <h3 className={`text-xl font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Users Credential
            </h3>
            <div className="flex items-center space-x-3 mr-10">
              {successMsg && <span className="text-sm text-emerald-500 font-medium">{successMsg}</span>}
              {error && <span className="text-sm text-red-500 font-medium">{error}</span>}
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-lg font-semibold shadow-lg shadow-sky-500/25 transition-all duration-200 active:scale-95 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
              </div>
            ) : (
              <div className="min-w-[1200px]">
                <div className={`grid grid-cols-8 gap-4 p-4 rounded-t-xl text-xs font-bold uppercase tracking-wider ${
                  themeMode === 'dark' ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}>
                  <div>Users Name</div>
                  <div>Email Id 1</div>
                  <div>Email Id 2</div>
                  <div>Email Id 3</div>
                  <div>Email Id 4</div>
                  <div>Mobile Number 1</div>
                  <div>Mobile Number 2</div>
                  <div>Department</div>
                </div>
                <div className="space-y-2 mt-2">
                  {data.map((row) => (
                    <div key={row.id} className="grid grid-cols-8 gap-4">
                      {['usersName', 'emailId1', 'emailId2', 'emailId3', 'emailId4', 'mobileNumber1', 'mobileNumber2', 'department'].map((field) => (
                        <input
                          key={`${row.id}-${field}`}
                          type="text"
                          value={row[field as keyof UserRow] as string}
                          onChange={(e) => handleInputChange(row.id, field as keyof UserRow, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-colors ${
                            themeMode === 'dark' 
                              ? 'bg-slate-950 border-slate-800 text-white' 
                              : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddRow}
                  className="mt-6 flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg font-medium transition-colors border border-slate-700 hover:border-slate-600"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Row</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
