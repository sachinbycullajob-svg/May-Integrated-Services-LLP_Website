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
      let result;
      try {
        result = await res.json();
      } catch (e) {
        throw new Error('API Configuration Required: The backend service is currently unreachable or not deployed on this environment.');
      }
      
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
    } catch (err: any) {
      setError(err.message || 'Network error fetching data.');
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
      let result;
      try {
        result = await res.json();
      } catch (e) {
        throw new Error('API Configuration Required: The backend service is unreachable.');
      }
      
      if (result.success) {
        setSuccessMsg('Data saved successfully');
        setTimeout(() => setSuccessMsg(''), 3000);
        setData((prev) => prev.map((r) => ({ ...r, isNew: false })));
      } else {
        setError(result.error || 'Failed to save data');
      }
    } catch (err: any) {
      setError(err.message || 'Network error saving data.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in">
      <div className={`w-full max-w-7xl h-[85vh] flex overflow-hidden rounded-xl border relative shadow-2xl ${
        themeMode === 'dark' ? 'bg-[#0a0a0a] border-[#222] text-gray-200' : 'bg-white border-gray-200 text-gray-800'
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
          <div className={`p-6 pb-4 flex items-center justify-between border-b ${themeMode === 'dark' ? 'border-[#222]' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold tracking-widest uppercase ${themeMode === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
              Users Credential
            </h3>
            <div className="flex items-center space-x-4 mr-10">
              {successMsg && <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{successMsg}</span>}
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className={`flex items-center space-x-2 px-5 py-2 rounded-md font-medium text-sm transition-colors duration-200 disabled:opacity-50 ${
                  themeMode === 'dark' ? 'bg-gray-100 hover:bg-white text-gray-900' : 'bg-gray-900 hover:bg-black text-white'
                }`}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-transparent relative">
            {error && (
              <div className={`m-6 p-4 rounded-md border text-sm flex items-start space-x-3 ${
                themeMode === 'dark' ? 'bg-red-950/30 border-red-900/50 text-red-200' : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex-1 font-medium">{error}</div>
              </div>
            )}
            
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className={`w-6 h-6 animate-spin ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            ) : (
              <div className="min-w-[1200px] p-6 pt-2">
                <div className={`grid grid-cols-8 gap-4 p-3 rounded-md text-[11px] font-bold uppercase tracking-widest mb-2 ${
                  themeMode === 'dark' ? 'bg-[#111] text-gray-400' : 'bg-gray-50 text-gray-500'
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
                          className={`w-full px-3 py-2.5 rounded-md border text-sm focus:outline-none transition-colors ${
                            themeMode === 'dark' 
                              ? 'bg-[#111] border-[#222] focus:border-gray-500 text-gray-200' 
                              : 'bg-white border-gray-200 focus:border-gray-400 text-gray-900'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddRow}
                  className={`mt-6 flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors border ${
                    themeMode === 'dark' 
                      ? 'bg-[#111] hover:bg-[#222] border-[#333] text-gray-300' 
                      : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-700'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Row</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
