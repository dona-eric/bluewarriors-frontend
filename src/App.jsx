import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Activity, Users, TrendingUp, Globe, Menu, X, MessageSquare, 
  Home, BarChart3, Shield, Phone, Mail, MapPin, HeartPulse, Hospital, 
  ChevronRight, Facebook, Twitter, Instagram, Linkedin, ExternalLink 
} from 'lucide-react';

// NOTE: Assurez-vous que l'API tourne sur ce port.
const API_BASE_URL = 'http://localhost:8000/api/v1';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // --- Données (States) ---
  const [stats] = useState({
    totalCases: 1414259,
    deaths: 375304,
    incidenceRate: 29.3,
    mortalityRate: 7.7,
    survivalRate: 98.5,
    screeningRate: 65.2
  });

  const [countryData] = useState([
    { country: 'États-Unis', cases: 268490, deaths: 34500, population: 331900000 },
    { country: 'France', cases: 50430, deaths: 8100, population: 67390000 },
    { country: 'Allemagne', cases: 58800, deaths: 13300, population: 83240000 },
    { country: 'Royaume-Uni', cases: 52300, deaths: 12000, population: 67330000 },
    { country: 'Espagne', cases: 35126, deaths: 5800, population: 47350000 },
    { country: 'Bénin', cases: 2450, deaths: 380, population: 13350000 }
  ]);

  const [yearlyData] = useState([
    { year: '2019', cases: 1276106, deaths: 358989 },
    { year: '2020', cases: 1341050, deaths: 366131 },
    { year: '2021', cases: 1375300, deaths: 371750 },
    { year: '2022', cases: 1392500, deaths: 373800 },
    { year: '2023', cases: 1405200, deaths: 374950 },
    { year: '2024', cases: 1414259, deaths: 375304 }
  ]);

  // Auto-scroll pour le chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  // --- Logique Chatbot ---
  const sendQuestion = async () => {
    if (!currentQuestion.trim()) return;

    const userMessage = { type: 'user', text: currentQuestion };
    setChatMessages(prev => [...prev, userMessage]);
    const questionText = currentQuestion;
    setCurrentQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ask/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: questionText })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        type: 'bot',
        text: data.Reponse || data.reponse || "Réponse non disponible",
        sources: data.Sources || data.sources || [],
        sourcesExpanded: false
      };

      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur API:', error);
      const errorMessage = {
        type: 'bot',
        text: error.message.includes('Failed to fetch') 
          ? 'Impossible de se connecter au serveur. Vérifiez que l\'API est démarrée sur http://localhost:8000'
          : `Désolé, une erreur est survenue : ${error.message}`,
        error: true
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSources = (messageIndex) => {
    setChatMessages(prev => prev.map((msg, idx) => 
      idx === messageIndex ? { ...msg, sourcesExpanded: !msg.sourcesExpanded } : msg
    ));
  };

  // --- Composants de Page ---

  const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        title: "Novembre Bleu 2025",
        subtitle: "Agir aujourd’hui, c’est sauver une vie demain. Ensemble contre le cancer de la prostate.",
        description: "Sensibilisation, Prévention et Accompagnement pour tous.",
        cta: "Rejoindre le mouvement",
        color: "from-blue-400 to-blue-700"
      },
      {
        title: "Dépistage = Vie Sauvée",
        subtitle: "Un simple test peut sauver votre vie ou celle d’un proche.",
        description: "Le dépistage précoce augmente les chances de guérison à plus de 90%.",
        cta: "En savoir plus",
        color: "from-indigo-400 to-blue-800"
      },
      {
        title: "Accompagnement IA",
        subtitle: "WarriorAI vous écoute, vous rassure et vous informe, 24h/24.",
        description: "Posez vos questions sans gêne:vous n’êtes jamais seul dans ce combat.",
        cta:"Discuter avec Warrior",
        action: () => setCurrentPage('chatbot'),
        color: "from-blue-400 to-cyan-700"
      }
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="min-h-screen animate-slide-up">
        {/* Hero Section Améliorée */}
        <div className={`relative h-[650px] bg-gradient-to-br ${slides[currentSlide].color} overflow-hidden transition-all duration-[2000ms] ease-out`}>
          {/* Pattern de fond */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-10 px-4 max-w-5xl mx-auto">
              <div className="inline-block mb-4 px-4 py-5 rounded-full bg-white/10 shadow-md backdrop-blur-md text-sm tracking-wide uppercase animate-slide-soft border border-white/20">
                Campagne de Sensibilisation
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg animate-fade-in">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 font-medium text-white max-w-3xl mx-auto leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-slide-soft">
                <button 
                  onClick={slides[currentSlide].action || (() => {})}
                  className="px-8 py-4 text-blue-200 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group"
                >
                  {slides[currentSlide].cta}
                  <ChevronRight className="w-5 h-10 group-hover:translate-x-1 transition-transform" />
                </button>
                {/* <button className="px-8 py-4 bg-white/10 backdrop-blur-xl text-blue font-semibold rounded-full shadow-lg hover:bg-white/20 active:scale-95 transition-all duration-300">
                  Faire un don
                </button> */}
              </div>
              
              {/* Indicateurs de slide */}
              <div className="flex justify-center gap-3 mt-12">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentSlide ? 'bg-white w-12' : 'bg-white/30 w-3 hover:bg-white/60'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Cards */}
        <div className="max-w-15xl mx-auto px-4 -mt-20 relative z-20 pb-16">
          <div className="grid md:grid-cols-3 gap-15">
            {[
              { 
                id: 'chatbot', 
                title: 'WarriorAI', 
                desc: 'Posez vos questions médicales à notre intelligence artificielle spécialisée.', 
                icon: MessageSquare, 
                color: 'blue' 
              },
              { 
                id: 'dashboard', 
                title: 'Statistiques', 
                desc: 'Visualisez les données mondiales en temps réel pour mieux comprendre les enjeux.', 
                icon: BarChart3, 
                color: 'purple' 
              },
              { 
                id: 'prevention', 
                title: 'Prévention', 
                desc: 'Découvrez les gestes simples et les habitudes de vie pour réduire les risques.', 
                icon: Shield, 
                color: 'green' 
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                onClick={() => card.id !== 'prevention' && setCurrentPage(card.id)}
                className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-t-4 border-${card.color}-500 group`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-${card.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-8 h-8 text-${card.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-between">
                  {card.title}
                  <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all" />
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview Section */}
        <div className="bg-blue-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Impact Chiffres 2024</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprendre l'ampleur pour mieux agir. Voici les indicateurs clés de la lutte mondiale.
              </p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-10">
              {[
                { icon: Users, label: 'Cas Mondiaux', value: stats.totalCases.toLocaleString(), color: 'blue' },
                { icon: Activity, label: 'Décès', value: stats.deaths.toLocaleString(), color: 'red' },
                { icon: TrendingUp, label: 'Incidence', value: stats.incidenceRate, sub: '/100k', color: 'orange' },
                { icon: Globe, label: 'Mortalité', value: stats.mortalityRate, sub: '/100k', color: 'purple' },
                { icon: HeartPulse, label: 'Taux Survie', value: `${stats.survivalRate}%`, color: 'green' },
                { icon: Hospital, label: 'Dépistage', value: `${stats.screeningRate}%`, color: 'teal' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-blue rounded-xl p-10 shadow-sm hover:shadow-md transition-all border border-blue-800 text-center group">
                  <stat.icon className={`w-10 h-10 text-${stat.color}-600 mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <p className="text-2xl font-extrabold text-dark-800">{stat.value}</p>
                  {stat.sub && <span className="text-xs text-dark-400">{stat.sub}</span>}
                  <p className="text-sm font-medium text-dark-500 mt-5 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatbotPage = () => {
    const suggestedQuestions = [
      "Quels sont les symptômes ?",
      "Quand faire un dépistage ?",
      "Traitements disponibles ?",
      "Facteurs de risques ?"
    ];

    return (
      <div className="flex h-[calc(100vh-64px)] bg-gray-50">
        {/* Sidebar (Desktop) */}
        <div className="hidden lg:flex w-50 flex-col bg-white border-r border-gray-200">
          <div className="p-2 border-b border-gray-100">
            <button 
              onClick={() => setChatMessages([])}
              className="w-full bg-blue-300 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 font-medium flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Nouvelle discussion
            </button>
          
              <div className="flex-1 overflow-y-auto p-6">
                {/* <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Suggestions</h3> */}
                <div className="space-y-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestion(q)}
                      className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition text-sm text-gray-600 border border-transparent hover:border-blue-100 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            
            {/* <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4"/> Info Confidentialité
              </h4>
              <p className="text-xs text-blue-600/80 leading-relaxed">
                Vos conversations sont anonymes. WarriorAI fournit des informations éducatives et ne remplace pas un avis médical.
              </p>
            </div> */}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto bg-gray-50 scroll-smooth">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center px-4 animate-fade-in">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-100">
                  <Shield className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Bonjour, je suis WarriorAI</h2>
                <p className="text-gray-500 mb-10 text-center max-w-md">Votre assistant virtuel dédié à la prévention et à l'information sur le cancer de la prostate.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestion(q)}
                      className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left text-gray-700 text-sm font-medium"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`mb-6 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                        msg.type === 'user' ? 'bg-blue-600' : 'bg-white border border-gray-200'
                      }`}>
                        {msg.type === 'user' ? (
                          <Users className="w-4 h-4 text-white" />
                        ) : (
                          <Shield className="w-4 h-4 text-blue-600" />
                        )}
                      </div>

                      {/* Bubble */}
                      <div className={`p-5 rounded-2xl shadow-sm ${
                        msg.type === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                      }`}>
                        <p className={`whitespace-pre-wrap leading-relaxed ${msg.error ? 'text-red-500' : ''}`}>
                          {msg.text}
                        </p>
                        
                        {/* Sources Toggle */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-4 pt-3 border-t border-gray-100/20">
                            <button
                              onClick={() => toggleSources(idx)}
                              className={`text-xs font-medium flex items-center gap-1.5 transition-colors ${
                                msg.type === 'user' ? 'text-blue-200 hover:text-white' : 'text-blue-600 hover:text-blue-800'
                              }`}
                            >
                              <Activity className="w-3.5 h-3.5" />
                              {msg.sourcesExpanded ? 'Masquer les sources' : `Voir les sources (${msg.sources.length})`}
                            </button>
                            
                            {msg.sourcesExpanded && (
                              <div className={`mt-3 p-3 rounded-lg text-xs ${
                                msg.type === 'user' ? 'bg-blue-700 text-blue-100' : 'bg-gray-50 text-gray-600'
                              }`}>
                                <ul className="space-y-1">
                                  {msg.sources.map((src, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="opacity-70">•</span>
                                      <span>{src}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start mb-8 animate-fade-in">
                     <div className="flex gap-3">
                        <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm">
                          <Shield className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
                          <span className="text-sm text-gray-500">WarriorAI réfléchit</span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                     </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {/* Input Fixed at Bottom */}
          <div className="bg-white border-t border-gray-200 p-4 lg:p-6 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="max-w-4xl mx-auto relative">
              <input
                type="text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendQuestion()}
                placeholder="Posez votre question ici..."
                className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-300 rounded-full focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder-gray-400 shadow-inner"
                disabled={isLoading}
              />
              <button
                onClick={sendQuestion}
                disabled={isLoading || !currentQuestion.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-3">
              Les réponses sont générées par IA. Vérifiez toujours auprès d'un professionnel de santé.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DashboardPage = () => {
    const maxCases = Math.max(...yearlyData.map(d => d.cases));

    return (
      <div className="min-h-screen bg-gray-50 py-12 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
              <p className="text-gray-600 text-lg">Surveillance mondiale du cancer de la prostate - Données 2024</p>
            </div>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Exporter PDF</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md">Mise à jour</button>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Users, label: 'Cas Mondiaux', value: stats.totalCases.toLocaleString(), change: '+1.2%', color: 'blue' },
              { icon: Activity, label: 'Décès Annuels', value: stats.deaths.toLocaleString(), change: '-0.3%', color: 'red' },
              { icon: TrendingUp, label: 'Incidence/100k', value: stats.incidenceRate, change: '+0.8%', color: 'orange' },
              { icon: HeartPulse, label: 'Survie à 5 ans', value: `${stats.survivalRate}%`, change: '+2.1%', color: 'green' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center border border-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') && stat.color !== 'red' ? 'bg-green-100 text-green-700' : 
                    stat.change.startsWith('-') && stat.color === 'red' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{stat.value}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Évolution */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Évolution des cas (2019-2024)
              </h3>
              <div className="space-y-5">
                {yearlyData.map((data, idx) => {
                  const percentage = (data.cases / maxCases) * 100;
                  return (
                    <div key={idx} className="relative group">
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="font-semibold text-gray-700">{data.year}</span>
                        <span className="text-gray-500">{data.cases.toLocaleString()} cas</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 group-hover:from-blue-400 group-hover:to-indigo-500 relative"
                          style={{ width: `${percentage}%` }}
                        >
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mortalité Comparée */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" /> Taux de Mortalité (%)
              </h3>
              <div className="space-y-5">
                {countryData.sort((a, b) => (b.deaths/b.cases) - (a.deaths/a.cases)).map((country, idx) => {
                  const rate = ((country.deaths / country.cases) * 100).toFixed(1);
                  const isHigh = parseFloat(rate) > 15;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="font-medium text-gray-700 w-28 truncate">{country.country}</span>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isHigh ? 'bg-red-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(parseFloat(rate) * 5, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold w-12 text-right ${isHigh ? 'text-red-600' : 'text-emerald-600'}`}>
                        {rate}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tableau Détaillé */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
               <h3 className="text-lg font-bold text-gray-800">Données Détaillées par Pays</h3>
               <button className="text-blue-600 text-sm font-medium hover:underline">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Pays</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Population</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Cas</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Décès</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Létalité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {countryData.map((country, idx) => {
                    const mortalityRate = ((country.deaths / country.cases) * 100).toFixed(1);
                    return (
                      <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                        <td className="px-6 py-4 font-semibold text-gray-800">{country.country}</td>
                        <td className="px-6 py-4 text-right text-gray-600 hidden md:table-cell">{country.population.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-medium text-blue-900 bg-blue-50/30">{country.cases.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-gray-600 hidden sm:table-cell">{country.deaths.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            parseFloat(mortalityRate) > 15
                              ? 'bg-red-100 text-red-800'
                              : parseFloat(mortalityRate) > 10
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {mortalityRate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    {/* SCRIPTS ET STYLES ESSENTIELS */}
    <script src="https://cdn.tailwindcss.com"></script>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      body { font-family: 'Inter', sans-serif; }
      
      /* Scrollbar personnalisée */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #f1f5f9; }
      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

      .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
      .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>

    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-gray shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setCurrentPage('home')}
            >
              <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Blue<span className="text-blue-600">Warriors</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              {[
                { id: 'home', label: 'Accueil', icon: Home },
                { id: 'chatbot', label: 'WarriorAI', icon: MessageSquare },
                { id: 'dashboard', label: 'Data', icon: BarChart3 }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-medium text-sm ${
                    currentPage === item.id
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${currentPage === item.id ? 'text-blue-600' : 'text-gray-500'}`} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex">
               <button className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-800 transition shadow-md shadow-blue-900/20">
                  Faire un don
               </button>
            </div>

             {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-fade-in">
            <div className="p-4 space-y-2">
            {[
              { id: 'home', label: 'Accueil', icon: Home },
              { id: 'chatbot', label: 'WarriorAI', icon: MessageSquare },
              { id: 'dashboard', label: 'Statistiques', icon: BarChart3 }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-colors ${
                  currentPage === item.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
            <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-x font-bold">Faire un don</button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'chatbot' && <ChatbotPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>

      {/* FOOTER COMPLET ET AMÉLIORÉ */}
      <footer className="bg-blue-500 text-white pt-10 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                   <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-align:center">BlueWarriors</h3>
              </div>
              <p className="text-white-600 leading-relaxed mb-6">
                Une initiative mondiale dédiée à la lutte contre le cancer de la prostate par l'innovation technologique, la sensibilisation et le soutien communautaire.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Liens Rapides</h4>
              <ul className="space-y-4">
                {[
                    { label: "Accueil", id: 'home' },
                    { label: "WarriorAI", id: 'chatbot' },
                    { label: "Données Mondiales", id: 'dashboard' },
                    { label: "Faire un don", id: null }
                ].map((link, i) => (
                  <li key={i}>
                    <button 
                        onClick={() => link.id && setCurrentPage(link.id)}
                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-600 group-hover:text-blue-500" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contactez-nous</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Cotonou, Bénin<br/>Avenue Jean-Paul II</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <a href="tel:+2290151344289" className="hover:text-white transition">+229 01 51 34 42 89</a>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <a href="mailto:contact@bluewarriors.org" className="hover:text-white transition">contact@bluewarriors.org</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Restez informé</h4>
              <p className="text-gray-400 text-sm mb-4">Recevez les dernières actualités et conseils de prévention.</p>
              <div className="flex flex-col gap-3">
                <input 
                    type="email" 
                    placeholder="Votre email" 
                    className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                    S'inscrire
                </button>
              </div>
            </div>

          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 BlueWarriors. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">Confidentialité</a>
              <a href="#" className="hover:text-white transition">Conditions</a>
              <a href="#" className="hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;