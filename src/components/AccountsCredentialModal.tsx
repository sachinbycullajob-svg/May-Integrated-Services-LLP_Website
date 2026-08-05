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
      let result;
      try {
        result = await res.json();
      } catch (e) {
        throw new Error('Server returned an invalid response. API might not be running.');
      }
      
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
    } catch (err: any) {
      setError(err.message || 'Network error fetching data.');
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
      let result;
      try {
        result = await res.json();
      } catch (e) {
        throw new Error('Server returned an invalid response. API might not be running.');
      }

      if (result.success) {
        setSuccessMsg('Data saved successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
        // Remove isNew flags
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 animate-in fade-in">
      <div className={`w-full max-w-6xl h-[85vh] flex overflow-hidden rounded-xl border relative ${
        themeMode === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
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
          themeMode === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'
        }`}>
          <div className="p-6 border-b border-slate-700/50 dark:border-slate-700">
            <h2 className={`text-lg font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Accounts Credential
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : `hover:bg-slate-200 dark:hover:bg-slate-700 ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-700/50 dark:border-slate-700">
            <h3 className={`text-xl font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {activeTab}
            </h3>
            <div className="flex items-center space-x-3 mr-10">
              {successMsg && <span className="text-sm text-green-500 font-medium">{successMsg}</span>}
              {error && <span className="text-sm text-red-500 font-medium">{error}</span>}
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-colors duration-200 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="min-w-[800px]">
                <div className={`grid grid-cols-6 gap-4 p-4 rounded-t-md text-xs font-bold uppercase tracking-wider ${
                  themeMode === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
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
                          className={`w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:border-blue-500 transition-colors ${
                            themeMode === 'dark' 
                              ? 'bg-slate-800 border-slate-700 text-white' 
                              : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddRow}
                  className="mt-6 flex items-center space-x-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md font-medium transition-colors border border-slate-300 dark:border-slate-700"
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
