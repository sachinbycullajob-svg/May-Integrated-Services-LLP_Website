import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { X, Save, Plus, Loader2, ExternalLink } from 'lucide-react';

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
        throw new Error('API Configuration Required: The backend service is currently unreachable or not deployed on this environment.');
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
      <div className={`w-full max-w-[95vw] h-[85vh] flex overflow-hidden rounded-xl border relative shadow-2xl ${
        themeMode === 'dark' ? 'bg-maroon-950 border-maroon-800 text-beige-100' : 'bg-beige-50 border-beige-300 text-maroon-900'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Navigation Panel */}
        <div className={`w-48 flex-shrink-0 border-r flex flex-col ${
          themeMode === 'dark' ? 'bg-maroon-900 border-maroon-800' : 'bg-beige-100 border-beige-300'
        }`}>
          <div className={`p-6 border-b ${themeMode === 'dark' ? 'border-maroon-800' : 'border-beige-300'}`}>
            <h2 className={`text-sm tracking-widest uppercase font-bold ${themeMode === 'dark' ? 'text-gray-100' : 'text-maroon-950'}`}>
              Accounts Credential
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-md transition-colors duration-200 text-sm font-medium ${
                  activeTab === tab
                    ? (themeMode === 'dark' ? 'bg-beige-200 text-maroon-950' : 'bg-gray-900 text-white')
                    : `hover:bg-beige-300/50 dark:hover:bg-maroon-800 ${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className={`p-6 pb-4 flex items-center justify-between border-b ${themeMode === 'dark' ? 'border-maroon-800' : 'border-beige-300'}`}>
            <h3 className={`text-lg font-semibold ${themeMode === 'dark' ? 'text-white' : 'text-maroon-950'}`}>
              {activeTab}
            </h3>
            <div className="flex items-center space-x-4 mr-10">
              {successMsg && <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{successMsg}</span>}
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className={`flex items-center space-x-2 px-5 py-2 rounded-md font-medium text-sm transition-colors duration-200 disabled:opacity-50 ${
                  themeMode === 'dark' ? 'bg-beige-200 hover:bg-beige-50 text-maroon-950' : 'bg-gray-900 hover:bg-black text-white'
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
              <div className="min-w-[1100px] p-6 pt-2">
                <div className={`grid grid-cols-6 gap-4 p-3 rounded-md text-[11px] font-bold uppercase tracking-widest mb-2 bg-[#2f5539] text-white`}>
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
                        <div key={`${row.id}-${field}`} className="relative">
                          <input
                            type="text"
                            value={row[field as keyof AccountRow] as string}
                            onChange={(e) => handleInputChange(row.id, field as keyof AccountRow, e.target.value)}
                            className="w-full px-3 py-2.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2f5539] transition-colors bg-[#a4c2f4] text-black placeholder-gray-600 border border-[#8dafe4]"
                          />
                          {field === 'platform' && (row[field as keyof AccountRow] as string).startsWith('http') && (
                            <a 
                              href={row[field as keyof AccountRow] as string} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-[#2f5539] text-white rounded hover:bg-[#1d3624] transition-colors"
                              title="Open link"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddRow}
                  className={`mt-6 flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-colors border ${
                    themeMode === 'dark' 
                      ? 'bg-maroon-900 hover:bg-maroon-800 border-maroon-700 text-beige-200' 
                      : 'bg-beige-50 hover:bg-beige-100 border-beige-300 text-maroon-800'
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
