
import React, { useState } from 'react';
import {
    CreditCard,
    Crown,
    Zap,
    Rocket,
    CheckCircle,
    Star,
    ArrowRight,
    Shield,
    Clock,
    Users,
    Sparkles,
    BadgeCheck,
    Receipt,
    ChevronDown,
    ChevronUp,
    TrendingUp,
    Gift,
    Lock,
    X,
    Loader2
} from 'lucide-react';
import { UserSubscription, SubscriptionPlan, PaymentRecord } from '../types';
import { SUBSCRIPTION_PLANS, MOCK_PAYMENT_HISTORY } from '../constants';

interface SubscriptionViewProps {
    subscription: UserSubscription;
    onUpgrade: (tier: 'starter' | 'pro' | 'elite') => void;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ subscription, onUpgrade }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [showHistory, setShowHistory] = useState(false);
    const [processingPlan, setProcessingPlan] = useState<string | null>(null);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    const tierOrder: Record<string, number> = { free: 0, starter: 1, pro: 2, elite: 3 };

    const getTierIcon = (tier: string) => {
        switch (tier) {
            case 'starter': return Zap;
            case 'pro': return Rocket;
            case 'elite': return Crown;
            default: return Gift;
        }
    };

    const getTierGradient = (tier: string) => {
        switch (tier) {
            case 'starter': return 'from-blue-500 to-cyan-500';
            case 'pro': return 'from-purple-500 to-pink-500';
            case 'elite': return 'from-yellow-500 to-orange-500';
            default: return 'from-slate-500 to-slate-600';
        }
    };

    const getTierBorder = (tier: string) => {
        switch (tier) {
            case 'starter': return 'border-blue-500/30 hover:border-blue-500/60';
            case 'pro': return 'border-purple-500/30 hover:border-purple-500/60';
            case 'elite': return 'border-yellow-500/30 hover:border-yellow-500/60';
            default: return 'border-slate-700';
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR').format(price);
    };

    const handleSelectPlan = (plan: SubscriptionPlan) => {
        if (tierOrder[plan.tier] <= tierOrder[subscription.currentTier]) return;
        setSelectedPlan(plan);
        setShowCheckoutModal(true);
    };

    const handleConfirmUpgrade = async () => {
        if (!selectedPlan) return;
        setProcessingPlan(selectedPlan.id);
        setShowCheckoutModal(false);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        onUpgrade(selectedPlan.tier as 'starter' | 'pro' | 'elite');
        setProcessingPlan(null);
        setSelectedPlan(null);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <header className="mb-16">
                <div className="flex items-center gap-3 text-blue-500 text-[10px] font-mono font-black mb-4 uppercase tracking-[0.3em]">
                    <CreditCard className="w-4 h-4" />
                    <span>Gestion de l'Abonnement</span>
                </div>
                <h2 className="text-5xl font-black tracking-tighter mb-4 text-white">
                    Votre Abonnement
                </h2>
                <p className="max-w-xl font-medium text-lg leading-relaxed text-slate-400">
                    Débloquez tout le potentiel de ChainAcademy avec un abonnement adapté à vos ambitions.
                </p>
            </header>

            {/* Current Plan Card */}
            <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/50 mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getTierGradient(subscription.currentTier)} flex items-center justify-center shadow-2xl`}>
                            {React.createElement(getTierIcon(subscription.currentTier), { className: 'w-8 h-8 text-white' })}
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Plan Actuel</span>
                            <h3 className="text-2xl font-black text-white">{subscription.planName}</h3>
                            {subscription.currentTier !== 'free' && subscription.nextBillingDate && (
                                <p className="text-sm text-slate-400 mt-1">
                                    Prochain renouvellement : <span className="text-white font-bold">{subscription.nextBillingDate}</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {subscription.isActive && subscription.currentTier !== 'free' && (
                            <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20 flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4" /> Actif
                            </span>
                        )}
                        {subscription.currentTier === 'free' && (
                            <span className="px-4 py-2 rounded-full bg-slate-800 text-slate-400 text-xs font-black uppercase tracking-widest border border-slate-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Plan Gratuit
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
                <div className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-2xl p-1.5">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        Mensuel
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        Annuel
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black">-17%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {SUBSCRIPTION_PLANS.map((plan) => {
                    const TierIcon = getTierIcon(plan.tier);
                    const isCurrentPlan = subscription.currentTier === plan.tier;
                    const isDowngrade = tierOrder[plan.tier] < tierOrder[subscription.currentTier];
                    const isUpgrade = tierOrder[plan.tier] > tierOrder[subscription.currentTier];
                    const displayPrice = billingCycle === 'yearly' && plan.yearlyPrice
                        ? Math.round(plan.yearlyPrice / 12)
                        : plan.price;
                    const isProcessing = processingPlan === plan.id;

                    return (
                        <div
                            key={plan.id}
                            className={`relative border rounded-3xl p-8 transition-all duration-300 ${plan.isPopular ? 'scale-105 z-10' : ''} ${getTierBorder(plan.tier)} ${isCurrentPlan ? 'ring-2 ring-blue-500/50' : ''}`}
                            style={{ backgroundColor: '#0a0f1a' }}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="px-5 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-purple-500/30 flex items-center gap-1.5">
                                        <Star className="w-3 h-3" /> Plus Populaire
                                    </span>
                                </div>
                            )}

                            {/* Current Badge */}
                            {isCurrentPlan && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="px-5 py-1.5 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 flex items-center gap-1.5">
                                        <CheckCircle className="w-3 h-3" /> Plan Actuel
                                    </span>
                                </div>
                            )}

                            {/* Tier Icon & Name */}
                            <div className="text-center mb-8 pt-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getTierGradient(plan.tier)} flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                                    <TierIcon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-1">{plan.name}</h3>
                            </div>

                            {/* Price */}
                            <div className="text-center mb-8">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-black text-white">{formatPrice(displayPrice)}</span>
                                    <span className="text-sm text-slate-500 font-bold">FCFA</span>
                                </div>
                                <span className="text-xs text-slate-500">par mois</span>
                                {billingCycle === 'yearly' && plan.yearlyPrice && (
                                    <div className="mt-1">
                                        <span className="text-xs text-slate-600 line-through">{formatPrice(plan.price * 12)} FCFA/an</span>
                                        <span className="text-xs text-emerald-400 ml-2">{formatPrice(plan.yearlyPrice)} FCFA/an</span>
                                    </div>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="text-sm text-slate-300 flex items-start gap-3">
                                        <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${plan.tier === 'elite' ? 'text-yellow-400' : plan.tier === 'pro' ? 'text-purple-400' : 'text-blue-400'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                onClick={() => handleSelectPlan(plan)}
                                disabled={isCurrentPlan || isDowngrade || isProcessing}
                                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${isCurrentPlan
                                    ? 'bg-slate-800 text-slate-500 cursor-default'
                                    : isDowngrade
                                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                        : isProcessing
                                            ? 'bg-blue-500/50 text-white cursor-wait'
                                            : `bg-gradient-to-r ${getTierGradient(plan.tier)} text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95`
                                    }`}
                            >
                                {isProcessing ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Traitement...</>
                                ) : isCurrentPlan ? (
                                    <><CheckCircle className="w-5 h-5" /> Plan Actuel</>
                                ) : isDowngrade ? (
                                    'Non disponible'
                                ) : (
                                    <><ArrowRight className="w-5 h-5" /> Passer au {plan.name}</>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Feature Comparison */}
            <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/50 mb-12">
                <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Comparaison des Plans
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="text-left text-xs font-bold uppercase tracking-widest text-slate-500 pb-4 pr-4">Fonctionnalité</th>
                                <th className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 pb-4 px-4">Gratuit</th>
                                <th className="text-center text-xs font-bold uppercase tracking-widest text-blue-400 pb-4 px-4">Starter</th>
                                <th className="text-center text-xs font-bold uppercase tracking-widest text-purple-400 pb-4 px-4">Pro</th>
                                <th className="text-center text-xs font-bold uppercase tracking-widest text-yellow-400 pb-4 px-4">Elite</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { feature: 'Modules accessibles', free: '2', starter: '4', pro: 'Illimité', elite: 'Illimité' },
                                { feature: 'Tuteur IA', free: '✓', starter: '✓', pro: '✓', elite: '✓' },
                                { feature: 'Portfolio', free: 'Basique', starter: '✓', pro: 'Avancé', elite: 'Avancé' },
                                { feature: 'Sessions Coach', free: '—', starter: '—', pro: '2/mois', elite: '8/mois' },
                                { feature: 'Certifications', free: '—', starter: '—', pro: '✓', elite: '✓' },
                                { feature: 'IDE Collaboratif', free: '—', starter: '—', pro: '✓', elite: '✓' },
                                { feature: 'Certificat On-Chain', free: '—', starter: '—', pro: '—', elite: '✓' },
                                { feature: 'Support', free: 'Communauté', starter: 'Communauté', pro: 'Prioritaire', elite: '24/7' },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-slate-800/50">
                                    <td className="py-4 pr-4 font-medium text-slate-300">{row.feature}</td>
                                    <td className="py-4 px-4 text-center text-slate-500">{row.free}</td>
                                    <td className="py-4 px-4 text-center text-slate-300">{row.starter}</td>
                                    <td className="py-4 px-4 text-center text-slate-300">{row.pro}</td>
                                    <td className="py-4 px-4 text-center text-slate-300">{row.elite}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment History */}
            <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/50">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full flex items-center justify-between"
                >
                    <h3 className="text-xl font-black text-white flex items-center gap-3">
                        <Receipt className="w-5 h-5 text-blue-400" />
                        Historique des Paiements
                    </h3>
                    {showHistory ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>

                {showHistory && (
                    <div className="mt-8 space-y-3">
                        {MOCK_PAYMENT_HISTORY.map((record) => (
                            <div
                                key={record.id}
                                className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/30"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${record.type === 'subscription' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                        {record.type === 'subscription' ? <CreditCard className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">{record.description}</p>
                                        <p className="text-xs text-slate-500">{record.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-white">{formatPrice(record.amount)} <span className="text-xs text-slate-500">FCFA</span></p>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${record.status === 'completed' ? 'text-emerald-400' : record.status === 'pending' ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {record.status === 'completed' ? 'Payé' : record.status === 'pending' ? 'En attente' : 'Échoué'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Checkout Modal */}
            {showCheckoutModal && selectedPlan && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-white">Confirmer l'Abonnement</h3>
                            <button onClick={() => setShowCheckoutModal(false)} className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Plan Summary */}
                        <div className="border border-slate-800 rounded-2xl p-6 mb-6 bg-slate-800/30">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTierGradient(selectedPlan.tier)} flex items-center justify-center`}>
                                    {React.createElement(getTierIcon(selectedPlan.tier), { className: 'w-6 h-6 text-white' })}
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-lg">Plan {selectedPlan.name}</h4>
                                    <p className="text-sm text-slate-400">{billingCycle === 'yearly' ? 'Facturation annuelle' : 'Facturation mensuelle'}</p>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-white">
                                    {formatPrice(billingCycle === 'yearly' && selectedPlan.yearlyPrice ? selectedPlan.yearlyPrice : selectedPlan.price)}
                                </span>
                                <span className="text-sm text-slate-500 font-bold">FCFA / {billingCycle === 'yearly' ? 'an' : 'mois'}</span>
                            </div>
                        </div>

                        {/* Mock Payment Form */}
                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Numéro de carte</label>
                                <input
                                    type="text"
                                    placeholder="4242 4242 4242 4242"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">Expiration</label>
                                    <input
                                        type="text"
                                        placeholder="MM/AA"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">CVC</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition-colors text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmUpgrade}
                            className={`w-full bg-gradient-to-r ${getTierGradient(selectedPlan.tier)} text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-0.5 active:scale-95`}
                        >
                            <Shield className="w-5 h-5" />
                            Payer {formatPrice(billingCycle === 'yearly' && selectedPlan.yearlyPrice ? selectedPlan.yearlyPrice : selectedPlan.price)} FCFA
                        </button>

                        <p className="text-center text-xs text-slate-600 mt-4 flex items-center justify-center gap-1">
                            <Shield className="w-3 h-3" /> Paiement sécurisé — Annulable à tout moment
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionView;
