import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../../Risultati/Card.jsx';
import {useNavigate} from 'react-router-dom';
import './Filtro/POSD.css';

function POSD() {
    const [patterns, setPatterns] = useState([]);
    const [error, setError] = useState(null);
    const [selectedMVC, setSelectedMVC] = useState(null);
    const [selectedStrategy, setSelectedStrategy] = useState(null);
    const [selectedISOPhase, setSelectedISOPhase] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedCWE, setSelectedCWE] = useState(null);
    const [selectedOwasp, setSelectedOwasp] = useState(null);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [strategiesOpen, setStrategiesOpen] = useState(false);
    const [isoPhaseOpen, setIsoPhaseOpen] = useState(false);
    const [articleOpen, setArticleOpen] = useState(false);
    const [cweOpen, setCweOpen] = useState(false);
    const [owaspOpen, setOwaspOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/pattern');
                setPatterns(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
        if (strategiesOpen) setStrategiesOpen(false);
        if (isoPhaseOpen) setIsoPhaseOpen(false);
        if (articleOpen) setArticleOpen(false);
        if (cweOpen) setCweOpen(false);
        if (owaspOpen) setOwaspOpen(false);
    };

    const handleStrategiesClick = () => {
        setStrategiesOpen(!strategiesOpen);
        if (menuOpen) setMenuOpen(false);
        if (isoPhaseOpen) setIsoPhaseOpen(false);
        if (articleOpen) setArticleOpen(false);
        if (cweOpen) setCweOpen(false);
        if (owaspOpen) setOwaspOpen(false);
    };

    const handleIsoPhaseClick = () => {
        setIsoPhaseOpen(!isoPhaseOpen);
        if (menuOpen) setMenuOpen(false);
        if (strategiesOpen) setStrategiesOpen(false);
        if (articleOpen) setArticleOpen(false);
        if (cweOpen) setCweOpen(false);
        if (owaspOpen) setOwaspOpen(false);
    };

    const handleArticlePhaseClick = () => {
        setArticleOpen(!articleOpen);
        if (menuOpen) setMenuOpen(false);
        if (strategiesOpen) setStrategiesOpen(false);
        if (isoPhaseOpen) setIsoPhaseOpen(false);
        if (cweOpen) setCweOpen(false);
        if (owaspOpen) setOwaspOpen(false);
    };

    const handleCweClick = () => {
        setCweOpen(!cweOpen);
        if (menuOpen) setMenuOpen(false);
        if (strategiesOpen) setStrategiesOpen(false);
        if (isoPhaseOpen) setIsoPhaseOpen(false);
        if (articleOpen) setArticleOpen(false);
        if (owaspOpen) setOwaspOpen(false);
    };

    const handleOwaspClick = () => {
        setOwaspOpen(!owaspOpen);
        if (menuOpen) setMenuOpen(false);
        if (strategiesOpen) setStrategiesOpen(false);
        if (isoPhaseOpen) setIsoPhaseOpen(false);
        if (articleOpen) setArticleOpen(false);
        if (cweOpen) setCweOpen(false);
    };

    const handleCardClick = (pattern) => {
        navigate(`/Definizione/${encodeURIComponent(pattern['Pattern'])}`, {state: {...pattern}});
    };

    const handlePatternClick = (strategy) => {
        setSelectedStrategy(selectedStrategy === strategy ? null : strategy);
    };

    const handleMVCClick = (mvc) => {
        setSelectedMVC(selectedMVC === mvc ? null : mvc);
    };

    const handleISOPhaseClick = (phase) => {
        setSelectedISOPhase(selectedISOPhase === phase ? null : phase);
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(selectedArticle === article ? null : article);
    };

    const handleCWEClick = (cwe) => {
        setSelectedCWE(selectedCWE === cwe ? null : cwe);
    };

    const handleOwaspSelect = (owasp) => {
        setSelectedOwasp(selectedOwasp === owasp ? null : owasp);
    };

    const filteredPatterns = patterns.filter(pattern => {
    const matchesMVC = !selectedMVC || (pattern['Collocazione MVC'] && pattern['Collocazione MVC'].includes(selectedMVC));
    const matchesStrategy = !selectedStrategy || (pattern['Strategies'] && pattern['Strategies'].includes(selectedStrategy));
    const matchesISOPhase = !selectedISOPhase || (pattern['ISO 9241-210 Phase'] && pattern['ISO 9241-210 Phase'].includes(selectedISOPhase));
    const matchesArticle = !selectedArticle || (pattern['Article GDPR Compliance with the Pattern'] && pattern['Article GDPR Compliance with the Pattern'].includes(selectedArticle));
    const matchesCWE = !selectedCWE || (pattern['CWE Top 25 Most Dangerous Software Weaknesses OWASP Categories Associated'] && pattern['CWE Top 25 Most Dangerous Software Weaknesses OWASP Categories Associated'].includes(selectedCWE));
    const matchesOwasp = !selectedOwasp || (pattern['OWASP Top Ten Categories'] && pattern['OWASP Top Ten Categories'].includes(selectedOwasp));
    return matchesMVC && matchesStrategy && matchesISOPhase && matchesArticle && matchesCWE && matchesOwasp;
});

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Seleziona tutti gli elementi dropdown
const dropdowns = document.querySelectorAll('.dropdown');

// Aggiungi un gestore di eventi di clic per ciascun dropdown
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', function(event) {
    // Impedisci la propagazione dell'evento clic al di fuori del dropdown
    event.stopPropagation();
  });
});

