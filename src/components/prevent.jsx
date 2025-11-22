import React, { useState } from 'react';
import { Activity, HeartPulse, TrendingUp, Shield, Phone, MessageSquare,BarChart3, ChevronRight} from 'lucide-react';

const PreventionPage = ({ setCurrentPage }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const preventionSections = [
    {
      id: 'depistage',
      icon: Activity,
      title: 'Dépistage Précoce',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      items: [
        { title: 'À partir de 50 ans', desc: 'Tous les hommes devraient commencer le dépistage à 50 ans avec un dosage PSA et un toucher rectal annuel.' },
        { title: 'À partir de 45 ans si à risque', desc: 'Antécédents familiaux (père, frère atteint) ou origine africaine : commencer le dépistage dès 45 ans.' },
        { title: 'Consultation urologique', desc: 'Consultez un urologue au moindre symptôme : difficulté à uriner, sang dans les urines, douleurs pelviennes.' },
        { title: 'Suivi régulier', desc: 'Le dépistage doit être annuel. Un cancer détecté tôt a 98% de chances de guérison complète.' }
      ]
    },
    {
      id: 'alimentation',
      icon: HeartPulse,
      title: 'Alimentation Protectrice',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      items: [
        { title: 'Tomates et lycopène', desc: 'Consommez des tomates cuites (sauce, concentré). Le lycopène réduit significativement les risques.' },
        { title: 'Légumes crucifères', desc: 'Brocoli, chou-fleur, choux : riches en sulforaphane, ils protègent contre les cellules cancéreuses.' },
        { title: 'Poissons gras', desc: 'Saumon, sardines, maquereau : oméga-3 anti-inflammatoires qui réduisent la progression tumorale.' },
        { title: 'Thé vert et curcuma', desc: 'Antioxydants puissants. 3 tasses de thé vert par jour + curcuma dans les plats.' },
        { title: 'Limiter la viande rouge', desc: 'Réduire la consommation de viande rouge et éviter les viandes transformées (charcuterie).' }
      ]
    },
    {
      id: 'activite',
      icon: TrendingUp,
      title: 'Activité Physique',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      items: [
        { title: '150 minutes par semaine', desc: 'Activité modérée : marche rapide, vélo, natation. Ou 75 min d\'activité intense (course, sport).' },
        { title: 'Musculation 2x/semaine', desc: 'Renforcement musculaire pour maintenir un poids santé et réduire l\'inflammation.' },
        { title: 'Éviter la sédentarité', desc: 'Levez-vous toutes les heures si travail de bureau. La position assise prolongée augmente les risques.' },
        { title: 'Sport et testostérone', desc: 'L\'exercice régule naturellement les hormones et améliore la santé de la prostate.' }
      ]
    },
    {
      id: 'facteurs',
      icon: Shield,
      title: 'Facteurs de Risque à Éviter',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
      items: [
        { title: 'Tabac et alcool', desc: 'Arrêter le tabac immédiatement. Limiter la consommation excessive d\'alcool.' },
        { title: 'Obésité', desc: 'Maintenir un IMC entre 18.5 et 25. L\'obésité double le risque de cancer agressif.' },
        { title: 'Exposition aux pesticides', desc: 'Privilégier les aliments bio. Les agriculteurs ont un risque accru : porter des protections.' },
        { title: 'Stress chronique', desc: 'Le stress affaiblit le système immunitaire. Pratiquer méditation, yoga, relaxation.' }
      ]
    }
  ];

  const stats = [
    { value: '98%', label: 'Survie si détecté tôt', icon: Activity, color: 'blue' },
    { value: '-45%', label: 'Risque avec exercice', icon: TrendingUp, color: 'blue' },
    { value: '-30%', label: 'Risque avec tomates', icon: HeartPulse, color: 'blue' },
    { value: '50 ans', label: 'Âge du 1er dépistage', icon: Shield, color: 'blue' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-60 via-blue to-blue-50 py-16">
      
      {/* ========== CONTAINER PRINCIPAL CENTRÉ ========== */}
      <div className="w-350 flex justify-center">
        <div className="w-full max-w-5xl px-8 md:px-12 lg:px-16">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6">
              <Shield className="w-4 h-4" />
              Prévention Active
            </div>
            <h1 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight animate-zoom-in-light">
              Prévenez le Cancer de la <span className="text-blue-600">Prostate</span>
            </h1>
            <p className="text-right duration-5000 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed justify-between items-center">4 piliers essentiels pour réduire vos risques jusqu'à <span className="font-bold text-green-600">70%</span>. Adoptez ces habitudes dès aujourd'hui, c'est votre meilleure assurance-vie.
            </p>
          </div>

          {/* Stats Clés - CENTRÉES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 animate-bounce">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl p-6 shadow-lg border-t-4 border-${stat.color}-500 hover:shadow-xl transition-all transform hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Sections de Prévention - ESPACÉES ET CENTRÉES */}
          <div className="flex flex-col gap-8">
            {preventionSections.map((section) => (
              <div key={section.id} className="bg-white p-6 rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                {/* Header */}
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors "
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl md:text-xl font-bold text-gray-900">{section.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{section.items.length} actions essentielles</p>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                      expandedSection === section.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {/* Content */}
                {expandedSection === section.id && (
                  <div className="px-8 pb-8">
                    <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                      {section.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx}
                          className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 bg-${section.color}-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <span className={`text-${section.color}-600 font-bold`}>{itemIdx + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-600 mb-2 text-lg">{item.title}</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action - CENTRÉ */}
          <div className="mt-16 bg-gradient-to-r from-blue-300 to-blue-800 rounded-3xl p-10 md:p-14 text-center text-white shadow-2xl animate-pulse">
            <HeartPulse className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Votre Santé, Votre Responsabilité</h3>
            <p className="text-white-00 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-align:center">
              La prévention commence maintenant. Parlez-en à votre médecin, faites vos examens, adoptez un mode de vie sain.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage && setCurrentPage('chatbot')}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Posez vos questions à WarriorAI
              </button>
              <button 
                onClick={() => setCurrentPage && setCurrentPage('dashboard')}
                className="px-8 py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-600 transition-all border-2 border-white/30 flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                Voir les statistiques
              </button>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PreventionPage;