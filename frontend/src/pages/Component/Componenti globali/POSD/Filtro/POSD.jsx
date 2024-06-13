import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../../../GestionePKB/Card.jsx';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import './POSD.css';

function POSD() {
    const [patterns, setPatterns] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        mvc: null,
        strategy: null,
        isoPhase: null,
        article: null,
        cwe: null,
        owasp: null,
    });
    const navigate = useNavigate();
    const [dropdownsOpen, setDropdownsOpen] = useState({
        menu: false,
        strategies: false,
        isoPhase: false,
        article: false,
        cwe: false,
        owasp: false,
    });

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

    const toggleDropdown = (dropdown) => {
        setDropdownsOpen((prev) => ({
            ...Object.keys(prev).reduce((acc, key) => {
                acc[key] = key === dropdown ? !prev[key] : false;
                return acc;
            }, {}),
        }));
    };

    const handleFilterSelection = (filterName, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterName]: prev[filterName] === value ? null : value,
        }));
    };

    const handleCardClick = (pattern) => {
        navigate(`/Definizione/${encodeURIComponent(pattern['Pattern'])}`, {state: {...pattern}});
    };

    const applyFilter = (pattern) => {
<<<<<<< Updated upstream
        const { mvc, strategy, isoPhase, article, cwe, owasp } = selectedFilters;
=======
        const {mvc, strategy, isoPhase, article, cwe, owasp} = selectedFilters;
>>>>>>> Stashed changes
        return (
            (!mvc || pattern['Collocazione MVC']?.includes(mvc)) &&
            (!strategy || pattern['Strategies']?.includes(strategy)) &&
            (!isoPhase || pattern['ISO 9241-210 Phase']?.includes(isoPhase)) &&
            (!article || pattern['Article GDPR Compliance with the Pattern']?.includes(article)) &&
            (!cwe || pattern['CWE Top 25 Most Dangerous Software Weaknesses OWASP Categories Associated']?.includes(cwe)) &&
            (!owasp || pattern['OWASP Top Ten Categories']?.includes(owasp))
        );
    };
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

    const filteredPatterns = patterns.filter(applyFilter);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto mt-5 p-6 flex flex-col items-center">
            <div className="search-dropdown-container">
                <Dropdown
                    label="Controller MVC"
                    isOpen={dropdownsOpen.menu}
                    onToggle={() => toggleDropdown('menu')}
                >
                    {['Model', 'Control', 'View'].map((option) => (
                        <button
                            key={option}
                            className={`${selectedFilters.mvc === option ? 'selected' : ''}`}
                            onClick={() => handleFilterSelection('mvc', option)}
                        >
                            {option}
                        </button>
                    ))}
                </Dropdown>

                <Dropdown
                    label="Strategies"
                    isOpen={dropdownsOpen.strategies}
                    onToggle={() => toggleDropdown('strategies')}
                >
                    {['Control', 'Abstract', 'Separate', 'Hide', 'Minimize', 'Inform', 'Enforce'].map((option) => (
                        <button
                            key={option}
                            className={`${selectedFilters.strategy === option ? 'selected' : ''}`}
                            onClick={() => handleFilterSelection('strategy', option)}
                        >
                            {option}
                        </button>
                    ))}
                </Dropdown>

                <Dropdown
                    label="ISO Phase"
                    isOpen={dropdownsOpen.isoPhase}
                    onToggle={() => toggleDropdown('isoPhase')}
                >
                    {['6', '7.2', '7.3', '7.4', '7.5'].map((option) => (
                        <button
                            key={option}
                            className={`${selectedFilters.isoPhase === option ? 'selected' : ''}`}
                            onClick={() => handleFilterSelection('isoPhase', option)}
                        >
                            {option}
                        </button>
                    ))}
                </Dropdown>

                <Dropdown
                    label="Article"
                    isOpen={dropdownsOpen.article}
                    onToggle={() => toggleDropdown('article')}
                >
                    {['Article 5', 'Article 6', 'Article 7', 'Article 12', 'Article 13', 'Article 25', 'Article 28', 'Article 32', 'Article 33', 'Article 34', 'Article 35'].map((option) => (
                        <button
                            key={option}
                            className={`${selectedFilters.article === option ? 'selected' : ''}`}
                            onClick={() => handleFilterSelection('article', option)}
                        >
                            {option}
                        </button>
                    ))}
                </Dropdown>

                <Dropdown
                    label="CWE"
                    isOpen={dropdownsOpen.cwe}
                    onToggle={() => toggleDropdown('cwe')}
                >
                    {['CWE-20', 'CWE-22', 'CWE-78', 'CWE-79', 'CWE-77', 'CWE-89', 'CWE-94', 'CWE-269', 'CWE-276', 'CWE-287', 'CWE-306', 'CWE-434', 'CWE-502', 'CWE-798', 'CWE-862', 'CWE-863', 'CWE-918'].map((option) => (
                        <button
                            key={option}
                            className={`${selectedFilters.cwe === option ? 'selected' : ''}`}
                            onClick={() => handleFilterSelection('cwe', option)}
                        >
                            {option}
                        </button>
                    ))}
                </Dropdown>

                <Dropdown
                    label="OWASP"
                    isOpen={dropdownsOpen.owasp}
                    onToggle={() => toggleDropdown('owasp')}
                >
                    {['A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10'].map((option) => (
                        <button
                            key={option}
                            className={`${selectedFilters.owasp === option ? 'selected' : ''}`}
                            onClick={() => handleFilterSelection('owasp', option)}
                        >
                            {option}
                        </button>
                    ))}
                </Dropdown>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
                {filteredPatterns.map((pattern) => (
                    <Card
                        key={pattern.id}
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

function Dropdown({label, isOpen, onToggle, children}) {
    return (
        <div className="sec-center">
            <input
                className="dropdown"
                type="checkbox"
                id={`dropdown-${label}`}
                name={`dropdown-${label}`}
                checked={isOpen}
                onChange={onToggle}
            />
            <label className="for-dropdown" htmlFor={`dropdown-${label}`}>
                {label} <i className="uil uil-arrow-down"></i>
            </label>
            <div className={`section-dropdown ${isOpen ? 'open' : ''}`}>{children}</div>
        </div>
    );
}

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default POSD;
