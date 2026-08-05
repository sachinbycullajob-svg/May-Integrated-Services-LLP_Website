import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { X, Save, Plus, Loader2 } from 'lucide-react';

interface AccountsCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
}

const TABS = ['Amazon.in', 'Amazon.com', 'Flipkart', 'Gmail', 'MSN', 'Bombinoexp'];

interface AccountRow {
  id: string; // internal id for React keys
  platform: string;
  userId: string;
  password: string;
  registeredEmailId: string;
  registeredMobileNumber: string;
  accountStatus: string;
  isNew?: boolean;
}

export const AccountsCredentialModal: React.FC<AccountsCredentialModalProps> = ({
  isOpen,
  onClose,
  themeMode
}) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [data, setData] = useState<AccountRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchData(activeTab);
    }
  }, [isOpen, activeTab]);

  const fetchData = async (tab: string) => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      const res = await fetch(`/api/credentials/accounts/${encodeURIComponent(tab)}`);
      const result = await res.json();
      if (result.success) {
        const mapped = result.data.map((row: any, i: number) => ({
          id: `row-${i}-${Date.now()}`,
          platform: row['Platform'] || '',
          userId: row['User Id'] || '',
          password: row['Password'] || '',
          registeredEmailId: row['Registered Email Id'] || '',
          registeredMobileNumber: row['Registered Mobile Number'] || '',
          accountStatus: row['Account Status'] || '',
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

  const handleInputChange = (id: string, field: keyof AccountRow, value: string) => {
    setData((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleAddRow = () => {
    setData((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        platform: '',
        userId: '',
        password: '',
        registeredEmailId: '',
        registeredMobileNumber: '',
        accountStatus: '',
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
        'Platform': rest.platform,
        'User Id': rest.userId,
        'Password': rest.password,
        'Registered Email Id': rest.registeredEmailId,
        'Registered Mobile Number': rest.registeredMobileNumber,
        'Account Status': rest.accountStatus,
      }));

      const res = await fetch(`/api/credentials/accounts/${encodeURIComponent(activeTab)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload })
      });
      const result = await res.json();
      if (result.success) {
        setSuccessMsg('Data saved successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
        // Remove isNew flags
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
      <div className={`w-full max-w-6xl h-[85vh] flex overflow-hidden rounded-3xl border shadow-2xl relative ${
        themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Navigation Panel */}
        <div className={`w-64 flex-shrink-0 border-r flex flex-col ${
          themeMode === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="p-6 border-b border-slate-800/10 dark:border-slate-800">
            <h2 className={`text-lg font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Accounts Credential
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : `hover:bg-sky-500/10 ${themeMode === 'dark' ? 'text-slate-400 hover:text-sky-400' : 'text-slate-600 hover:text-sky-600'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="p-6 pb-0 flex items-center justify-between border-b border-slate-800/10 dark:border-slate-800 pb-4">
            <h3 className={`text-xl font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {activeTab}
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
              <div className="min-w-[800px]">
                <div className={`grid grid-cols-6 gap-4 p-4 rounded-t-xl text-xs font-bold uppercase tracking-wider ${
                  themeMode === 'dark' ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}>
                  <div>Platform</div>
                  <div>User Id</div>
                  <div>Password</div>
                  <div>Registered Email Id</div>
                  <div>Registered Mobile Number</div>
                  <div>Account Status</div>
                </div>
                <div className="space-y-2 mt-2">
                  {data.map((row) => (
                    <div key={row.id} className="grid grid-cols-6 gap-4">
                      {['platform', 'userId', 'password', 'registeredEmailId', 'registeredMobileNumber', 'accountStatus'].map((field) => (
                        <input
                          key={`${row.id}-${field}`}
                          type="text"
                          value={row[field as keyof AccountRow] as string}
                          onChange={(e) => handleInputChange(row.id, field as keyof AccountRow, e.target.value)}
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
