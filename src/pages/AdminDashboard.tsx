import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, ShoppingBag, DollarSign, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem('repairtech_orders');
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  if (loading || !user || !user.isAdmin) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading Admin...</div>;

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="admin-page" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      
      {/* Sidebar */}
      <div style={{ width: '260px', background: 'var(--navy)', color: 'white', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ paddingLeft: '1rem', marginBottom: '2rem', color: 'white' }}>Admin Panel</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <button onClick={() => setActiveTab('orders')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: activeTab === 'orders' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '8px', textAlign: 'left', fontSize: '1rem' }}>
            <ShoppingBag size={20} /> Orders
          </button>
          <button onClick={() => setActiveTab('customers')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: activeTab === 'customers' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '8px', textAlign: 'left', fontSize: '1rem' }}>
            <Users size={20} /> Customers
          </button>
        </div>

        <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer', textAlign: 'left', fontSize: '1rem', marginTop: 'auto' }}>
          <LogOut size={20} /> Exit Admin
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--navy)' }}>Dashboard Overview</h1>
          <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', fontWeight: 'bold', color: 'var(--navy)' }}>
            Logged in as {user.displayName}
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#dcfce3', padding: '1rem', borderRadius: '50%', color: '#166534' }}><DollarSign size={24} /></div>
            <div>
              <div style={{ color: 'var(--gray-dark)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Revenue</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--navy)' }}>R {totalRevenue.toFixed(2)}</div>
            </div>
          </div>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#e0e7ff', padding: '1rem', borderRadius: '50%', color: '#3730a3' }}><ShoppingBag size={24} /></div>
            <div>
              <div style={{ color: 'var(--gray-dark)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Orders</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--navy)' }}>{orders.length}</div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', fontWeight: 'bold', color: 'var(--navy)', fontSize: '1.1rem' }}>
            Recent Orders
          </div>
          {orders.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-dark)' }}>No orders found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', color: 'var(--gray-dark)', textAlign: 'left', fontSize: '0.9rem' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Order ID</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Customer</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order.id} style={{ borderTop: '1px solid #eee', borderBottom: idx === orders.length - 1 ? 'none' : '1px solid #eee' }}>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--navy)', fontWeight: 'bold' }}>#{order.id}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--gray-dark)' }}>{new Date(order.date).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--navy)' }}>{order.customer.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>{order.customer.email}</div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>R {order.total.toFixed(2)}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ padding: '0.25rem 0.75rem', background: '#fef3c7', color: '#92400e', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}
