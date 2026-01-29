"use client";

import React, { useState, useEffect } from 'react';
import {
    Frown,
    Zap,
    Thermometer,
    Activity,
    Utensils,
    User,
    TrendingUp,
    Calendar,
    ChevronRight
} from 'lucide-react';

const STATIC_QUESTIONS = [
    { id: 'nausea', title: 'Náusea', question: 'Prevalencia y severidad del síntoma', icon: <Frown size={24} /> },
    { id: 'vomitos', title: 'Vómitos', question: '¿Has presentado vómitos...?', icon: <Activity size={24} /> },
    { id: 'estrenimiento', title: 'Estreñimiento', question: '¿Has tenido estreñimiento importante?', icon: <Zap size={24} /> },
    { id: 'dolor', title: 'Dolor abdominal', question: '¿Has presentado dolor abdominal?', icon: <Thermometer size={24} /> },
    { id: 'comidas', title: 'Ingesta de alimentos', question: '¿cuántas comidas completas...?', icon: <Utensils size={24} /> },
    { id: 'estado', title: 'Estado general', question: '¿Cómo te has sentido...?', icon: <User size={24} /> }
];

const PERIODS = [
    { label: 'Últimos 7 días', value: 7 },
    { label: 'Últimos 30 días', value: 30 },
    { label: 'Últimos 90 días', value: 90 },
    { label: 'Todo el tiempo', value: 0 },
    { label: 'Rango Personalizado', value: -1 },
];

export default function Dashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(30);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            let url = `/api/stats?days=${days}`;
            if (days === -1) {
                if (startDate) url += `&startDate=${startDate}`;
                if (endDate) url += `&endDate=${endDate}`;
            }
            const res = await fetch(url);
            const json = await res.json();
            if (json.success) {
                setStats(json.data);
            }
        } catch (err) {
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (days !== -1) {
            fetchData();
        }
    }, [days]);

    const handleApplyCustomRange = () => {
        fetchData();
    };

    return (
        <main className="container">
            {/* Top Navbar Style Header */}
            <header className="header-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                        src="/logo.png"
                        alt="Ana Teniente Logo"
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c' }}>
                        Reporte de Seguimiento: Pacientes con Análogos GLP-1
                    </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid #e2e8f0', paddingLeft: '2rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Dra. Ana Teniente - Endocrinóloga</p>
                            <p style={{ fontSize: '0.75rem', color: '#a0aec0' }}>Panel Médico Especializado</p>
                        </div>
                        <img
                            src="/logo.png"
                            alt="Dra. Ana Teniente"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '2px solid var(--primary)',
                                padding: '2px',
                                background: 'white',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* Main Title and Filter Bar */}
            <div style={{ marginBottom: '3rem' }}>
                <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: '#1a202c' }}>Monitoreo Médico Detallado</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Análisis de efectos secundarios y adherencia al tratamiento GLP-1.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {/* Period Selector */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '12px', boxShadow: 'var(--shadow-premium)', border: '1px solid #e2e8f0' }}>
                            <Calendar size={18} color="var(--primary)" />
                            <select
                                value={days}
                                onChange={(e) => setDays(parseInt(e.target.value))}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    fontWeight: '600',
                                    color: '#4a5568',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {PERIODS.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="stat-pill">
                            <span className="stat-label">Pacientes</span>
                            <span className="stat-value">{stats?.total || 0}</span>
                        </div>
                    </div>
                </section>

                {/* Custom Range Inputs */}
                {days === -1 && (
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        alignItems: 'center',
                        background: 'white',
                        padding: '1.2rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        border: '1px solid #edf2f7',
                        width: 'fit-content',
                        animation: 'fadeIn 0.3s ease-out'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Desde</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem', fontSize: '0.9rem', outline: 'none' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hasta</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem', fontSize: '0.9rem', outline: 'none' }}
                            />
                        </div>
                        <button
                            onClick={handleApplyCustomRange}
                            className="btn-primary"
                            style={{ alignSelf: 'flex-end', padding: '0.6rem 1.5rem', borderRadius: '10px', fontSize: '0.9rem' }}
                        >
                            Aplicar Rango
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', color: 'var(--primary)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', animation: 'spin 1s linear infinite' }}>
                            <Activity size={40} />
                        </div>
                        <p style={{ fontWeight: '500' }}>Actualizando datos...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Grid of Question Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {STATIC_QUESTIONS.map((q) => {
                            const questionStats = stats?.stats?.[q.id] || [];
                            return (
                                <div key={q.id} className="card card-question">
                                    <div className="icon-wrapper">
                                        {q.icon}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{q.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem', fontStyle: 'italic' }}>{q.question}</p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: 'auto' }}>
                                        {questionStats.map((opt: any, idx: number) => (
                                            <div key={idx}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                                    <span style={{ color: '#4a5568' }}>{opt.label}</span>
                                                    <span style={{ fontWeight: '700', color: '#2d3748' }}>{opt.percent}%</span>
                                                </div>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${opt.percent}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Conclusion Banner */}
                    <section className="card" style={{
                        background: 'linear-gradient(to right, rgba(134, 37, 130, 0.03), rgba(182, 102, 179, 0.03))',
                        border: '1px solid rgba(134, 37, 130, 0.1)',
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                        padding: '2.5rem 3rem'
                    }}>
                        <div style={{
                            background: 'var(--primary)',
                            width: '64px',
                            height: '64px',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            flexShrink: 0,
                            boxShadow: '0 8px 16px rgba(134, 37, 130, 0.2)'
                        }}>
                            <TrendingUp size={32} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Conclusión del Periodo</h3>
                            <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                                El monitoreo clínico bajo la supervisión de la <strong>Dra. Ana Teniente</strong> indica que los pacientes reportan un perfil de síntomas manejable durante este periodo, favoreciendo la adherencia.
                            </p>
                        </div>
                    </section>
                </>
            )}

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>

            <footer style={{ marginTop: '6rem', borderTop: '1px solid #e2e8f0', padding: '3rem 0', textAlign: 'center', color: '#a0aec0', fontSize: '0.9rem' }}>
                &copy; 2024 at - Dra. Ana Teniente - Plataforma de Seguimiento Metabólico. Todos los derechos reservados.
            </footer>
        </main>
    );
}