// Aggiungi un gestore di eventi di clic per l'intera finestra
window.addEventListener('click', function() {
  // Chiudi tutti i dropdown quando si preme altrove sulla finestra
  dropdowns.forEach(dropdown => {
    dropdown.checked = false;
  });
});


    return (
        <div className="container mx-auto mt-5 p-6 flex flex-col items-center">
            <div className="search-dropdown-container">
                <div className="sec-center">
                    <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" checked={menuOpen}
                           onChange={handleMenuClick}/>
                    <label className="for-dropdown" htmlFor="dropdown">Controller MVC <i
                        className="uil uil-arrow-down"></i></label>
                    <div className={`section-dropdown ${menuOpen ? 'open' : ''}`}>
                        <button className={`${selectedMVC === 'Model' ? 'selected' : ''}`} onClick={() => handleMVCClick('Model')}>Model</button>
                        <button className={`${selectedMVC === 'Control' ? 'selected' : ''}`} onClick={() => handleMVCClick('Control')}>Control</button>
                        <button className={`${selectedMVC === 'View' ? 'selected' : ''}`} onClick={() => handleMVCClick('View')}>View</button>
                    </div>
                </div>

                <div className="sec-center">
                    <input className="dropdown" type="checkbox" id="dropdown-strategies" name="dropdown-strategies"
                           checked={strategiesOpen}
                           onChange={handleStrategiesClick}/>
                    <label className="for-dropdown" htmlFor="dropdown-strategies">Strategies <i
                        className="uil uil-arrow-down"></i></label>
                    <div className={`section-dropdown ${strategiesOpen ? 'open' : ''}`}>
                        <button className={`${selectedStrategy === 'Control' ? 'selected' : ''}`}
                                onClick={() => handlePatternClick("Control")}>Control <i
                            className="uil uil-arrow-right"></i></button>
                        <button className={`${selectedStrategy === 'Abstract' ? 'selected' : ''}`}
                                onClick={() => handlePatternClick("Abstract")}>Abstract <i
                            className="uil uil-arrow-right"></i></button>
                        <button className={`${selectedStrategy === 'Separate' ? 'selected' : ''}`}
                                onClick={() => handlePatternClick("Separate")}>Separate <i
                            className="uil uil-arrow-right"></i></button>
                        <button className={`${selectedStrategy === 'Hide' ? 'selected' : ''}`}
                                onClick={() => handlePatternClick("Hide")}>Hide <i className="uil uil-arrow-right"></i>
                        </button>
                        <button className={`${selectedStrategy === 'Minimize' ? 'selected' : ''}`}
                                onClick={() => handlePatternClick("Minimize")}>Minimize <i
                            className="uil uil-arrow-right"></i></button>
                        <button className={`${selectedStrategy === 'Inform' ? 'selected' : ''}`}
                                onClick={() => handlePatternClick("Inform")}>Inform <i
                            className="uil uil-arrow-right"></i></button>
                        <button className={`${selectedStrategy === 'Enforce' ? 'selected' : ''}`}
                                onClick={() => handlePatternClick("Enforce")}>Enforce <i
                            className="uil uil-arrow-right"></i></button>
                    </div>
                </div>

                <div className="sec-center">
                    <input className="dropdown" type="checkbox" id="dropdown-iso" name="dropdown-iso" checked={isoPhaseOpen} onChange={handleIsoPhaseClick}/>
                    <label className="for-dropdown" htmlFor="dropdown-iso">ISO Phase <i className="uil uil-arrow-down"></i></label>
                    <div className={`section-dropdown ${isoPhaseOpen ? 'open' : ''}`}>
                        <button className={`${selectedISOPhase === '6' ? 'selected' : ''}`} onClick={() => handleISOPhaseClick('6')}>6</button>
                        <button className={`${selectedISOPhase === '7.2' ? 'selected' : ''}`} onClick={() => handleISOPhaseClick('7.2')}>7.2</button>
                        <button className={`${selectedISOPhase === '7.3' ? 'selected' : ''}`} onClick={() => handleISOPhaseClick('7.3')}>7.3</button>
                        <button className={`${selectedISOPhase === '7.4' ? 'selected' : ''}`} onClick={() => handleISOPhaseClick('7.4')}>7.4</button>
                        <button className={`${selectedISOPhase === '7.5' ? 'selected' : ''}`} onClick={() => handleISOPhaseClick('7.5')}>7.5</button>
                    </div>
                </div>

                <div className="sec-center">
                    <input className="dropdown" type="checkbox" id="dropdown-article" name="dropdown-article" checked={articleOpen} onChange={handleArticlePhaseClick}/>
                    <label className="for-dropdown" htmlFor="dropdown-article">Article <i
                        className="uil uil-arrow-down"></i></label>
                    <div className={`section-dropdown ${articleOpen ? 'open' : ''}`}>
                        <button className={`${selectedArticle === 'Article 5' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 5')}>Article 5</button>
                        <button className={`${selectedArticle === 'Article 6' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 6')}>Article 6</button>
                        <button className={`${selectedArticle === 'Article 7' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 7')}>Article 7</button>
                        <button className={`${selectedArticle === 'Article 12' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 12')}>Article 12</button>
                        <button className={`${selectedArticle === 'Article 13' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 13')}>Article 13</button>
                        <button className={`${selectedArticle === 'Article 25' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 25')}>Article 25</button>
                        <button className={`${selectedArticle === 'Article 28' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 28')}>Article 28</button>
                        <button className={`${selectedArticle === 'Article 32' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 32')}>Article 32</button>
                        <button className={`${selectedArticle === 'Article 33' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 33')}>Article 33</button>
                        <button className={`${selectedArticle === 'Article 34' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 34')}>Article 34</button>
                        <button className={`${selectedArticle === 'Article 35' ? 'selected' : ''}`} onClick={() => handleArticleClick('Article 35')}>Article 35</button>
                    </div>
                </div>

                <div className="sec-center">
                    <input className="dropdown" type="checkbox" id="dropdown-cwe" name="dropdown-cwe" checked={cweOpen} onChange={handleCweClick}/>
                    <label className="for-dropdown" htmlFor="dropdown-cwe">CWE <i className="uil uil-arrow-down"></i></label>
                    <div className={`section-dropdown ${cweOpen ? 'open' : ''}`}>
                        <button className={`${selectedCWE === 'CWE-20' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-20')}>CWE-20</button>
                        <button className={`${selectedCWE === 'CWE-22' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-22')}>CWE-22</button>
                        <button className={`${selectedCWE === 'CWE-78' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-78')}>CWE-78</button>
                        <button className={`${selectedCWE === 'CWE-79' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-79')}>CWE-79</button>
                        <button className={`${selectedCWE === 'CWE-77' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-77')}>CWE-77</button>
                        <button className={`${selectedCWE === 'CWE-89' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-89')}>CWE-89</button>
                        <button className={`${selectedCWE === 'CWE-94' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-94')}>CWE-94</button>
                        <button className={`${selectedCWE === 'CWE-269' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-269')}>CWE-269</button>
                        <button className={`${selectedCWE === 'CWE-276' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-276')}>CWE-276</button>
                        <button className={`${selectedCWE === 'CWE-287' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-287')}>CWE-287</button>
                        <button className={`${selectedCWE === 'CWE-306' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-306')}>CWE-306</button>
                        <button className={`${selectedCWE === 'CWE-434' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-434')}>CWE-434</button>
                        <button className={`${selectedCWE === 'CWE-502' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-502')}>CWE-502</button>
                        <button className={`${selectedCWE === 'CWE-798' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-798')}>CWE-798</button>
                        <button className={`${selectedCWE === 'CWE-862' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-862')}>CWE-862</button>
                        <button className={`${selectedCWE === 'CWE-863' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-863')}>CWE-863</button>
                        <button className={`${selectedCWE === 'CWE-918' ? 'selected' : ''}`} onClick={() => handleCWEClick('CWE-918')}>CWE-918
                        </button>
                    </div>
                </div>

                <div className="sec-center">
                    <input className="dropdown" type="checkbox" id="dropdown-owasp" name="dropdown-owasp" checked={owaspOpen} onChange={handleOwaspClick} />
                    <label className="for-dropdown" htmlFor="dropdown-owasp">OWASP <i className="uil uil-arrow-down"></i></label>
                    <div className={`section-dropdown ${owaspOpen ? 'open' : ''}`}>
                        <button className={`${selectedOwasp === 'A01' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A01')}>A01 </button>
                        <button className={`${selectedOwasp === 'A02' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A02')}>A02 </button>
                        <button className={`${selectedOwasp === 'A03' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A03')}>A03 </button>
                        <button className={`${selectedOwasp === 'A04' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A04')}>A04 </button>
                        <button className={`${selectedOwasp === 'A05' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A05')}>A05 </button>
                        <button className={`${selectedOwasp === 'A06' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A06')}>A06 </button>
                        <button className={`${selectedOwasp === 'A07' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A07')}>A07 </button>
                        <button className={`${selectedOwasp === 'A08' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A08')}>A08 </button>
                        <button className={`${selectedOwasp === 'A09' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A09')}>A09 </button>
                        <button className={`${selectedOwasp === 'A10' ? 'selected' : ''}`} onClick={() => handleOwaspSelect('A10')}>A10 </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
                {filteredPatterns.map((pattern, index) => (
                    <Card
                        key={index}
                        strategies={pattern['Strategies']}
                        title={pattern['Pattern']}
                        description={pattern['Description Pattern']}
                        context={pattern['Context Pattern']}
                        collocazioneMVC={pattern['Collocazione MVC']}
                        ISO_Phase={pattern['ISO 9241-210 Phase']}
                        Article={pattern['Article GDPR Compliance with the Pattern']}
                        PKB={pattern['Privacy By Design Principles']}
                        Owasp={pattern['OWASP Top Ten Categories']}
                        CWE={pattern['CWE Top 25 Most Dangerous Software Weaknesses OWASP Categories Associated']}
                        Examples={pattern['Examples']}
                        className="w-auto h-auto"
                        onClick={() => handleCardClick(pattern)}
                    />
                ))}
            </div>
        </div>
    );
}
export default POSD;