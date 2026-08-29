import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, ShoppingBag, LogOut, 
  LayoutDashboard, Package, MapPin, Phone, Mail, Calendar, Clock, Banknote, ArrowRight, BellRing, Menu, X
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, doc, updateDoc, onSnapshot } from 'firebase/firestore';

type OrderItem = {
  id: string;
  title: string;
  priceNum: number;
  qty: number;
}

type Order = {
  id: string;
  date: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  userId: string | null;
}

type AppUser = {
  id: string;
  email: string;
  displayName: string;
  phone?: string;
  isAdmin: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<AppUser[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dataLoading, setDataLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [newOrderAlert, setNewOrderAlert] = useState<Order | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !user.isAdmin) return;

    let initialLoad = true;
    
    // Real-time listener for orders
    const qOrders = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      if (!initialLoad) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const addedOrder = { id: change.doc.id, ...change.doc.data() } as Order;
            setNewOrderAlert(addedOrder);
            
            // Auto hide the alert after 8 seconds
            setTimeout(() => {
              setNewOrderAlert(null);
            }, 8000);
          }
        });
      }
      
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
      setOrders(ordersData);
      initialLoad = false;
    }, (err) => {
      console.error("Error fetching orders:", err);
    });

    // Fetch customers
    const fetchCustomers = async () => {
      try {
        const usersSnap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
        const usersData = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as AppUser[];
        setCustomers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchCustomers();

    return () => {
      unsubscribeOrders();
    };
  }, [user]);

  if (loading || !user || !user.isAdmin) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', color: 'var(--navy)', fontWeight: 'bold', fontSize: '1.2rem' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid var(--lime)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          Authenticating Admin...
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      alert("Failed to update status. Make sure you have the correct permissions.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return { bg: 'rgba(0, 11, 41, 0.05)', text: 'var(--navy)', border: '1px solid rgba(0, 11, 41, 0.2)' };
      case 'processing': return { bg: 'rgba(181, 255, 20, 0.15)', text: 'var(--navy)', border: '1px solid var(--lime)' };
      case 'shipped': return { bg: 'var(--navy)', text: 'var(--lime)', border: '1px solid var(--navy)' };
      case 'delivered': return { bg: 'var(--lime)', text: 'var(--navy)', border: '1px solid var(--lime)' };
      case 'cancelled': return { bg: '#fee2e2', text: '#b91c1c', border: '1px solid #fca5a5' };
      default: return { bg: '#f3f4f6', text: '#374151', border: '1px solid #d1d5db' };
    }
  };

  return (
    <div className="admin-page" style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-light)', fontFamily: 'var(--font-sans)' }}>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="admin-sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid rgba(0, 11, 41, 0.05)', position: 'relative' }}>
          <button className="admin-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} color="var(--navy)" />
          </button>
          <h2 style={{ color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            <img src="/logos/logo.png" alt="Repair Tech Logo" style={{ height: '40px', width: '40px' }} />
            Repair Tech
          </h2>
          <div style={{ color: 'var(--gray-dark)', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px', marginTop: '4px', paddingLeft: '48px' }}>ADMIN PANEL</div>
        </div>
        
        <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.2rem 1.5rem', background: activeTab === 'dashboard' ? 'rgba(0, 11, 41, 0.03)' : 'transparent', border: 'none', borderLeft: activeTab === 'dashboard' ? '4px solid var(--lime)' : '4px solid transparent', color: activeTab === 'dashboard' ? 'var(--navy)' : 'var(--gray-dark)', cursor: 'pointer', borderRadius: '0 8px 8px 0', textAlign: 'left', fontSize: '1.05rem', fontWeight: activeTab === 'dashboard' ? '700' : '600', transition: 'all 0.2s' }}
          >
            <LayoutDashboard size={20} color={activeTab === 'dashboard' ? 'var(--lime)' : 'var(--gray-dark)'} /> Overview
          </button>
          <button 
            onClick={() => { setActiveTab('orders'); setIsMobileMenuOpen(false); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.2rem 1.5rem', background: activeTab === 'orders' ? 'rgba(0, 11, 41, 0.03)' : 'transparent', border: 'none', borderLeft: activeTab === 'orders' ? '4px solid var(--lime)' : '4px solid transparent', color: activeTab === 'orders' ? 'var(--navy)' : 'var(--gray-dark)', cursor: 'pointer', borderRadius: '0 8px 8px 0', textAlign: 'left', fontSize: '1.05rem', fontWeight: activeTab === 'orders' ? '700' : '600', transition: 'all 0.2s' }}
          >
            <ShoppingBag size={20} color={activeTab === 'orders' ? 'var(--lime)' : 'var(--gray-dark)'} /> Orders
            <span style={{ marginLeft: 'auto', background: activeTab === 'orders' ? 'var(--lime)' : 'rgba(0,11,41,0.05)', color: activeTab === 'orders' ? 'var(--navy)' : 'var(--gray-dark)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>{orders.length}</span>
          </button>
          <button 
            onClick={() => { setActiveTab('customers'); setIsMobileMenuOpen(false); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1.2rem 1.5rem', background: activeTab === 'customers' ? 'rgba(0, 11, 41, 0.03)' : 'transparent', border: 'none', borderLeft: activeTab === 'customers' ? '4px solid var(--lime)' : '4px solid transparent', color: activeTab === 'customers' ? 'var(--navy)' : 'var(--gray-dark)', cursor: 'pointer', borderRadius: '0 8px 8px 0', textAlign: 'left', fontSize: '1.05rem', fontWeight: activeTab === 'customers' ? '700' : '600', transition: 'all 0.2s' }}
          >
            <Users size={20} color={activeTab === 'customers' ? 'var(--lime)' : 'var(--gray-dark)'} /> Customers
            <span style={{ marginLeft: 'auto', background: activeTab === 'customers' ? 'var(--lime)' : 'rgba(0,11,41,0.05)', color: activeTab === 'customers' ? 'var(--navy)' : 'var(--gray-dark)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>{customers.length}</span>
          </button>
        </div>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(0, 11, 41, 0.05)' }}>
          <button onClick={() => { logout(); navigate('/'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', width: '100%', background: 'rgba(0, 11, 41, 0.03)', border: '1px solid rgba(0, 11, 41, 0.05)', color: 'var(--navy)', cursor: 'pointer', borderRadius: '8px', textAlign: 'left', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 11, 41, 0.03)'}>
            <LogOut size={20} /> Exit Admin
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        
        {/* Real-time Order Alert */}
        {newOrderAlert && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--navy)',
            color: 'var(--white)',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 100,
            animation: 'slideDown 0.3s ease-out'
          }}>
            <BellRing size={20} color="var(--lime)" />
            <div>
              <span style={{ fontWeight: 'bold' }}>New Order Placed!</span> &nbsp;
              <span style={{ opacity: 0.8 }}>R {(newOrderAlert.total || 0).toFixed(2)} from {newOrderAlert.customer?.name}</span>
            </div>
            <button 
              onClick={() => { setActiveTab('orders'); setNewOrderAlert(null); }}
              style={{ background: 'var(--lime)', color: 'var(--navy)', border: 'none', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '10px' }}
            >
              View
            </button>
            <style>{`
              @keyframes slideDown {
                from { transform: translate(-50%, -100%); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
              }
            `}</style>
          </div>
        )}

        {/* Header */}
        <header className="admin-header" style={{ background: 'var(--white)', padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', zIndex: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="admin-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={28} color="var(--navy)" />
            </button>
            <h1 className="admin-page-title" style={{ color: 'var(--navy)', fontSize: '1.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
              {activeTab === 'dashboard' ? 'Overview' : activeTab}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.95rem' }}>{user.displayName}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-dark)', fontWeight: '600' }}>Administrator</div>
            </div>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--navy)', color: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', border: '2px solid var(--lime)' }}>
              {user.displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
          
          {dataLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--navy)', fontWeight: 'bold' }}>
               <div className="spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid var(--lime)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              Syncing Secure Data...
            </div>
          ) : (
            <>
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    
                    {/* Revenue Card */}
                    <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 11, 41, 0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(0, 11, 41, 0.05)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.03, transform: 'scale(3)' }}>
                        <span style={{ fontSize: '100px', fontWeight: '900', fontFamily: 'serif' }}>R</span>
                      </div>
                      <div style={{ background: 'rgba(0, 11, 41, 0.05)', padding: '1.2rem', borderRadius: '12px', color: 'var(--navy)' }}><Banknote size={32} /></div>
                      <div style={{ zIndex: 1 }}>
                        <div style={{ color: 'var(--gray-dark)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</div>
                        <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--navy)' }}>R {totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                      </div>
                    </div>

                    {/* Orders Card */}
                    <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 11, 41, 0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(0, 11, 41, 0.05)' }}>
                      <div style={{ background: 'rgba(0, 11, 41, 0.05)', padding: '1.2rem', borderRadius: '12px', color: 'var(--navy)' }}><ShoppingBag size={32} /></div>
                      <div>
                        <div style={{ color: 'var(--gray-dark)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Orders</div>
                        <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--navy)' }}>{orders.length}</div>
                      </div>
                    </div>

                    {/* Average Value Card */}
                    <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 11, 41, 0.05)', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(0, 11, 41, 0.05)' }}>
                      <div style={{ background: 'rgba(0, 11, 41, 0.05)', padding: '1.2rem', borderRadius: '12px', color: 'var(--navy)' }}><Package size={32} /></div>
                      <div>
                        <div style={{ color: 'var(--gray-dark)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Order Value</div>
                        <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--navy)' }}>R {averageOrderValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                      </div>
                    </div>

                  </div>

                  <div style={{ background: 'var(--white)', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 11, 41, 0.05)', border: '1px solid rgba(0, 11, 41, 0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '2rem', borderBottom: '1px solid rgba(0, 11, 41, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.2rem', textTransform: 'uppercase' }}>Recent Orders</div>
                      <button 
                        onClick={() => setActiveTab('orders')} 
                        style={{ 
                          display: 'flex', alignItems: 'center', gap: '8px', 
                          background: 'transparent', border: '1px solid var(--navy)', 
                          color: 'var(--navy)', padding: '0.6rem 1.2rem', 
                          borderRadius: '8px', fontWeight: '700', fontSize: '0.85rem', 
                          cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.5px' 
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--white)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--navy)'; }}
                      >
                        View All Orders <ArrowRight size={16} />
                      </button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                      <thead>
                        <tr style={{ background: 'rgba(0, 11, 41, 0.02)', color: 'var(--gray-dark)', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          <th style={{ padding: '1.2rem 2rem', fontWeight: '700' }}>Order ID</th>
                          <th style={{ padding: '1.2rem 2rem', fontWeight: '700' }}>Date</th>
                          <th style={{ padding: '1.2rem 2rem', fontWeight: '700' }}>Customer</th>
                          <th style={{ padding: '1.2rem 2rem', fontWeight: '700' }}>Status</th>
                          <th style={{ padding: '1.2rem 2rem', fontWeight: '700', textAlign: 'right' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order) => {
                          const statusColor = getStatusColor(order.status);
                          return (
                            <tr key={order.id} style={{ borderBottom: '1px solid rgba(0, 11, 41, 0.05)' }}>
                              <td style={{ padding: '1.5rem 2rem', color: 'var(--navy)', fontWeight: '700', fontSize: '1rem' }}>...{order.id.slice(-6)}</td>
                              <td style={{ padding: '1.5rem 2rem', color: 'var(--gray-dark)', fontSize: '0.95rem', fontWeight: '500' }}>{new Date(order.date).toLocaleDateString()}</td>
                              <td style={{ padding: '1.5rem 2rem' }}>
                                <div style={{ fontWeight: '700', color: 'var(--navy)' }}>{order.customer?.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>{order.customer?.email}</div>
                              </td>
                              <td style={{ padding: '1.5rem 2rem' }}>
                                <span style={{ padding: '0.4rem 1rem', background: statusColor.bg, color: statusColor.text, border: statusColor.border, borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  {order.status || 'Pending'}
                                </span>
                              </td>
                              <td style={{ padding: '1.5rem 2rem', fontWeight: '800', color: 'var(--navy)', textAlign: 'right', fontSize: '1.1rem' }}>
                                R {(order.total || 0).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                        {orders.length === 0 && (
                          <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--gray-dark)', fontWeight: '600' }}>No orders placed yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'var(--white)', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 11, 41, 0.05)', border: '1px solid rgba(0, 11, 41, 0.05)', overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(0, 11, 41, 0.02)', color: 'var(--gray-dark)', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Order Details</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Customer</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Amount</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Status</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700', textAlign: 'right' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const isExpanded = expandedOrder === order.id;
                        const statusColor = getStatusColor(order.status);
                        return (
                          <React.Fragment key={order.id}>
                            <tr style={{ borderBottom: isExpanded ? 'none' : '1px solid rgba(0, 11, 41, 0.05)', background: isExpanded ? 'rgba(0, 11, 41, 0.02)' : 'var(--white)', transition: 'background 0.2s' }}>
                              <td style={{ padding: '1.5rem 2rem' }}>
                                <div style={{ color: 'var(--navy)', fontWeight: '800', fontSize: '1.05rem', marginBottom: '6px' }}>#{order.id}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--gray-dark)', fontWeight: '500' }}>
                                  <Calendar size={14} /> {new Date(order.date).toLocaleDateString()} &bull; <Clock size={14} /> {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                              </td>
                              <td style={{ padding: '1.5rem 2rem' }}>
                                <div style={{ fontWeight: '700', color: 'var(--navy)' }}>{order.customer?.name}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--gray-dark)' }}>{order.customer?.email}</div>
                              </td>
                              <td style={{ padding: '1.5rem 2rem', fontWeight: '800', color: 'var(--navy)', fontSize: '1.1rem' }}>
                                R {(order.total || 0).toFixed(2)}
                              </td>
                              <td style={{ padding: '1.5rem 2rem' }}>
                                <select 
                                  value={order.status || 'Pending'}
                                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                  style={{ 
                                    padding: '0.5rem 1rem', 
                                    background: statusColor.bg, 
                                    color: statusColor.text, 
                                    border: statusColor.border,
                                    borderRadius: '20px', 
                                    fontSize: '0.8rem', 
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    appearance: 'none'
                                  }}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                <button 
                                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                  className={isExpanded ? "" : "btn-primary"}
                                  style={{ 
                                    background: isExpanded ? 'rgba(0,11,41,0.1)' : 'var(--lime)', 
                                    color: 'var(--navy)', 
                                    border: 'none', 
                                    padding: '0.6rem 1.2rem', 
                                    borderRadius: '8px', 
                                    fontWeight: '700', 
                                    fontSize: '0.85rem', 
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                  }}
                                >
                                  {isExpanded ? 'Hide Details' : 'View Details'}
                                </button>
                              </td>
                            </tr>
                            
                            {/* Expandable Details Section */}
                            {isExpanded && (
                              <tr style={{ borderBottom: '1px solid rgba(0, 11, 41, 0.1)', background: 'rgba(0, 11, 41, 0.02)' }}>
                                <td colSpan={5} style={{ padding: '0 2rem 2.5rem 2rem' }}>
                                  <div style={{ background: 'var(--white)', border: '1px solid rgba(0, 11, 41, 0.1)', borderRadius: '12px', padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                                    
                                    <div style={{ flex: '1 1 300px' }}>
                                      <h4 style={{ color: 'var(--navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        <Package size={20} color="var(--lime)" /> Items Ordered
                                      </h4>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {order.items?.map((item, idx) => (
                                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px dashed rgba(0, 11, 41, 0.1)' }}>
                                            <div style={{ fontSize: '0.95rem', color: 'var(--navy)', fontWeight: '600' }}>
                                              <span style={{ fontWeight: '900', color: 'var(--lime)', marginRight: '12px', background: 'var(--navy)', padding: '2px 8px', borderRadius: '4px' }}>{item.qty}x</span> 
                                              {item.title}
                                            </div>
                                            <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--navy)' }}>R {(item.priceNum * item.qty).toFixed(2)}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div style={{ flex: '1 1 300px' }}>
                                      <h4 style={{ color: 'var(--navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        <MapPin size={20} color="var(--lime)" /> Shipping Details
                                      </h4>
                                      <div style={{ background: 'var(--navy)', color: 'var(--white)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.95rem', lineHeight: '1.8', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                        <div style={{ fontWeight: '800', color: 'var(--lime)', marginBottom: '8px', fontSize: '1.1rem', textTransform: 'uppercase' }}>{order.customer?.name}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.8)' }}>{order.customer?.address}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>{order.customer?.city}</div>
                                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--white)', fontWeight: '600' }}><Phone size={16} color="var(--lime)" /> {order.customer?.phone}</div>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--white)', fontWeight: '600' }}><Mail size={16} color="var(--lime)" /> {order.customer?.email}</div>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                      {orders.length === 0 && (
                        <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--gray-dark)', fontWeight: '600' }}>No orders found.</td></tr>
                      )}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}

              {/* CUSTOMERS TAB */}
              {activeTab === 'customers' && (
                <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'var(--white)', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 11, 41, 0.05)', border: '1px solid rgba(0, 11, 41, 0.05)', overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(0, 11, 41, 0.02)', color: 'var(--gray-dark)', textAlign: 'left', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Customer Name</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Email Address</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Phone</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Joined Date</th>
                        <th style={{ padding: '1.5rem 2rem', fontWeight: '700' }}>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id} style={{ borderBottom: '1px solid rgba(0, 11, 41, 0.05)' }}>
                          <td style={{ padding: '1.5rem 2rem', color: 'var(--navy)', fontWeight: '700' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(0,11,41,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'var(--navy)', border: '1px solid rgba(0,11,41,0.1)' }}>
                                {customer.displayName?.charAt(0).toUpperCase() || '?'}
                              </div>
                              {customer.displayName || 'Anonymous'}
                            </div>
                          </td>
                          <td style={{ padding: '1.5rem 2rem', color: 'var(--gray-dark)', fontWeight: '500' }}>{customer.email}</td>
                          <td style={{ padding: '1.5rem 2rem', color: 'var(--gray-dark)', fontWeight: '500' }}>{customer.phone || 'N/A'}</td>
                          <td style={{ padding: '1.5rem 2rem', color: 'var(--gray-dark)', fontWeight: '500' }}>
                            {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td style={{ padding: '1.5rem 2rem' }}>
                            {customer.email === 'admin@repairtech.co.za' ? (
                              <span style={{ padding: '0.4rem 1rem', background: 'var(--navy)', color: 'var(--lime)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Admin
                              </span>
                            ) : (
                              <span style={{ padding: '0.4rem 1rem', background: 'rgba(0,11,41,0.05)', color: 'var(--navy)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                User
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {customers.length === 0 && (
                        <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--gray-dark)', fontWeight: '600' }}>No customers found.</td></tr>
                      )}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}

            </>
          )}

        </main>
      </div>

    </div>
  );
}
